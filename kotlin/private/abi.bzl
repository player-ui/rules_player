"""
Bazel rules implementing Kotlin ABI checking (binary compatibility validation),
mirroring the JetBrains Gradle plugin:
https://kotlinlang.org/docs/gradle-binary-compatibility-validation.html

For a given Kotlin library target, the `abi` macro generates three sibling targets:

- `{name}-abi-dump`   : `bazel build` produces the canonical `.api` text dump
                        for the library's public surface
- `{name}-abi-check`  : `bazel test` compares the generated dump against the
                        checked-in golden `.api` file, failing with a unified
                        diff if they differ
- `{name}-abi-update` : `bazel run` regenerates the golden `.api` file in the
                        source tree

A workspace-level `abi_update_all` macro produces a single `bazel run`-able
launcher that discovers every `abi_update` target via `bazel cquery` and
invokes each in turn.
"""

load("@bazel_skylib//rules:write_file.bzl", "write_file")
load(":scope_name.bzl", "scope_name")

# Sentinel marking "use the default api_file path" — distinct from `None`
# which explicitly disables ABI tracking. Compared by identity via `==`.
ABI_FILE_DEFAULT = "@@__abi_file_default__@@"

_ABI_TOOL = Label("//kotlin/private/abi:abi_tool")
_ABI_UPDATE_ALL_LAUNCHER = Label("//kotlin/private/abi:abi_update_all")

def _comma_list(values):
    return ",".join(values) if values else ""

def _dump_args(ctx, jar, out):
    args = ctx.actions.args()
    args.add("dump")
    args.add("--jar", jar)
    args.add("--out", out)
    if ctx.attr.public_packages:
        args.add("--public-packages", _comma_list(ctx.attr.public_packages))
    if ctx.attr.public_classes:
        args.add("--public-classes", _comma_list(ctx.attr.public_classes))
    if ctx.attr.public_markers:
        args.add("--public-markers", _comma_list(ctx.attr.public_markers))
    if ctx.attr.non_public_packages:
        args.add("--non-public-packages", _comma_list(ctx.attr.non_public_packages))
    if ctx.attr.non_public_classes:
        args.add("--non-public-classes", _comma_list(ctx.attr.non_public_classes))
    if ctx.attr.non_public_markers:
        args.add("--non-public-markers", _comma_list(ctx.attr.non_public_markers))
    return args

def _first_output_jar(target):
    java_info = target[JavaInfo]
    jars = java_info.runtime_output_jars
    if not jars:
        jars = [jo.class_jar for jo in java_info.java_outputs if jo.class_jar]
    if not jars:
        fail("Target %s exposes no output jars on JavaInfo" % target.label)
    return jars[0]

def _abi_dump_impl(ctx):
    jar = _first_output_jar(ctx.attr.target)
    out = ctx.actions.declare_file("{}.api".format(ctx.label.name))

    ctx.actions.run(
        executable = ctx.attr._tool[DefaultInfo].files_to_run,
        arguments = [_dump_args(ctx, jar, out)],
        inputs = [jar],
        outputs = [out],
        mnemonic = "KotlinAbiDump",
        progress_message = "Generating Kotlin ABI dump for %s" % ctx.attr.target.label,
    )

    return [DefaultInfo(files = depset([out]))]

abi_dump = rule(
    implementation = _abi_dump_impl,
    doc = "Emit a canonical Kotlin Binary Compatibility Validator .api dump for a JVM library.",
    attrs = {
        "target": attr.label(
            mandatory = True,
            providers = [JavaInfo],
            doc = "The kt_jvm_library (or any JavaInfo-providing target) whose ABI to dump.",
        ),
        "public_packages": attr.string_list(
            doc = "Packages to retain as public regardless of other filtering (BCV `publicPackages`).",
        ),
        "public_classes": attr.string_list(
            doc = "Fully qualified class names to retain as public (BCV `publicClasses`).",
        ),
        "public_markers": attr.string_list(
            doc = "Marker annotations (JVM internal form, e.g. com/example/PublicApi) opting declarations into the public ABI.",
        ),
        "non_public_packages": attr.string_list(
            doc = "Packages to drop from the dump (BCV `nonPublicPackages`).",
        ),
        "non_public_classes": attr.string_list(
            doc = "Fully qualified class names to drop from the dump (BCV `nonPublicClasses`).",
        ),
        "non_public_markers": attr.string_list(
            doc = "Marker annotations (JVM internal form) that exclude declarations from the public ABI.",
        ),
        "_tool": attr.label(
            default = _ABI_TOOL,
            executable = True,
            cfg = "exec",
        ),
    },
)

def _abi_check_impl(ctx):
    actual = ctx.file.actual
    expected = ctx.file.expected
    tool = ctx.executable._tool

    runner = ctx.actions.declare_file(ctx.label.name + ".sh")
    ctx.actions.write(
        output = runner,
        is_executable = True,
        content = """#!/usr/bin/env bash
set -euo pipefail
exec "{tool}" check --expected "{expected}" --actual "{actual}"
""".format(
            tool = tool.short_path,
            expected = expected.short_path,
            actual = actual.short_path,
        ),
    )

    runfiles = ctx.runfiles(files = [actual, expected, tool])
    runfiles = runfiles.merge(ctx.attr._tool[DefaultInfo].default_runfiles)
    return [DefaultInfo(executable = runner, runfiles = runfiles)]

abi_check_test = rule(
    implementation = _abi_check_impl,
    test = True,
    doc = "Test that a generated ABI dump matches its checked-in golden file.",
    attrs = {
        "actual": attr.label(
            mandatory = True,
            allow_single_file = True,
            doc = "Generated .api dump (typically a `abi_dump` target).",
        ),
        "expected": attr.label(
            mandatory = True,
            allow_single_file = True,
            doc = "Checked-in golden .api file (or a placeholder when first being introduced).",
        ),
        "_tool": attr.label(
            default = _ABI_TOOL,
            executable = True,
            cfg = "exec",
        ),
    },
)

def _abi_update_impl(ctx):
    actual = ctx.file.actual
    relative_path = ctx.attr.api_file_path

    runner = ctx.actions.declare_file(ctx.label.name + ".sh")
    ctx.actions.write(
        output = runner,
        is_executable = True,
        content = """#!/usr/bin/env bash
set -euo pipefail
if [[ -z "${{BUILD_WORKSPACE_DIRECTORY:-}}" ]]; then
    echo "error: this target must be invoked with 'bazel run' so BUILD_WORKSPACE_DIRECTORY is set" >&2
    exit 1
fi
dest="${{BUILD_WORKSPACE_DIRECTORY}}/{relative_path}"
mkdir -p "$(dirname "$dest")"
cp -f "{actual}" "$dest"
echo "Wrote ABI dump to $dest"
""".format(
            relative_path = relative_path,
            actual = actual.short_path,
        ),
    )

    runfiles = ctx.runfiles(files = [actual])
    return [DefaultInfo(executable = runner, runfiles = runfiles)]

abi_update = rule(
    implementation = _abi_update_impl,
    executable = True,
    doc = "Copy a freshly generated ABI dump into the source tree at the configured path.",
    attrs = {
        "actual": attr.label(
            mandatory = True,
            allow_single_file = True,
            doc = "Generated .api dump (typically a `abi_dump` target).",
        ),
        "api_file_path": attr.string(
            mandatory = True,
            doc = "Workspace-relative destination path for the .api file.",
        ),
    },
)

def _default_api_file(name):
    return "api/{}.api".format(name)

def abi(
        *,
        name,
        target = None,
        api_file = None,
        public_packages = None,
        public_classes = None,
        public_markers = None,
        non_public_packages = None,
        non_public_classes = None,
        non_public_markers = None,
        tags = []):
    """Generate ABI dump, check, and update targets for a Kotlin library.

    Mirrors the JetBrains Binary Compatibility Validator Gradle plugin:
    https://kotlinlang.org/docs/gradle-binary-compatibility-validation.html

    If the golden `.api` file does not yet exist in the source tree, a placeholder
    (empty) file is generated so `{name}-abi-check` produces a useful diff and
    `bazel run {name}-abi-update` populates the file for the first time.

    Args:
        name: base name for the generated targets. Conventionally the same as
            the library target it inspects.
        target: label of the kt_jvm/kt_android library to inspect. Defaults to
            `":{name}"`.
        api_file: workspace-relative path to the checked-in golden .api file.
            Defaults to `api/{name}.api`, matching BCV's Gradle layout.
        public_packages: packages explicitly retained as public ABI.
        public_classes: classes explicitly retained as public ABI.
        public_markers: marker annotations (JVM internal form, slashes not dots)
            that opt declarations into the public ABI.
        non_public_packages: packages excluded from the public ABI.
        non_public_classes: classes excluded from the public ABI.
        non_public_markers: marker annotations (JVM internal form) that exclude
            declarations from the public ABI.
        tags: optional tags forwarded to every generated target.
    """
    if target == None:
        target = ":" + name
    if api_file == None:
        api_file = _default_api_file(name)

    dump_name = scope_name(name, "abi-dump")
    check_name = scope_name(name, "abi-check")
    update_name = scope_name(name, "abi-update")

    abi_dump(
        name = dump_name,
        target = target,
        public_packages = public_packages,
        public_classes = public_classes,
        public_markers = public_markers,
        non_public_packages = non_public_packages,
        non_public_classes = non_public_classes,
        non_public_markers = non_public_markers,
        tags = tags,
    )

    # Auto-stub: if the golden file isn't checked in yet, generate an empty
    # placeholder so the check rule has something to diff against. The first
    # `abi-check` run will then show the entire ABI as additions, and
    # `bazel run :{name}-abi-update` writes the real file into the source tree.
    existing = native.glob([api_file], allow_empty = True)
    if existing:
        expected_label = api_file
    else:
        placeholder_name = scope_name(name, "abi-placeholder")
        write_file(
            name = placeholder_name,
            out = api_file,
            content = [],
            tags = tags + ["manual"],
        )
        expected_label = ":" + placeholder_name

    abi_check_test(
        name = check_name,
        actual = ":" + dump_name,
        expected = expected_label,
        tags = tags,
    )

    api_file_path = "{}/{}".format(native.package_name(), api_file) if native.package_name() else api_file

    abi_update(
        name = update_name,
        actual = ":" + dump_name,
        api_file_path = api_file_path,
        tags = tags,
    )

def abi_update_all(name, **kwargs):
    """Workspace-level launcher that runs every `abi_update` target in turn.

    Args:
        name: name of the runnable launcher target.
        **kwargs: forwarded to the underlying `alias` (e.g. `tags`, `visibility`).
    """
    native.alias(
        name = name,
        actual = _ABI_UPDATE_ALL_LAUNCHER,
        **kwargs
    )

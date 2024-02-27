"""
Populate all the required fields for a package.json file needed for a full build
"""

load("@aspect_rules_js//js:providers.bzl", "JsInfo")
load("@aspect_bazel_lib//lib:stamping.bzl", "STAMP_ATTRS", "maybe_stamp")
load(":utils.bzl", "get_js_npm_name")

def _package_json_impl(ctx):
    """Implementation of package_json."""
    output_file = ctx.actions.declare_file("%s.json" % ctx.label.name)
    stamp = maybe_stamp(ctx)

    stamp_inputs = []

    args = {
        "output_file": output_file.short_path,
        "substitutions": ctx.attr.substitutions,
        "root_package_json": ctx.file.root_package_json.short_path,
        "base_package_json": ctx.file.base_package_json.short_path,
        "native_bundle": ctx.attr.native_bundle,
        "dependencies": [get_js_npm_name(dep) for dep in ctx.attr.dependencies],
        "peer_dependencies": [get_js_npm_name(dep) for dep in ctx.attr.peer_dependencies],
        "custom_entrypoints": ctx.attr.custom_entrypoints,
    }

    if stamp:
        stamp_inputs = [stamp.volatile_status_file, stamp.stable_status_file]
        args["BAZEL_STABLE_STATUS_FILE"] = stamp.stable_status_file.path
        args["BAZEL_VOLATILE_STATUS_FILE"] = stamp.volatile_status_file.path

    ctx.actions.run(
        inputs = stamp_inputs + ctx.files.root_package_json + ctx.files.base_package_json,
        env = {
            "BAZEL_BINDIR": ctx.bin_dir.path,
        },
        arguments = [json.encode(args)],
        outputs = [output_file],
        executable = ctx.executable._create_package_json,
    )

    return [
        DefaultInfo(
            files = depset([output_file]),
        ),
    ]

create_package_json = rule(
    implementation = _package_json_impl,
    attrs = dict({
        "root_package_json": attr.label(
            mandatory = True,
            doc = "The root package.json for the project. Used to get the versions of dependencies and peer-depedencies",
            allow_single_file = ["package.json"],
        ),
        "base_package_json": attr.label(
            mandatory = True,
            doc = """A .json file to use to add additional properties to the generated package.
        This can often be a 'package.json' and the entries/outputs/dependencies will be filled in later on.""",
            allow_single_file = ["package.json"],
        ),
        "native_bundle": attr.string(doc = "The name for the native bundle if used"),
        "placeholder_version": attr.string(default = "0.0.0-PLACEHOLDER", doc = "The version to use for the local dependencies in the workspace"),
        "custom_entrypoints": attr.bool(default = False, doc = "If custom main/module/types entrypoints are specified and shouldn't be overwritten"),
        "dependencies": attr.label_list(
            doc = "The dependencies of the package. These will be added to the base package.json",
            default = [],
            providers = [JsInfo],
        ),
        "peer_dependencies": attr.label_list(
            doc = "The peer dependencies of the package. These will be added to the base package.json",
            default = [],
            providers = [JsInfo],
        ),
        "substitutions": attr.string_dict(default = {}),
        "_create_package_json": attr.label(
            executable = True,
            cfg = "exec",
            default = "//javascript/private:create_package_json",
        ),
    }, **STAMP_ATTRS),
)

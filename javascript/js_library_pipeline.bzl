load("//javascript/package_json:package_json.bzl", "create_package_json")
load("//javascript/rollup:rollup_build.bzl", "rollup_bin_build", "rollup_build")
load("@build_bazel_rules_nodejs//:index.bzl", "js_library")
load("@npm//jest-cli:index.bzl", "jest_test")
load("@npm//eslint:index.bzl", "eslint_test")
load(":npm.bzl", "publish_npm")
load(":utils.bzl", "filter_empty")

BUILD_DATA = [
    "@npm//rollup-plugin-dts",
    "@npm//rollup-plugin-esbuild",
    "@npm//rollup-plugin-styles",
    "@npm//@rollup/plugin-json",
]

PLACEHOLDER_VERSION = "0.0.0-PLACEHOLDER"

def is_test_file(file, test_file_pattern):
    for p in test_file_pattern:
        if p in file:
            return True
    return False

def filter_false(arr):
    filtered = []
    for f in arr:
        if f:
            filtered.append(f)

    return filtered

def include_exts(files, file_patterns):
    return filter_false([f if is_test_file(f, file_patterns) else None for f in files])

def without_tests(files, test_file_pattern):
    return filter_false([f if not is_test_file(f, test_file_pattern) else None for f in files])

def remove_duplicates(data):
    filtered = []
    for d in data:
        if d in filtered:
            continue
        filtered.append(d)
    return filtered

def js_library_pipeline(
        name,
        srcs,
        entry,
        bin_entry = None,
        bin_name = None,
        out_dir = "dist",
        bundle = False,
        dependencies = [],
        peer_dependencies = [],
        data = [],
        build_data = [],
        build_label = None,
        test_data = [],
        lint_data = [],
        lint_exts = [".ts", ".js", ".tsx", ".jsx"],
        js_library_data = [],
        test_env = {},
        placeholder_version = PLACEHOLDER_VERSION,
        version_file = "//:VERSION",
        root_package_json = "//:package.json",
        typings = [],
        test_file_pattern = [
            "_tests_",
            ".test.",
        ],
        ts_config = "//:tsconfig.json",
        jest_config = "//:jest.config.js",
        eslint_config = "//:.eslintrc.js"):
    create_package_json_name = "%s-package_json" % name
    js_build_name = build_label if build_label else "%s-js_build" % name
    js_bin_build_name = "%s-js_bin_build" % name if bin_entry else None

    create_package_json(
        name = create_package_json_name,
        package_name = name,
        entry = entry,
        bin_entry = bin_entry,
        bin_name = bin_name,
        out_dir = out_dir,
        placeholder_version = placeholder_version,
        dependencies = dependencies,
        peer_dependencies = peer_dependencies,
        root_package_json = root_package_json,
    )

    all_build_data = filter_empty(data + BUILD_DATA + build_data + dependencies + peer_dependencies + [":%s" % create_package_json_name, ts_config] + typings)

    if not build_label:
        rollup_build(
            name = js_build_name,
            entry = entry,
            out_dir = out_dir,
            srcs = srcs,
            data = all_build_data,
        )

        for t in ["cjs", "esm", "types"]:
            native.filegroup(
                name = "%s-%s" % (name, t),
                srcs = [":%s" % js_build_name],
                output_group = t,
            )

        if bin_entry:
            rollup_bin_build(
                name = js_bin_build_name,
                entry = bin_entry,
                out_dir = out_dir,
                bin_name = bin_name,
                srcs = srcs,
                data = all_build_data,
            )

    js_library(
        visibility = ["//visibility:public"],
        name = name,
        srcs = without_tests(srcs, test_file_pattern),
        package_name = name,
        deps = filter_empty([
            ":%s" % create_package_json_name,
            ":%s" % js_build_name,
            (":%s" % js_bin_build_name) if bin_entry else None,
        ] + dependencies + peer_dependencies + js_library_data),
    )

    eslint_test(
        name = "%s-lint" % name,
        data = remove_duplicates(filter_empty([eslint_config] + data + lint_data + test_data + dependencies + peer_dependencies + srcs)),
        args = [
            "--ext",
            ",".join(lint_exts),
        ] + ["$(execpath %s)" % (f) for f in include_exts(srcs, lint_exts)],
    )

    jest_test(
        name = "%s-unit" % name,
        env = dict(test_env, **{
            "JEST_JUNIT_OUTPUT_FILE": "$XML_OUTPUT_FILE",
            # Unset the coverage_dir so the default rules don't try to gather coverage
            "COVERAGE_DIR": "",
        }),
        args = [
            "--no-cache",
            "--ci",
            "--colors",
        ],
        data = filter_empty([jest_config] + data + test_data + dependencies + peer_dependencies + srcs),
    )

    publish_npm(
        name = "%s-publish",
        version = version_file,
        bundle = [":%s" % name],
    )

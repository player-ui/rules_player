load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_bazel_lib//lib:directory_path.bzl", "directory_path")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_run_binary", "js_library")
load("@aspect_rules_ts//ts:defs.bzl", "ts_config", "ts_project")
load("@bazel_skylib//rules:expand_template.bzl", "expand_template")
load(":vitest.bzl", "vitest_test")
load(":eslint.bzl", "eslint_test")
load(":tsup.bzl", "tsup_build", "tsup_native_build")
load(":package_json.bzl", "create_package_json")
load(":utils.bzl", "filter_empty", "without_tests")

test_file_pattern = [
    "_tests_",
    ".test.",
]

def oclif_pipeline(
        package_name,
        name = None,
        srcs = None,
        manifest = True,
        package_json = "package.json",
        root_package_json = "//:package.json",
        vitest_config = ":vitest_config",
        node_modules = "//:node_modules",
        deps = [],
        peer_deps = [],
        test_deps = ["//:vitest_config"],
        lint_deps = ["//:eslint_config"],
        build_deps = ["//:typings"]
    ):
    """
    A modified version of the `js_pipeline` for building oclif CLIs and CLI plugins.

    Creates a js_library, npm_package, and test targets for a given package.

    Args:
      package_name: The name of the package including the scope (@test/bar).
      srcs: The source files for the package (defaults to src/*).
      manifest: If an oclif manifest should be generated as part of the build. Not needed for CLI plugins.
      name: The name of the package (defaults to the last part of the package_name).
      package_json: The package.json file for the package (defaults to package.json).
      root_package_json: The root package.json file for the package (defaults to //:package.json).
      vitest_config: The vitest config for the package (defaults to None).
      node_modules: The base node_modules to pull dependencies from (defaults to //:node_modules).
      deps: The dependencies for the package.
      native_bundle: The name for the native bundle global if defined.
      private: Whether or not the package should be private (skipping an npm release).
      peer_deps: The peer dependencies for the package.
      test_deps: The test dependencies for the package.
      lint_deps: The lint dependencies for the package.
      build_deps: The build dependencies for the package.
    """

    tslib_ref = "{}/tslib".format(node_modules)

    if tslib_ref not in deps:
        deps = deps + [tslib_ref]

    if srcs == None:
        srcs = native.glob(["src/**/*"])

    if name == None:
        # name = package_name.split("/")[-1]
        name = native.package_name().split("/")[-1]

    all_deps = deps + peer_deps + build_deps

    ts_config_name = name + "_ts_config"
    ts_config_target = ":" + ts_config_name

    ts_config(
        name = ts_config_name,
        src = "tsconfig.json",
        deps = [
            "//:tsconfig",
        ],
    )
    
    tsc_build_name = name + "_tsc_build"
    tsc_build_target = ":" + tsc_build_name

    ts_project(
        name = tsc_build_name,
        srcs = native.glob(
            [
                "bin/**/*",
                "src/**/*",
            ],
            exclude = [
                "**/__tests__/*",
                "**/*.test.*",
            ],
        ),
        declaration = True,
        out_dir = "dist",
        root_dir = "src",
        transpiler = "tsc",
        tsconfig = ts_config_target,
        validate = False,
        deps = all_deps,
    )

    package_json_name = name + "_package_json"
    package_json_target = ":" + package_json_name

    create_package_json(
        name = package_json_name,
        base_package_json = "package.json",
        dependencies = deps,
        peer_dependencies = peer_deps,
        root_package_json = "//:package.json",
        substitutions = {
            "0.0.0-PLACEHOLDER": "{STABLE_VERSION}",
        },
        custom_entrypoints = True,
    )

    manifest_target = []

    if manifest == True :
        manifest_name = name + "_manifest"
        manifest_target = [":" + manifest_name]

        oclif_cli_entry = "{}_oclif_entrypoint".format(name)
        oclif_bin = "{}_oclif_bin".format(name)

        directory_path(
            name = oclif_cli_entry,
            directory = "{}/oclif/dir".format(node_modules),
            path = "bin/run.js",
        )

        js_binary(
            name = oclif_bin,
            data = ["{}/oclif".format(node_modules)],
            entry_point = ":{}".format(oclif_cli_entry),
        )

        js_run_binary(
            name = manifest_name,
            tool = ":{}".format(oclif_bin),
            stamp = -1,
            srcs = [
                "package.json",
                tsc_build_target,
                package_json_target,
            ],
            outs = ["oclif.manifest.json"],
            args = ["manifest"],
            chdir = native.package_name(),
        )

    bundle_name = name + "_bundle"
    bundle_target = ":" + bundle_name

    js_library(
        name = bundle_name,
        srcs = [
            tsc_build_target,
            package_json_target,
        ] + native.glob(["bin/*"])
        + manifest_target,
        deps = all_deps,
    )

    vitest_test(
        name = name + "_unit",
        config = ":vitest_config",
        data = native.glob(["src/**/*"]) + all_deps + ["//:vitest_config"],
        node_modules = "//:node_modules",
    )

    eslint_test(
        name = name + "_lint",
        srcs = native.glob(["src/**/*"]),
        data = native.glob(["src/**/*"]) + all_deps + ["//:eslint_config"],
        node_modules = "//:node_modules",
    )

    package_name = name + "_package"
    package_target = ":" + package_name

    npm_package(
        name = package_name,
        srcs = [
            "README.md",
            bundle_target,
        ],
        allow_overwrites = True,
        package = package_name,
        replace_prefixes = {
            package_json_name : "package",
        },
        visibility = ["//visibility:public"],
    )

    js_binary(
        name = name + ".npm-publish",
        chdir = native.package_name() + "/" + name,
        data = [package_target],
        entry_point = "@aspect_rules_js//npm/private:npm_publish_mjs",
        # required to make npm to be available in PATH
        include_npm = True,
    )

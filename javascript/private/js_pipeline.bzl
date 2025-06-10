"""
Macro implementation for the main JS/TS compile, test, and publish workflow
"""

load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_library")
load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_rules_ts//ts:defs.bzl", "ts_project")
load("@bazel_skylib//rules:expand_template.bzl", "expand_template")
load(":eslint.bzl", "eslint_test")
load(":package_json.bzl", "create_package_json")
load(":tsup.bzl", "tsup_build", "tsup_native_build")
load(":utils.bzl", "filter_empty", "without_tests")
load(":vitest.bzl", "vitest_test")

test_file_pattern = [
    "_tests_",
    ".test.",
]

def js_pipeline(
        package_name,
        name = None,
        srcs = None,
        package_json = "package.json",
        root_package_json = "//:package.json",
        vitest_config = ":vitest_config",
        tsup_config = ":tsup_config",
        node_modules = "//:node_modules",
        deps = [],
        native_bundle = None,
        private = False,
        peer_deps = [],
        create_package_json_args = {},
        include_packaging_targets = [],
        test_deps = ["//:vitest_config"],
        lint_deps = ["//:eslint_config"],
        build_deps = ["//:tsup_config", "//:typings"]):
    """
    The main entry point for any JS/TS project. `js_pipeline` should be the only thing you need in your BUILD file.

    Creates a js_library, npm_package, and test targets for a given package.

    Args:
      package_name: The name of the package including the scope (@test/bar).
      srcs: The source files for the package (defaults to src/*).
      name: The name of the package (defaults to the last part of the package_name).
      package_json: The package.json file for the package (defaults to package.json).
      root_package_json: The root package.json file for the package (defaults to //:package.json).
      vitest_config: The vitest config for the package (defaults to None).
      tsup_config: The tsup config for the package (defaults to None).
      node_modules: The base node_modules to pull dependencies from (defaults to //:node_modules).
      deps: The dependencies for the package.
      native_bundle: The name for the native bundle global if defined.
      private: Whether or not the package should be private (skipping an npm release).
      create_package_json_args: Additional arguments to pass to the package_json creation
      include_packaging_targets: Additional dependencies to add to the package target
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

    tsup_build_name = name + "_tsup_build"
    tsup_build_target = ":" + tsup_build_name

    tsup_build(
        name = tsup_build_name,
        srcs = srcs,
        config = tsup_config,
        data = deps + build_deps + peer_deps + [package_json],
        node_modules = node_modules,
    )

    native_bundle_target_dep = []

    if native_bundle != None:
        native_bundle_name = name + "_native_bundle"
        native_bundle_target = ":" + native_bundle_name
        native_bundle_target_dep = [native_bundle_target]

        tsup_native_build(
            name = native_bundle_name,
            native_bundle = native_bundle,
            srcs = srcs,
            config = tsup_config,
            data = deps + build_deps + peer_deps + [package_json],
            node_modules = node_modules,
        )

    tsconfig = "{}_tsconfig".format(name)
    prefix = "../" * len(native.package_name().split("/"))

    expand_template(
        name = tsconfig,
        out = "tsconfig.json",
        substitutions = {
            "%PREFIX%": prefix,
        },
        template = "@rules_player//javascript/private:tsconfig.json.tmpl",
    )

    ts_types = "{}_ts_types".format(name)
    ts_types_target = ":" + ts_types
    ts_project(
        name = ts_types,
        srcs = without_tests(srcs + [package_json], test_file_pattern),
        deps = deps + build_deps + peer_deps,
        validate = False,
        declaration = True,
        declaration_dir = ts_types,
        emit_declaration_only = True,
        out_dir = ts_types,
        tsconfig = ":{}".format(tsconfig),
    )

    vitest_test(
        name = name + "_vitest",
        config = vitest_config,
        node_modules = node_modules,
        data = srcs + deps + test_deps + peer_deps,
    )

    eslint_test(
        name = name + "_eslint",
        srcs = srcs,
        node_modules = node_modules,
        data = srcs + deps + lint_deps,
    )

    package_json_name = name + "_package_json"
    package_json_target = ":" + package_json_name

    create_package_json(
        name = package_json_name,
        root_package_json = root_package_json,
        base_package_json = package_json,
        dependencies = deps,
        peer_dependencies = peer_deps,
        native_bundle = native_bundle,
        stamp = -1,
        substitutions = {
            "0.0.0-PLACEHOLDER": "{STABLE_VERSION}",
        },
        **create_package_json_args
    )

    js_library_name = name + "_js_library"
    js_library_target = ":" + js_library_name

    js_library(
        name = js_library_name,
        srcs = srcs + [tsup_build_target, package_json_target, ts_types_target] + native_bundle_target_dep,
        deps = deps,
    )

    replacements = {}
    replacements[package_json_name] = "package"
    replacements[ts_types + "/src"] = "types"

    npm_package(
        name = name,
        visibility = ["//visibility:public"],
        package = package_name,
        srcs = [js_library_target, tsup_build_target] + include_packaging_targets,
        tags = filter_empty([
            "do-not-publish" if private else None,
        ]),
        replace_prefixes = replacements,
    )

    js_binary(
        name = name + ".npm-publish",
        chdir = native.package_name() + "/" + name,
        data = [":" + name],
        entry_point = "@aspect_rules_js//npm/private:npm_publish_mjs",
        # required to make npm to be available in PATH
        include_npm = True,
    )

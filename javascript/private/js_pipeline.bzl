load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_rules_js//js:defs.bzl", "js_library")
load(":vitest.bzl", "vitest_test")
load(":eslint.bzl", "eslint_test")
load(":tsup.bzl", "tsup_build")
load(":package_json.bzl", "create_package_json")
load(":utils.bzl", "filter_empty")

def js_pipeline(
        package_name,
        srcs = None,
        package_json = "package.json",
        root_package_json = "//:package.json",
        vitest_config = ":vitest_config",
        tsup_config = ":tsup_config",
        node_modules = "//:node_modules",
        deps = [],
        private = False,
        peer_deps = [],
        test_deps = ["//:vitest_config"],
        lint_deps = ["//:eslint_config"],
        build_deps = ["//:tsup_config", "//:typings"]):
    """
    Creates a js_library, npm_package, and test targets for a given package.

    Args:
      package_name: The name of the package including the scope (@test/bar).
      srcs: The source files for the package (defaults to src/*).
      package_json: The package.json file for the package (defaults to package.json).
      root_package_json: The root package.json file for the package (defaults to //:package.json).
      vitest_config: The vitest config for the package (defaults to None).
      tsup_config: The tsup config for the package (defaults to None).
      node_modules: The base node_modules to pull dependencies from (defaults to //:node_modules).
      deps: The dependencies for the package.
      private: Whether or not the package should be private (skipping an npm release).
      peer_deps: The peer dependencies for the package.
      test_deps: The test dependencies for the package.
      lint_deps: The lint dependencies for the package.
      build_deps: The build dependencies for the package.
    """

    if srcs == None:
        srcs = native.glob(["src/**/*"])

    name = package_name.split("/")[-1]

    tsup_build_name = name + "_tsup_build"
    tsup_build_target = ":" + tsup_build_name

    tsup_build(
        name = tsup_build_name,
        srcs = srcs,
        config = tsup_config,
        data = deps + build_deps,
        node_modules = node_modules,
    )

    vitest_test(
        name = name + "_vitest",
        config = vitest_config,
        node_modules = node_modules,
        data = srcs + deps + test_deps,
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
    )

    js_library_name = name + "_js_library"
    js_library_target = ":" + js_library_name

    js_library(
        name = js_library_name,
        srcs = srcs + [tsup_build_target, package_json_target],
        deps = deps,
    )

    npm_package(
        name = name,
        visibility = ["//visibility:public"],
        package = package_name,
        srcs = [js_library_target, tsup_build_target],
        tags = filter_empty([
            "do-not-publish" if private else None,
        ]),
    )

load("@aspect_rules_js//npm:defs.bzl", "npm_package")
load("@aspect_rules_js//js:defs.bzl", "js_library")
load(":vitest.bzl", "vitest_test")
load(":eslint.bzl", "eslint_test")

def js_pipeline(
  package_name,
  srcs = None,
  package_json = "package.json",
  vitest_config = "vitest.config.ts",
  node_modules = "//:node_modules",
  deps = [],
  test_deps = ["//:vitest_config"],
  lint_deps = ["//:eslint_config"],
  ):
  """
  Creates a js_library, npm_package, and test targets for a given package.

  Args:
    package_name: The name of the package including the scope (@test/bar).
    srcs: The source files for the package (defaults to src/*).
    package_json: The package.json file for the package (defaults to package.json).
    vitest_config: The vitest config for the package (defaults to None).
    node_modules: The base node_modules to pull dependencies from (defaults to //:node_modules).
    deps: The dependencies for the package.
    test_deps: The test dependencies for the package.
    lint_deps: The lint dependencies for the package.
  """

  if srcs == None:
    srcs = native.glob(["src/**/*"])

  srcs_with_package_json = srcs + [package_json]

  name = package_name.split("/")[-1]
  js_library_name = name + "_js_library"
  js_library_target = ":" + js_library_name

  js_library(
    name = js_library_name,
    srcs = srcs_with_package_json,
    deps = deps,
  )

  vitest_test(
    name = name + "_vitest",
    config = vitest_config,
    node_modules = node_modules,
    data = srcs_with_package_json + deps + test_deps,
  )

  eslint_test(
    name = name + "_eslint",
    srcs = srcs,
    node_modules = node_modules,
    data = srcs_with_package_json + deps + lint_deps,
  )

  npm_package(
    name = name,
    visibility = ["//visibility:public"],
    package = package_name,
    srcs = [js_library_target],
  )
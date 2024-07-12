load("@npm//:defs.bzl", "npm_link_all_packages")
load("@aspect_rules_js//js:defs.bzl", "js_library")

package(default_visibility = ["//visibility:public"])

npm_link_all_packages(
    name = "node_modules",
)

exports_files([
    "package.json",
    "VERSION",
])

js_library(
    name = "typings",
    srcs = [],
    visibility = ["//visibility:public"],
    deps = [],
)

js_library(
    name = "vitest_config",
    testonly = True,
    srcs = [
        "vitest.config.ts",
    ],
    visibility = ["//visibility:public"],
    deps = [
        "//:node_modules/vitest",
    ],
)

js_library(
    name = "eslint_config",
    testonly = True,
    srcs = [
        ".eslintrc.js",
    ],
    visibility = ["//visibility:public"],
    deps = [
        ":node_modules/@typescript-eslint/eslint-plugin",
        ":node_modules/@typescript-eslint/parser",
        ":node_modules/eslint",
    ],
)

js_library(
    name = "tsup_config",
    srcs = [
        "tsup.config.ts",
    ],
    visibility = ["//visibility:public"],
    deps = [
        ":node_modules/tsup",
        ":node_modules/typescript",
    ],
)

load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
load("@aspect_rules_js//js:defs.bzl", "js_binary")

exports_files(
    glob(["*.bzl"]),
    visibility = ["//docs:__pkg__"],
)

exports_files(
    ["tsconfig.json.tmpl"],
    visibility = ["//visibility:public"],
)

js_binary(
    name = "create_package_json",
    entry_point = "create_package_json.mjs",
    visibility = ["//visibility:public"],
)

bzl_library(
    name = "js_pipeline",
    srcs = ["js_pipeline.bzl"],
    visibility = [
        "//docs:__subpackages__",
        "//javascript:__subpackages__",
    ],
    deps = [
        ":eslint",
        ":package_json",
        ":tsup",
        ":utils",
        ":vitest",
        "@aspect_rules_js//js:defs",
        "@aspect_rules_js//npm:defs",
        "@aspect_rules_ts//ts:defs",
        "@bazel_skylib//rules:expand_template",
    ],
)

bzl_library(
    name = "vitest",
    srcs = ["vitest.bzl"],
    visibility = [
        "//docs:__subpackages__",
        "//javascript:__subpackages__",
    ],
    deps = [
        "@aspect_bazel_lib//lib:directory_path",
        "@aspect_rules_js//js:defs",
    ],
)

bzl_library(
    name = "eslint",
    srcs = ["eslint.bzl"],
    visibility = [
        "//docs:__subpackages__",
        "//javascript:__subpackages__",
    ],
    deps = [
        ":utils",
        "@aspect_bazel_lib//lib:directory_path",
        "@aspect_rules_js//js:defs",
    ],
)

bzl_library(
    name = "utils",
    srcs = ["utils.bzl"],
    visibility = [
        "//docs:__subpackages__",
        "//javascript:__subpackages__",
    ],
    deps = [
        "@aspect_rules_js//js:providers",
    ],
)

bzl_library(
    name = "package_json",
    srcs = ["package_json.bzl"],
    visibility = [
        "//docs:__subpackages__",
        "//javascript:__subpackages__",
    ],
    deps = [
        ":utils",
        "@aspect_rules_js//js:defs",
    ],
)

bzl_library(
    name = "tsup",
    srcs = ["tsup.bzl"],
    visibility = [
        "//docs:__subpackages__",
        "//javascript:__subpackages__",
    ],
    deps = [
        "@aspect_bazel_lib//lib:directory_path",
        "@aspect_rules_js//js:defs",
    ],
)

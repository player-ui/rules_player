load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

bzl_library(
    name = "dsl",
    srcs = ["dsl.bzl"],
    visibility = ["//player:__subpackages__"],
    deps = [
        "@aspect_rules_js//js:defs",
        "@aspect_bazel_lib//lib:directory_path",
    ]
)

bzl_library(
    name = "xlr",
    srcs = ["xlr.bzl", "js_xlr_pipeline.bzl"],
    visibility = ["//player:__subpackages__"],
    deps = [
        "//javascript:defs",
    ]
)

bzl_library(
    name = "config",
    srcs = ["config.bzl"],
    visibility = ["//player:__subpackages__"],
    deps = [
        "@aspect_rules_js//js:providers"
    ]
)

exports_files([
    "player.config.js.template",
])

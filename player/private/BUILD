load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")

bzlformat_pkg(name = "bzlformat")

bzlformat_missing_pkgs(name = "bzlformat_missing_pkgs")

bzl_library(
    name = "dsl",
    srcs = ["dsl.bzl"],
    visibility = ["//player:__subpackages__"],
    deps = [
        "@aspect_bazel_lib//lib:directory_path",
        "@aspect_rules_js//js:defs",
    ],
)

bzl_library(
    name = "xlr",
    srcs = [
        "js_xlr_pipeline.bzl",
        "xlr.bzl",
    ],
    visibility = ["//player:__subpackages__"],
    deps = [
        "//javascript:defs",
    ],
)

bzl_library(
    name = "config",
    srcs = ["config.bzl"],
    visibility = ["//player:__subpackages__"],
    deps = [
        "@aspect_rules_js//js:providers",
    ],
)

exports_files([
    "player.config.js.template",
])

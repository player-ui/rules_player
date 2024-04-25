load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

bzl_library(
    name = "dsl",
    srcs = ["dsl.bzl"],
    visibility = ["//player:__subpackages__"],
)

bzl_library(
    name = "xlr",
    srcs = ["xlr.bzl"],
    visibility = ["//player:__subpackages__"],
)

bzl_library(
    name = "config",
    srcs = ["config.bzl"],
    visibility = ["//player:__subpackages__"],
)

exports_files([
    "player.config.js.template",
])

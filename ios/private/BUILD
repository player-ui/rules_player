load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

bzl_library(
    name = "common_utils",
    srcs = ["common_utils.bzl"],
    visibility = [
        "//ios:__subpackages__",
    ],
)

exports_files([
    "ResourceShimTemplate.swift",
    "Info.plist"
])

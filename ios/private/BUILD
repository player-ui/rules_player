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
    "Info.plist",
    "pod_repo_push.sh",
    "pod_trunk_push.sh",
    "unzip_and_tag.sh",
    "push.sh"
])

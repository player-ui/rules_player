load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

bzl_library(
    name = "common_utils",
    srcs = ["common_utils.bzl", "publishing.bzl"],
    visibility = [
        "//ios:__subpackages__",
    ],
    deps = [
        "@rules_pkg//:pkg.bzl",
        "@rules_pkg//:mappings.bzl",
        "@rules_pkg//pkg:bzl_srcs",
        "@bazel_skylib//lib:paths",
        "@build_bazel_rules_apple//apple:resources",
        "@build_bazel_rules_ios//rules:test",
        "@aspect_bazel_lib//lib:stamping"
    ]
)

exports_files([
    "ResourceShimTemplate.swift",
    "Info.plist",
    "pod_repo_push.sh",
    "pod_trunk_push.sh",
    "unzip_and_tag.sh",
    "push.sh"
])

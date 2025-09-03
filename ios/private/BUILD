load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")

bzlformat_pkg(name = "bzlformat")

bzlformat_missing_pkgs(name = "bzlformat_missing_pkgs")

bzl_library(
    name = "common_utils",
    srcs = [
        "common_utils.bzl",
    ],
    visibility = [
        "//ios:__subpackages__",
    ],
    deps = [
        "@@rules_cc+//cc/common",
        "@aspect_bazel_lib//lib:stamping",
        "@bazel_skylib//lib:paths",
        "@build_bazel_rules_apple//apple:ios",
        "@build_bazel_rules_apple//apple:resources",
        "@rules_pkg//:mappings.bzl",
        "@rules_pkg//:pkg.bzl",
        "@rules_pkg//pkg:bzl_srcs",
    ],
)

bzl_library(
    name = "spm_publishing",
    srcs = ["spm_publishing.bzl"],
    visibility = [
        "//ios:__subpackages__",
    ],
    deps = [
        "@aspect_bazel_lib//lib:stamping",
        "@rules_pkg//:mappings.bzl",
        "@rules_pkg//:pkg.bzl",
        "@rules_pkg//pkg:bzl_srcs",
    ],
)

bzl_library(
    name = "cocoapods_publishing",
    srcs = ["cocoapods_publishing.bzl"],
    visibility = [
        "//ios:__subpackages__",
    ],
    deps = [
        "@aspect_bazel_lib//lib:stamping",
    ],
)

bzl_library(
    name = "zip",
    srcs = ["zip.bzl"],
    visibility = [
        "//ios:__subpackages__",
    ],
    deps = [
        "@rules_pkg//:mappings.bzl",
        "@rules_pkg//:pkg.bzl",
        "@rules_pkg//pkg:bzl_srcs",
    ],
)

bzl_library(
    name = "discover_ios_targets",
    srcs = ["discover_ios_targets.bzl"],
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
    "push.sh",
    "discover_ios_targets.sh",
])

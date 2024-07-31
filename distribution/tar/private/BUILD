load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")

bzlformat_pkg(name = "bzlformat")

bzlformat_missing_pkgs(name = "bzlformat_missing_pkgs")

bzl_library(
    name = "stamp_tar_files",
    srcs = ["stamp_tar_files.bzl"],
    visibility = [
        "//distribution:__subpackages__",
    ],
)

js_binary(
    name = "stamp_tar_files_script",
    entry_point = "stamp_tar_files.mjs",
    visibility = ["//visibility:public"],
)

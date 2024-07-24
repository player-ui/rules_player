load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

bzl_library(
    name = "stamp_tar_files",
    srcs = ["stamp_tar_files.bzl"],
    visibility = [
        "//distribution:__subpackages__",
    ],
)

js_binary(
    name = "stamp_tar_files_script",
    entry_point = "stamp_tar_files.js",
    visibility = ["//visibility:public"],
)


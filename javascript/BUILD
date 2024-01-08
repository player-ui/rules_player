load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

exports_files(["defs.bzl"])

bzl_library(
    name = "defs",
    srcs = ["defs.bzl"],
    visibility = ["//visibility:public"],
    deps = [
        "//javascript/private:eslint",
        "//javascript/private:js_pipeline",
        "//javascript/private:vitest",
    ],
)

filegroup(
    name = "all_files",
    # Include every package that is required by the child workspaces.
    srcs = [
        "defs.bzl",
        "//javascript/private:all_files",
    ],
    visibility = ["//:__subpackages__"],
)

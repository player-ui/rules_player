load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

exports_files(["defs.bzl"])

filegroup(
    name = "all_files",
    srcs = glob(["*"]),
    visibility = ["//:__subpackages__"],
)

bzl_library(
    name = "defs",
    srcs = ["defs.bzl"],
    visibility = ["//visibility:public"],
    deps = [
        "//javascript/private:eslint",
        "//javascript/private:js_pipeline",
        "//javascript/private:oclif",
        "//javascript/private:vitest",
    ],
)

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
        "//kotlin/private:distribution",
        "//kotlin/private:kt_jvm",
        "//kotlin/private:lint",
    ],
)

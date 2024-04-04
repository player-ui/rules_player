load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

exports_files(["defs.bzl"])

bzl_library(
    name = "defs",
    srcs = ["defs.bzl"],
    visibility = ["//visibility:public"],
    deps = [
        "//kotlin/private:lint",
        "//kotlin/private:distribution",
        "//kotlin/private:kt_jvm"
    ],
)
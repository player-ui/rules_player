load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

filegroup(
    name = "all_files",
    srcs = glob(["*"]),
    visibility = ["//:__subpackages__"],
)

bzl_library(
    name = "lint",
    srcs = ["lint.bzl"],
    visibility = [
        "//kotlin:__subpackages__",
    ],
    deps = [
        ":scope_name",
    ],
)

bzl_library(
    name = "junit",
    srcs = [
        "junit5.bzl",
        "junit_test.bzl",
    ],
    visibility = [
        "//kotlin:__subpackages__",
    ],
)

bzl_library(
    name = "distribution",
    srcs = ["distribution.bzl"],
    visibility = [
        "//kotlin:__subpackages__",
    ],
    deps = [
        ":scope_name",
        "@rules_jvm_external//:defs.bzl",
    ],
)

bzl_library(
    name = "kt_jvm",
    srcs = ["kt_jvm.bzl"],
    visibility = [
        "//kotlin:__subpackages__",
    ],
    deps = [
        ":distribution",
        ":junit",
        ":kt_jvm_library_and_test.bzl",
        ":lint",
        "@rules_java//java:rules",
        "@rules_jvm_external//:implementation",
        "@rules_kotlin//kotlin",
    ],
)

bzl_library(
    name = "scope_name",
    srcs = ["scope_name.bzl"],
    visibility = [
        "//kotlin:__subpackages__",
    ],
    deps = [],
)

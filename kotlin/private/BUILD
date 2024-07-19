load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

bzl_library(
    name = "lint",
    srcs = ["lint.bzl"],
    visibility = [
        "//kotlin:__subpackages__",
    ],
    deps = [
        ":scope_name"
    ]
)

bzl_library(
    name = "junit",
    srcs = ["junit_test.bzl", "junit5.bzl"],
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
    ]
)

bzl_library(
    name = "kt_jvm",
    srcs = ["kt_jvm.bzl",],
    visibility = [
        "//kotlin:__subpackages__",
    ],
    deps = [
        ":lint",
        ":distribution",
        ":kt_jvm_library_and_test.bzl",
        ":junit",
        "@rules_kotlin//kotlin",
        "@rules_jvm_external//:implementation",
        "@rules_java//java:rules",
    ]
)

bzl_library(
    name = "scope_name",
    srcs = ["scope_name.bzl"],
    visibility = [
        "//kotlin:__subpackages__",
    ],
    deps = [],
)
load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")

bzlformat_pkg(name = "bzlformat")

bzlformat_missing_pkgs(name = "bzlformat_missing_pkgs")

filegroup(
    name = "all_files",
    srcs = glob(["*"]),
    visibility = ["//:__subpackages__"],
)

js_binary(
    name = "build_requirements",
    entry_point = "build_requirements.mjs",
    visibility = ["//visibility:public"],
)

exports_files(
    glob(["*.bzl"]),
    visibility = ["//docs:__pkg__"],
)

exports_files(
    [
        "pytest_wrapper.py.tmpl",
        "pytest_wrapper.py",
    ],
    visibility = ["//visibility:public"],
)

bzl_library(
    name = "py_pipeline",
    srcs = ["py_pipeline.bzl"],
    visibility = [
        "//docs:__subpackages__",
        "//python:__subpackages__",
    ],
    deps = [
    ],
)

load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
load("@aspect_rules_js//js:defs.bzl", "js_binary")

exports_files(
    glob(["*.bzl"]),
    visibility = ["//docs:__pkg__"],
)

js_binary(
  name = "create_package_json",
  entry_point = "create_package_json.mjs",
  visibility = ["//visibility:public"],
)

bzl_library(
  name = "js_pipeline",
  srcs = ["js_pipeline.bzl"],
  visibility = [
    "//docs:__subpackages__",
    "//javascript:__subpackages__",
  ],
  deps = []
)

bzl_library(
  name = "vitest",
  srcs = ["vitest.bzl"],
  visibility = [
    "//docs:__subpackages__",
    "//javascript:__subpackages__",
  ],
  deps = []
)

bzl_library(
  name = "eslint",
  srcs = ["eslint.bzl"],
  visibility = [
    "//docs:__subpackages__",
    "//javascript:__subpackages__",
  ],
  deps = []
)

bzl_library(
  name = "utils",
  srcs = ["utils.bzl"],
  visibility = [
    "//docs:__subpackages__",
    "//javascript:__subpackages__",
  ],
  deps = []
)
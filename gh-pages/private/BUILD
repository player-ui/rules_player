load("@aspect_rules_js//js:defs.bzl", "js_binary","js_run_binary","js_library")
load("@bazel_skylib//:bzl_library.bzl", "bzl_library")

package(default_visibility = ["//visibility:public"])

js_library(
    name = "gh_pages_lib",
    srcs = [
        "gh-pages.js"
    ],
    visibility = ["//visibility:public"],
)
exports_files([
    "gh-pages.js"
])

js_binary(
    name = "gh_pages_bin",
    data = ["//gh-pages/private:gh-pages.js"],
    entry_point = "//gh-pages/private:gh-pages.js",
    visibility = ["//visibility:public"],
    
)

filegroup(
    name = "npm_depdencies",
    srcs = glob(["node_modules/**/*"]),
    visibility = [
        "//visibility:public"
    ]
)

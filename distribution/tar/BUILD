load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@bazel_skylib//rules:build_test.bzl", "build_test")
load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
package(default_visibility = ["//visibility:public"])

# load("@tar__7.4.1//:defs.bzl", npm_link_tar = "npm_link_imported_package")

# npm_link_all_packages(
#     name = "node_modules",
#     imported_links = [
#         npm_link_tar,
#     ]
# )

# build_test(
#     name = "node_modules_build_test",
#     targets = ["//:node_modules"],
# )

# NODE_MODULES = npm_link_targets(
#     name = "node_modules",
#     package = package_name(),
# ) + [
#     "//:node_modules/tar",
# ]


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


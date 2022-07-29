load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

package(default_visibility = ["//visibility:public"])

nodejs_binary(
    name = "vsce_stamp",
    entry_point = "vsce_stamp.js",
    data = [
      "@npm//extract-zip",
      "@npm//zip-folder"
    ]
)
load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

package(default_visibility = ["//visibility:public"])

nodejs_binary(
    name = "create_package_json",
    entry_point = "create_package_json.js",
)

nodejs_binary(
    name = "merge_json",
    entry_point = "merge_json.js",
)

nodejs_binary(
    name = "contributors",
    entry_point = "contributors.js",
)
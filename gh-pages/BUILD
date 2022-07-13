load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

package(default_visibility = ["//visibility:public"])

nodejs_binary(
    name = "gh_pages_deploy",
    data = [],
    entry_point = ":gh-pages.js",
)
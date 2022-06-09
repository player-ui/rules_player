load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

package(default_visibility = ["//visibility:public"])

nodejs_binary(
    name = "next_build",
    data = [
        "@npm//next",
    ],
    entry_point = ":next.build.js",
)

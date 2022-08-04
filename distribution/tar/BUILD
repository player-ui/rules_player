load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary")

package(default_visibility = ["//visibility:public"])

nodejs_binary(
    name = "stamp_tar_files",
    entry_point = "stamp_tar_files.js",
    data = [
      "@npm//tar"
    ]
)
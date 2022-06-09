load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("//internal:maybe.bzl", "maybe")

def javascript():
    maybe(
        http_archive,
        name = "build_bazel_rules_nodejs",
        sha256 = "3aa6296f453ddc784e1377e0811a59e1e6807da364f44b27856e34f5042043fe",
        urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/4.4.2/rules_nodejs-4.4.2.tar.gz"],
    )

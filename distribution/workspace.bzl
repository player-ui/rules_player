load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//internal:maybe.bzl", "maybe")

def distribution():
    maybe(
        git_repository,
        name = "vaticle_bazel_distribution",
        remote = "https://github.com/sugarmanz/bazel-distribution",
        commit = "286edb982fbed85d55a3e8c12b00c79f6185bccd",
        shallow_since = "1654110796 -0400"
    )

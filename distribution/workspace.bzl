load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//internal:maybe.bzl", "maybe")

def distribution():
    maybe(
        git_repository,
        name = "vaticle_bazel_distribution",
        remote = "https://github.com/sugarmanz/bazel-distribution",
        commit = "bed14cb724933c3fe7a0480060be8c5020f43a26",
        shallow_since = "1658265259 -0400"
    )

load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//internal:maybe.bzl", "maybe")

def distribution():
    maybe(
        git_repository,
        name = "vaticle_bazel_distribution",
        remote = "https://github.com/sugarmanz/bazel-distribution",
        commit = "5908b54a601771830fef77124a6615c51b7af738",
        shallow_since = "1658338123 -0400"
    )

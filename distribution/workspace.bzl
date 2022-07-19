load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//internal:maybe.bzl", "maybe")

def distribution():
    maybe(
        git_repository,
        name = "vaticle_bazel_distribution",
        remote = "https://github.com/sugarmanz/bazel-distribution",
        commit = "79cc6c566b474e0a093fdbc4da2e79da17c7fdeb",
        shallow_since = "1658273021 -0400"
    )

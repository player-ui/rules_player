load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//internal:maybe.bzl", "maybe")

def distribution():
    maybe(
        git_repository,
        name = "vaticle_bazel_distribution",
        remote = "https://github.com/sugarmanz/bazel-distribution",
        commit = "ffccd79b47c743aaee70fe1288f39d1c07931824",
        shallow_since = "1670883396 -0500"
    )

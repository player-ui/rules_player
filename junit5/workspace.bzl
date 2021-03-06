load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//internal:maybe.bzl", "maybe")

def junit5():
    maybe(
        git_repository,
        name = "junit",
        remote = "https://github.com/sugarmanz/junit5-samples",
        commit = "2617a5e6fb5b858894f1c9ede486498e70becf99", 
        shallow_since = "1648584808 -0400"
    )

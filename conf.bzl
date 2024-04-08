load("//bazel:conf.bzl", _skylib = "skylib")
load("//apple:conf.bzl", _apple = "apple")
load("//distribution:conf.bzl", _distribution = "distribution")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

skylib = _skylib
apple = _apple
distribution = _distribution
javascript = _javascript

def my_data_dependency():
    git_repository(
        name = "junit",
        remote = "https://github.com/sugarmanz/junit5-samples",
        commit = "2617a5e6fb5b858894f1c9ede486498e70becf99",
        shallow_since = "1648584808 -0400"
    )

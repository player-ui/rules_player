load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//junit5:workspace.bzl", "junit5")
load("//internal:maybe.bzl", "maybe")

# Load Kotlin rules from remote artifact
def kotlin(
    tag = "v1.7.1", 
    sha256 = "fd92a98bd8a8f0e1cdcb490b93f5acef1f1727ed992571232d33de42395ca9b3",
    baseUrl = "https://github.com/bazelbuild/rules_kotlin/releases/download",
    name = "rules_kotlin_release.tgz",
):
    maybe(
        http_archive,
        name = "io_bazel_rules_kotlin",
        urls = ["%s/%s/%s" % (baseUrl, tag, name)],
        sha256 = sha256,
    )
    junit5()

# Load Kotlin rules from git
def kotlin_repository(
    remote = "https://github.com/bazelbuild/rules_kotlin.git",
    **kwargs,
):
    maybe(
        git_repository,
        name = "io_bazel_rules_kotlin_repo",
        remote = remote,
        **kwargs,
    )
    junit5()

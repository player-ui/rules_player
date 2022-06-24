load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//junit5:workspace.bzl", "junit5")
load("//internal:maybe.bzl", "maybe")

# Load Kotlin rules from remote artifact
def kotlin(
    tag = "v1.6.0-resources",
    sha256 = "2a69d70f6c8492855468d4e72b52147fa4c3ddb2479e06037704338d708a8be1",
    name = "rules_kotlin_release.tgz",
    baseUrl = "https://github.com/sugarmanz/rules_kotlin/releases/download",
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
    remote = "https://github.com/sugarmanz/rules_kotlin.git",
    **kwargs,
):
    maybe(
        git_repository,
        name = "io_bazel_rules_kotlin_repo",
        remote = remote,
        **kwargs,
    )
    junit5()

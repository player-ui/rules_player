load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//internal:maybe.bzl", "maybe")

def maven(tag = "5.3", sha = "d31e369b854322ca5098ea12c69d7175ded971435e55c18dd9dd5f29cc5249ac"):
    maybe(
        http_archive,
        name = "rules_jvm_external",
        strip_prefix = "rules_jvm_external-%s" % tag,
        sha256 = sha,
        url = "https://github.com/bazelbuild/rules_jvm_external/archive/%s.zip" % tag,
    )

# Load maven rules from git
def maven_repository(
        remote = "https://github.com/sugarmanz/rules_jvm_external.git",
        branch = "maven-export-aar",
        **kwargs):
    maybe(
        git_repository,
        name = "rules_jvm_external",
        remote = remote,
        branch = branch,
        **kwargs
    )

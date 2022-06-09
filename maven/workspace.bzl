load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("//internal:maybe.bzl", "maybe")

def maven(tag = "3.3", sha = "d85951a92c0908c80bd8551002d66cb23c3434409c814179c0ff026b53544dab"):
    maybe(
        http_archive,
        name = "rules_jvm_external",
        strip_prefix = "rules_jvm_external-%s" % tag,
        sha256 = sha,
        url = "https://github.com/bazelbuild/rules_jvm_external/archive/%s.zip" % tag,
    )

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")
load("//internal:maybe.bzl", "maybe")

def apple():
    maybe(
        http_archive,
        name = "build_bazel_rules_apple",
        sha256 = "36072d4f3614d309d6a703da0dfe48684ec4c65a89611aeb9590b45af7a3e592",
        url = "https://github.com/bazelbuild/rules_apple/releases/download/1.0.1/rules_apple.1.0.1.tar.gz",
    )
    maybe(
        http_archive,
        name = "build_bazel_rules_swift",
        sha256 = "12057b7aa904467284eee640de5e33853e51d8e31aae50b3fb25d2823d51c6b8",
        url = "https://github.com/bazelbuild/rules_swift/releases/download/1.0.0/rules_swift.1.0.0.tar.gz",
    )
    maybe(
        http_archive,
        name = "com_google_protobuf",
        sha256 = "bb1ddd8172b745cbdc75f06841bd9e7c9de0b3956397723d883423abfab8e176",
        strip_prefix = "protobuf-3.18.0",
        urls = ["https://github.com/protocolbuffers/protobuf/archive/refs/tags/v3.18.0.zip"]
    )
    maybe(
        git_repository,
        name = "build_bazel_rules_ios",
        shallow_since = "1660073401 +0000",
        remote = "https://github.com/bazel-ios/rules_ios.git",
        commit = "29b53b0a96a48df28cc50980745d8c1259c3a9ee"
    )

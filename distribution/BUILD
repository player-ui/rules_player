load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")
load("@rules_kotlin//kotlin:jvm.bzl", "kt_jvm_binary")
load("//private:maven.bzl", "artifact")

# TODO: We should probably build this for the archive
kt_jvm_binary(
    name = "nexus-staging-cli",
    srcs = ["NexusStagingCli.kt"],
    main_class = "com.intuit.player.rules.distribution.NexusStagingCliKt",
    deps = [
        artifact("ch.qos.logback:logback-classic"),
        artifact("com.github.ajalt.clikt:clikt-jvm"),
        artifact("io.github.gradle-nexus:publish-plugin"),
    ],
)

sh_binary(
    name = "staged-maven-deploy",
    srcs = [":staged-maven-deploy.sh"],
)

bzlformat_pkg(name = "bzlformat")

bzlformat_missing_pkgs(name = "bzlformat_missing_pkgs")

exports_files(["defs.bzl"])

bzl_library(
    name = "defs",
    srcs = ["defs.bzl"],
    visibility = ["//visibility:public"],
    deps = [
        "//distribution/private:build_constants",
    ],
)

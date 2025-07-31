load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")
load("@rules_kotlin//kotlin:jvm.bzl", "kt_jvm_binary")

# TODO: We should probably build this for the archive
kt_jvm_binary(
    name = "nexus-staging-cli",
    srcs = ["NexusStagingCli.kt"],
    main_class = "com.intuit.player.rules.distribution.NexusStagingCliKt",
    deps = [
        "@rules_player_maven//:ch_qos_logback_logback_classic",
        "@rules_player_maven//:com_github_ajalt_clikt_clikt_jvm",
        "@rules_player_maven//:io_github_gradle_nexus_publish_plugin",
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

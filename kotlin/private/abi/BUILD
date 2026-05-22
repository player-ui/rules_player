load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")
load("@rules_java//java:defs.bzl", "java_binary")
load("@rules_kotlin//kotlin:jvm.bzl", "kt_jvm_library")
load("//private:maven.bzl", "artifact")

# CLI tool that wraps the Kotlin Binary Compatibility Validator library to
# emit canonical .api dumps and compare them against checked-in golden files.
kt_jvm_library(
    name = "abi_cli_lib",
    srcs = ["AbiCli.kt"],
    deps = [
        artifact("com.github.ajalt.clikt:clikt-jvm"),
        artifact("io.github.java-diff-utils:java-diff-utils"),
        artifact("org.jetbrains.kotlin:kotlin-metadata-jvm"),
        artifact("org.jetbrains.kotlinx:binary-compatibility-validator"),
        artifact("org.ow2.asm:asm-tree"),
    ],
)

# Wrap as a java_binary so the launcher resolves the JDK toolchain at the
# consumer's workspace boundary — kt_jvm_binary's launcher references the JDK
# path relative to the *defining* workspace, which breaks cross-workspace use.
java_binary(
    name = "abi_tool",
    main_class = "com.intuit.bazel.kotlin.abi.AbiCliKt",
    visibility = ["//visibility:public"],
    runtime_deps = [":abi_cli_lib"],
)

bzlformat_pkg(name = "bzlformat")

bzlformat_missing_pkgs(name = "bzlformat_missing_pkgs")

filegroup(
    name = "all_files",
    srcs = glob(["*"]),
    visibility = ["//:__subpackages__"],
)

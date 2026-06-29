load("@rules_kotlin//kotlin:lint.bzl", "ktlint_config")
load("@rules_player//kotlin:defs.bzl", "abi_update_all", "kt_android", "kt_jvm", "lint_fix_all")

ktlint_config(
    name = "lint_config",
)

kt_jvm(
    name = "kt_lib",
    lint_config = ":lint_config",
    main_srcs = ["Lib.kt"],
    test_deps = [],
    test_package = "com.intuit.bazel.kotlin",
    test_srcs = ["Tests.kt"],
)

# Regression coverage for #112: the published kt_android target is a
# source-less android_library wrapper, so the ABI dump must target the
# underlying kt_android_library base. api_file defaults, generating
# android_lib-abi-dump / -abi-check / -abi-update.
kt_android(
    name = "android_lib",
    main_srcs = ["AndroidLib.kt"],
    manifest = "src/main/AndroidManifest.xml",
)

abi_update_all(
    name = "abi-update-all",
)

lint_fix_all(
    name = "lint-fix-all",
)

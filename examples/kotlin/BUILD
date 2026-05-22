load("@rules_kotlin//kotlin:lint.bzl", "ktlint_config")
load("@rules_player//kotlin:defs.bzl", "abi_update_all", "kt_jvm", "lint_fix_all")

ktlint_config(
    name = "lint_config",
)

kt_jvm(
    name = "kt_lib",
    lint_config = ":lint_config",
    main_srcs = ["lib.kt"],
    test_deps = [],
    test_package = "com.intuit.bazel.kotlin",
    test_srcs = ["libtest.kt"],
)

abi_update_all(
    name = "abi-update-all",
)

lint_fix_all(
    name = "lint-fix-all",
)

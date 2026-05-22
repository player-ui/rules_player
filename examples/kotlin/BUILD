load("@rules_player//kotlin:defs.bzl", "abi_update_all", "kt_jvm")

kt_jvm(
    name = "kt_lib",
    main_srcs = ["lib.kt"],
    test_deps = [],
    test_package = "com.intuit.bazel.kotlin",
    test_srcs = ["libtest.kt"],
)

abi_update_all(
    name = "abi-update-all",
)

load("//kotlin/private:kt_jvm_library_and_test.bzl", "kt_jvm_library_and_test")
load("//kotlin:defs.bzl", "kt_jvm")

kt_jvm_library_and_test(
    name = "lib",
    main_srcs = ["lib.kt"],
    test_srcs = ["libtest.kt"],
    test_package = "com.intuit.bazel.kotlin",
)

kt_jvm(
    name = "kt_lib",
    main_srcs = ["lib.kt"]
)



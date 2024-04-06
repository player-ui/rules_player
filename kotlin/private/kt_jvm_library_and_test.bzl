load("@io_bazel_rules_kotlin//kotlin:jvm.bzl", "kt_jvm_library")
load("@junit//junit5-jupiter-starter-bazel:junit5.bzl", "kt_jvm_junit5_test")
load(":scope_name.bzl", "scope_name")

# No project specific defaults here
def kt_jvm_library_and_test(
        *,
        # Generic parameters

        name,
        tags = None,

        # Main parameters
        module_name = None,
        main_opts = None,

        # Main sources
        main_srcs = [],
        main_resources = [],
        main_resource_jars = [],
        main_resource_strip_prefix = None,

        # Main dependencies

        # Kotlin deps that should be considered a part of the same module
        main_associates = [],
        main_deps = [],
        main_exports = [],
        main_runtime_deps = [],

        # Test parameters
        test_package = None,
        test_opts = None,

        # Test sources
        test_srcs = [],
        test_resources = [],
        test_resource_jars = [],
        test_resource_strip_prefix = None,

        # Test dependencies
        test_associates = [],
        test_deps = [],
        test_runtime_deps = [],
):
    kt_jvm_library(
        name = name,
        module_name = module_name,
        srcs = main_srcs,
        resources = main_resources,
        resource_jars = main_resource_jars,
        resource_strip_prefix = main_resource_strip_prefix,
        kotlinc_opts = main_opts,
        visibility = ["//visibility:public"],
        associates = main_associates,
        deps = main_deps,
        runtime_deps = main_runtime_deps,
        exports = main_exports,
        tags = tags,
    )

    if len(test_srcs) != 0:
        kt_jvm_junit5_test(
            name = scope_name(name, "test"),
            srcs = test_srcs,
            resources = test_resources,
            resource_jars = test_resource_jars,
            resource_strip_prefix = test_resource_strip_prefix,
            associates = [":%s" % name] + (test_associates if test_associates else []),
            kotlinc_opts = test_opts,
            test_package = test_package,
            deps = test_deps,
            runtime_deps = test_runtime_deps,
        )
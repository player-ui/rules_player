"""
Macro implementation for building and testing Android Kotlin libraries
"""

load("@rules_android//rules:rules.bzl", "android_library")
load("@rules_kotlin//kotlin:android.bzl", "kt_android_library", "kt_android_local_test")
load(":junit_test.bzl", "kt_jvm_junit5_test")
load(":scope_name.bzl", "scope_name")

# No project specific defaults here
def kt_android_library_and_test(
        *,
        # Generic parameters
        name,
        package,
        manifest,
        custom_package = None,
        tags = None,
        plugins = [],

        # Main parameters
        module_name = None,
        main_opts = None,

        # Main sources
        main_srcs = [],
        main_resources = [],
        main_res = [],
        main_assets = [],

        # Main dependencies

        # Kotlin deps that should be considered a part of the same module
        main_associates = [],
        main_deps = [],
        main_exports = [],

        # Unit test parameters
        unit_test_package = None,
        unit_test_opts = None,

        # Unit test sources
        unit_test_srcs = [],
        unit_test_resources = [],
        unit_test_resource_jars = [],
        unit_test_resource_strip_prefix = None,

        # Unit test dependencies
        unit_test_associates = [],
        unit_test_deps = [],
        unit_test_runtime_deps = [],

        # Instrumented test parameters
        instrumented_test_opts = None,
        instrumented_test_classes = None,

        # Instrumented test sources
        instrumented_test_srcs = [],
        instrumented_test_resources = [],

        # Instrumented test dependencies
        instrumented_test_associates = [],
        instrumented_test_deps = []):
    """"""
    base_name = scope_name(name, "base")
    associates = ["%s_kt" % base_name]
    kt_android_library(
        name = base_name,
        manifest = manifest,
        module_name = module_name,
        srcs = main_srcs,
        resources = main_resources,
        resource_files = main_res,
        assets = main_assets,
        kotlinc_opts = main_opts,
        associates = main_associates,
        deps = main_deps,
        exports = main_exports,
        plugins = plugins,
        custom_package = custom_package,
    )

    # Actual publishable target
    android_library(
        name = name,
        manifest = manifest,
        tags = tags,
        exports = [":%s" % base_name] + main_exports,
        deps = main_deps,
        visibility = ["//visibility:public"],
        custom_package = custom_package,
    )

    if len(unit_test_srcs) != 0:
        kt_jvm_junit5_test(
            name = scope_name(name, "unit-test"),
            srcs = unit_test_srcs,
            resources = unit_test_resources,
            resource_jars = unit_test_resource_jars,
            resource_strip_prefix = unit_test_resource_strip_prefix,
            associates = associates + (unit_test_associates if unit_test_associates else []),
            kotlinc_opts = unit_test_opts,
            test_package = unit_test_package,
            deps = unit_test_deps,
            runtime_deps = unit_test_runtime_deps,
        )

    # Need to build a test target per class
    if instrumented_test_classes == None:
        instrumented_test_classes = []

        # Try to infer all test classes from sources, assuming each
        #  test source contains a test class named after the file
        for test_src in instrumented_test_srcs:
            # Trim src/androidTest/main
            parts = test_src.split("/")[3:]

            # Trim .kt from classname
            classname = parts.pop()[:-3]

            # Create test_class
            test_class = ".".join(parts + [classname])
            instrumented_test_classes.append(test_class)

    for test_class in instrumented_test_classes:
        kt_android_local_test(
            name = scope_name(name, "%s-instrumented-test" % test_class.split(".")[-1]),
            # Need to pass all sources so that it can reference other sources
            srcs = instrumented_test_srcs,
            resources = instrumented_test_resources,
            associates = associates + (instrumented_test_associates if instrumented_test_associates else []),
            kotlinc_opts = instrumented_test_opts,
            plugins = plugins,
            test_class = test_class,
            deps = instrumented_test_deps,
        )

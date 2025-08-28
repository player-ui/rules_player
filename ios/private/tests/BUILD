load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_pkg")
load(":test_zip_integration.bzl", "define_test_targets")

bzlformat_pkg(name = "bzlformat")

# Define integration test targets
define_test_targets()

# BATS test for zip assembly functions
sh_test(
    name = "zip_assembly_test",
    srcs = ["run_bats_test.sh"],
    args = ["$(location test_zip_assembly.bats)"],
    data = [
        "resources/Package.swift",
        "resources/TestResource.txt",
        "resources/TestSource.swift",
        "resources/test.podspec",
        "test_zip_assembly.bats",
        ":test_package_basic",
        ":test_package_with_dict_config",
        ":test_package_with_plugins",
        ":test_package_with_resources",
        ":test_pod_basic",
        ":test_pod_with_data",
    ],
    tags = ["integration"],
    deps = ["@bazel_tools//tools/bash/runfiles"],
)

exports_files([
    "test_zip_assembly.bats",
    "run_bats_test.sh",
    "test_zip_integration.bzl",
])

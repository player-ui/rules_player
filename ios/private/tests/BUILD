load("@bazel_bats//:rules.bzl", "bats_test")
load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_pkg")
load(":test_zip_assembly.bzl", "define_test_targets")

bzlformat_pkg(name = "bzlformat")

# Define integration test targets
define_test_targets()

bats_test(
    name = "zip_assembly_test",
    srcs = ["test_zip_assembly.bats"],
    data = [
        "resources/Package.swift",
        "resources/TestResource.txt",
        "resources/TestSource.swift",
        "resources/test.podspec",
        "test_zip_assembly.bats",
        ":test_package_basic",
        ":test_package_with_dict_config",
        ":test_package_with_resources",
        ":test_package_with_sources",
        ":test_pod_basic",
        ":test_pod_with_data",
    ],
)

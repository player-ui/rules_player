"""Integration tests for zip assembly functions"""

load("@build_bazel_rules_swift//swift:swift.bzl", "swift_library")
load("//ios/private:zip.bzl", "assemble_ios_release", "assemble_pod")

def define_test_targets():
    """Define test targets for integration testing"""

    # Create a simple swift library for testing
    swift_library(
        name = "test_swift_sources",
        srcs = ["resources/TestSource.swift"],
        tags = ["manual"],  # Don't build automatically
    )

    # Test assemble_pod with basic inputs
    assemble_pod(
        name = "test_pod_basic",
        podspec = "resources/test.podspec",
        srcs = ["resources/TestSource.swift"],
    )

    # Test assemble_pod with data dependencies
    assemble_pod(
        name = "test_pod_with_data",
        podspec = "resources/test.podspec",
        srcs = ["resources/TestSource.swift"],
        data = {
            "resources/TestResource.txt": "Resources/",
        },
    )

    # Test assemble_ios_release with basic inputs (Package.swift only)
    assemble_ios_release(
        name = "test_package_basic",
        data = {
            "resources/Package.swift": "",
        },
    )

    # Test assemble_ios_release with data files
    assemble_ios_release(
        name = "test_package_with_data",
        data = {
            "resources/Package.swift": "",
            "resources/TestResource.txt": "Resources/",
            "resources/TestSource.swift": "Sources/",
        },
    )

    # Test assemble_ios_release with multiple data files in different directories
    assemble_ios_release(
        name = "test_package_with_multiple_data",
        data = {
            "resources/Package.swift": "",
            "resources/TestResource.txt": "assets/test/Resources/",
            "resources/TestSource.swift": "plugins/test/",
        },
    )

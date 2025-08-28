"""Integration tests for zip assembly functions"""

load("@build_bazel_rules_swift//swift:swift.bzl", "swift_library")
load("//ios/private:zip.bzl", "assemble_package", "assemble_pod")

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

    # Test assemble_package with basic inputs
    assemble_package(
        name = "test_package_basic",
        package_swift = "resources/Package.swift",
        plugins = [],
        assets = [],
    )

    # Test assemble_package with simple plugin targets
    assemble_package(
        name = "test_package_with_plugins",
        package_swift = "resources/Package.swift",
        plugins = ["resources/TestSource.swift"],  # Use file directly for simplicity
        assets = [],
    )

    # Test assemble_package with dict plugin configurations
    assemble_package(
        name = "test_package_with_dict_config",
        package_swift = "resources/Package.swift",
        plugins = [{
            "path": "plugins/test",
            "target": "resources/TestSource.swift",
        }],
        assets = [{
            "path": "assets/test",
            "target": "resources/TestSource.swift",
        }],
    )

    # Test assemble_package with resourceTargets
    assemble_package(
        name = "test_package_with_resources",
        package_swift = "resources/Package.swift",
        plugins = [{
            "path": "plugins/fancy",
            "resourceTarget": "resources/TestResource.txt",
            "target": "resources/TestSource.swift",
        }],
        assets = [{
            "path": "assets/fancy",
            "resourceTarget": "resources/TestResource.txt",
            "target": "resources/TestSource.swift",
        }],
    )

"""
iOS target discovery macro that creates an sh_binary to run the script.
Generated with Cursor by Koriann South on August 29, 2025
"""

def discover_ios_targets(
        name,
        output = "ios_targets.bzl",
        variable_name = "sources"):
    """Creates an sh_binary target to run the iOS target discovery script.

    This is meant to be used with `assemble_package`. It will provide the input for the "sources" parameter.

    This macro creates an sh_binary that directly executes the discover_ios_targets.sh script.
    The discovery script automatically finds all Swift source targets with iOS tags and
    JS native bundles in your workspace, then pairs them appropriately.

    The script automatically:
        - Finds all Swift source targets ending in "_Sources"
        - Identifies corresponding JS native bundles (core:core_native_bundle)
        - Pairs them when both exist in the same directory
        - Generates clean BUILD-ready Starlark code

    Basic Example:
        # In your BUILD file
        load("@rules_player//ios:defs.bzl", "discover_ios_targets", "assemble_package")

        # Create the discovery rule
        discover_ios_targets(name = "discover")

        # Run discovery to generate ios_targets.bzl
        # $ bazel run //:discover

        # Load the generated sources
        load(":ios_targets.bzl", "sources")

        # Use with assemble_package
        assemble_package(
            name = "ios_package",
            package_swift = "Package.swift",
            sources = sources,
        )

    Advanced Example:
        # Custom output file and variable name
        discover_ios_targets(
            name = "discover_ios_sources",
            output = "my_ios_targets.bzl",
            variable_name = "custom_sources",
        )

        # Load the custom variable
        load(":my_ios_targets.bzl", "custom_sources")

        assemble_package(
            name = "spm_publish_zip",
            package_swift = "//:Package.swift",
            sources = custom_sources,
        )

    Args:
        name: Name of the sh_binary target to create
        output: The file the ios targets will be written to (default: "ios_targets.bzl")
        variable_name: Name of the variable to create in the .bzl file (default: "sources")
    """

    native.sh_binary(
        name = name,
        srcs = ["@rules_player//ios/private:discover_ios_targets.sh"],
        data = [],
        args = [output, variable_name],
    )

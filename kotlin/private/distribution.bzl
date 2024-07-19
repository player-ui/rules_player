"""
Utilities for deploying kotlin artifacts
"""

load("@rules_jvm_external//:defs.bzl", "maven_export")
load(":scope_name.bzl", "scope_name")

def distribution(
        *,
        name,
        maven_coordinates,
        lib_name = None,
        **kwargs):
    """
    Utility macro for deploying kotlin artifacts

    Args:
        name: The name of the export target
        maven_coordinates: The maven location
        lib_name: The library name
        **kwargs: Additional args to use for export
    """

    maven_export(
        name = scope_name(name, "export"),
        lib_name = lib_name if lib_name else name,
        maven_coordinates = maven_coordinates,
        **kwargs
    )

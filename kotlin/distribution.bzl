load("@rules_jvm_external//:defs.bzl", "maven_export")
load("//internal:scope_name.bzl", "scope_name")

def distribution(
        *,
        name,
        maven_coordinates,
        lib_name = None,
        **kwargs):
    maven_export(
        name = scope_name(name, "export"),
        lib_name = lib_name if lib_name else name,
        maven_coordinates = maven_coordinates,
        **kwargs
    )

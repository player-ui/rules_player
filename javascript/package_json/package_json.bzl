"""
Module for generating a package_json based on a BUILD invocation
"""

load("@build_bazel_rules_nodejs//:providers.bzl", "node_modules_aspect", "run_node")
load("@build_bazel_rules_nodejs//internal/linker:link_node_modules.bzl", "LinkerPackageMappingInfo", "module_mappings_aspect")
load("@rules_player//javascript:utils.bzl", "filter_empty")

_CREATE_PKG_JSON = Label("//javascript/package_json:create_package_json")

PACKGE_JSON_ATTRS = {
    # The name of the package "@foo/bar"
    "package_name": attr.string(mandatory = True),

    # The entry file, used to calculate the name of the output src/index.ts -> dist/index.cjs.js
    "entry": attr.string(),

    # An entry file for any `bin` script
    "bin_entry": attr.string(),

    # The name for a bin entry
    "bin_name": attr.string(),

    # If the package should skipped being published to npm
    "private": attr.bool(default = False),

    # The npm registry to publish to
    "registry": attr.string(),

    "esm_only": attr.bool(default = False),

    # A .json file to use to add additional properties to the generated package.
    # This can often be a 'package.json' and the entries/outputs/dependencies will be filled in later on
    "base_package_json": attr.label(allow_single_file = [".json"]),

    # A JSON string of additional things to add to the generated package.json
    # For when you don't want/have a template file to pull from
    "additional_properties": attr.string(default = "{}"),

    # The output directory, used to calculate the output file
    "out_dir": attr.string(mandatory = True),

    # The list of dependencies
    "dependencies": attr.label_list(
        default = [],
        aspects = [module_mappings_aspect, node_modules_aspect],
    ),

    # List of peer dependencies
    "peer_dependencies": attr.label_list(
        default = [],
        aspects = [module_mappings_aspect, node_modules_aspect],
    ),
    "placeholder_version": attr.string(default = "0.0.0-PLACEHOLDER"),

    # The root package.json for the project. Used to get the versions of dependencies and peer-depedencies
    "root_package_json": attr.label(mandatory = True, allow_single_file = ["package.json"]),

    # Internal reference to script to create package.json file
    "_create_pkg_json": attr.label(default = _CREATE_PKG_JSON, executable = True, cfg = "host"),
}

def _get_pkg_name(dep):
    if LinkerPackageMappingInfo in dep:
        mappings = dep[LinkerPackageMappingInfo].mappings.items()
        if (len(mappings) > 0):
            package_name = mappings[-1][0].split(":")[0]
            return package_name

    return dep.label.package

def _create_package_json_impl(ctx):
    pkg_json = ctx.actions.declare_file("package.json")

    local_deps = []

    for dep in ctx.attr.dependencies + ctx.attr.peer_dependencies:
        if LinkerPackageMappingInfo in dep:
            for key, value in dep[LinkerPackageMappingInfo].mappings.items():
                # key is of format "package_name:package_path"
                package_name = key.split(":")[0]
                local_deps.append(package_name)

    bin_file_name = None

    if ctx.attr.bin_entry:
        if not ctx.attr.bin_name:
            bin_file_name = "cli.js"
        else:
            bin_file_name = ctx.attr.bin_name + ".js"

    run_node(
        ctx,
        inputs = filter_empty([ctx.file.root_package_json, ctx.file.base_package_json]),
        outputs = [pkg_json],
        arguments = [json.encode({
            "name": ctx.attr.package_name,
            "bin_entry": bin_file_name,
            "bin_name": ctx.attr.bin_name,
            "esm_only": ctx.attr.esm_only,
            "root_package_json": ctx.file.root_package_json.path,
            "base_package_json": ctx.file.base_package_json.path if ctx.file.base_package_json else None,
            "placeholder_version": ctx.attr.placeholder_version,
            "additional_properties": ctx.attr.additional_properties,
            "output_file": pkg_json.path,
            "out_dir": ctx.attr.out_dir,
            "peer_dependencies": [_get_pkg_name(dep) for dep in ctx.attr.peer_dependencies],
            "dependencies": [_get_pkg_name(dep) for dep in ctx.attr.dependencies],
            "local_deps": local_deps,
            "private": ctx.attr.private,
            "registry": ctx.attr.registry,
        })],
        executable = "_create_pkg_json",
    )

    return [
        DefaultInfo(
            files = depset([pkg_json]),
        ),
    ]

create_package_json = rule(
    implementation = _create_package_json_impl,
    attrs = PACKGE_JSON_ATTRS,
)

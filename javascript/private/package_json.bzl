"""
Populate all the required fields for a package.json file needed for a full build
"""

load("@aspect_rules_js//js:providers.bzl", "JsInfo")
load(":utils.bzl", "get_js_npm_name")

_PACKAGE_JSON_ATTRS = {
    "root_package_json": attr.label(
        mandatory = True,
        doc = "The root package.json for the project. Used to get the versions of dependencies and peer-depedencies",
        allow_single_file = ["package.json"],
    ),
    "base_package_json": attr.label(
        mandatory = True,
        doc = """A .json file to use to add additional properties to the generated package.
        This can often be a 'package.json' and the entries/outputs/dependencies will be filled in later on.""",
        allow_single_file = ["package.json"],
    ),
    "placeholder_version": attr.string(default = "0.0.0-PLACEHOLDER", doc = "The version to use for the local dependencies in the workspace"),
    "dependencies": attr.label_list(
        doc = "The dependencies of the package. These will be added to the base package.json",
        default = [],
        providers = [JsInfo],
    ),
    "peer_dependencies": attr.label_list(
        doc = "The peer dependencies of the package. These will be added to the base package.json",
        default = [],
        providers = [JsInfo],
    ),
    "_create_package_json": attr.label(
        executable = True,
        cfg = "exec",
        default = "//javascript/private:create_package_json",
    ),
}

def _package_json_impl(ctx):
    """Implementation of package_json."""
    output_file = ctx.actions.declare_file("package.json")

    args = {
        "output_file": output_file.short_path,
        "root_package_json": ctx.file.root_package_json.short_path,
        "base_package_json": ctx.file.base_package_json.short_path,
        "dependencies": [get_js_npm_name(dep) for dep in ctx.attr.dependencies],
        "peer_dependencies": [get_js_npm_name(dep) for dep in ctx.attr.peer_dependencies],
    }

    ctx.actions.run(
        inputs = ctx.files.root_package_json + ctx.files.base_package_json,
        env = {
            "BAZEL_BINDIR": ctx.bin_dir.path,
        },
        arguments = [json.encode(args)],
        outputs = [output_file],
        executable = ctx.executable._create_package_json,
    )

    return [
        DefaultInfo(
            files = depset([output_file]),
        ),
    ]

create_package_json = rule(
    implementation = _package_json_impl,
    attrs = _PACKAGE_JSON_ATTRS,
)

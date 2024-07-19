"""
A rule for compiling player flows.
"""

load("@aspect_bazel_lib//lib:directory_path.bzl", "directory_path")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_run_binary")
load("@bazel_skylib//lib:paths.bzl", "paths")
load("config.bzl", "create_base_config")

def xlr_compile(
        name,
        node_modules = "//:node_modules",
        srcs = None,
        data = [],
        config = None,
        input_dir = "src",
        mode = "plugin",
        **kwargs):
    """
        A rule for compiling files using XLR

    Args:
        name: The name of the output target
        node_modules: A pointer to the node_modules root
        srcs: The list of source files to generate XLR from
        data: Additional data to use during compilation
        config: An optional config file to pass to the Player CLI
        input_dir: The root input directory to compile
        mode: The XLR mode to use when compiling
        **kwargs: Additional arguments to use for running the binary
    """

    player_cli_entrypoint = "{}_entrypoint".format(name)

    if (config == None):
        create_base_config(
            name = "{}_config".format(name),
        )
        config = ":{}_config".format(name)

    directory_path(
        name = player_cli_entrypoint,
        directory = "{}/@player-tools/cli/dir".format(node_modules),
        path = "bin/run",
    )

    js_bin_name = "{}_binary".format(name)

    js_binary(
        name = js_bin_name,
        data = ["{}/@player-tools/cli".format(node_modules)],
        entry_point = ":{}".format(player_cli_entrypoint),
    )

    js_run_binary(
        name = name,
        tool = js_bin_name,
        srcs = data + srcs + [config],
        visibility = ["//:__subpackages__"],
        args = [
            "xlr",
            "compile",
            "-o",
            paths.join(native.package_name(), "dist"),
            "-i",
            paths.join(native.package_name(), input_dir),
            "-c",
            "$(rootpath {})".format(config),
            "-m",
            mode,
        ],
        out_dirs = [paths.join("dist", "xlr")],
        **kwargs
    )

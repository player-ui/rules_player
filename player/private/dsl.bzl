"""
A rule for compiling player flows.
"""

load("@aspect_bazel_lib//lib:directory_path.bzl", "directory_path")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_run_binary", "js_test")
load("@bazel_skylib//lib:paths.bzl", "paths")

def compile(name, node_modules = "//:node_modules", srcs = None, data = [], config = None, skip_test = False, **kwargs):
    """Run the src or src_dir through the player compiler.
    Args:
        name: The name of the target.
        srcs: The source files to compile.
        node_modules: The node_modules target to use.
    """

    player_cli_entrypoint = "{}_entrypoint".format(name)

    directory_path(
        name = player_cli_entrypoint,
        directory = "{}/@player-tools/cli/dir".format(node_modules),
        path = "bin/run",
    )

    js_bin_name = "{}_binary".format(name)
    js_test_bin_name = "{}_test_binary".format(name)

    js_binary(
        name = js_bin_name,
        data = ["{}/@player-tools/cli".format(node_modules)],
        entry_point = ":{}".format(player_cli_entrypoint),
    )

    input_dir = paths.dirname(srcs[0])

    js_run_binary(
        name = name,
        tool = js_bin_name,
        srcs = data + srcs + [config],
        visibility = ["//:__subpackages__"],
        args = [
            "dsl",
            "compile",
            "--skip-validation",
            "-o",
            "{}/{}_dist".format(native.package_name(), name),
            "-i",
            "{}/{}".format(native.package_name(), input_dir),
            "-c",
            "$(rootpath {})".format(config),
        ],
        out_dirs = ["{}_dist".format(name)],
        **kwargs
    )

    if skip_test != True:
        js_test(
            name = js_test_bin_name,
            data = data + [":" + name, "{}/@player-tools/cli".format(node_modules), config],
            entry_point = ":{}".format(player_cli_entrypoint),
            args = [
                "json",
                "validate",
                "-c",
                "$(rootpath {})".format(config),
                "-f",
                "$(location {})".format(":" + name),
            ],
        )

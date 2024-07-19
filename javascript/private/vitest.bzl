"""
Implementation for the test macro for vitest
"""

load("@aspect_bazel_lib//lib:directory_path.bzl", "directory_path")
load("@aspect_rules_js//js:defs.bzl", "js_test")

def vitest_test(
        name,
        config,
        data = [],
        node_modules = "//:node_modules",
        **kwargs):
    """Run a vite test.

    Args:
        name: The name of the test.
        config: The vite config target.
        data: The list of data dependencies.
        node_modules: The node_modules target.
        **kwargs: Additional arguments to pass to the test.
    """

    vitest_cli_entry = "{}_vitest_entrypoint".format(name)

    directory_path(
        name = vitest_cli_entry,
        directory = "{}/vitest/dir".format(node_modules),
        path = "vitest.mjs",
    )

    js_test(
        name = name,
        size = "small",
        entry_point = ":{}".format(vitest_cli_entry),
        args = ["run", "--color"],
        data = data + [config],
        **kwargs
    )

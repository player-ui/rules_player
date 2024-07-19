"""
Implementation for the test target for eslint
"""

load("@aspect_bazel_lib//lib:directory_path.bzl", "directory_path")
load("@aspect_rules_js//js:defs.bzl", "js_test")
load(":utils.bzl", "include_exts")

def eslint_test(
        name,
        data = [],
        srcs = [],
        node_modules = "//:node_modules",
        lint_exts = [".ts", ".js", ".tsx", ".jsx"],
        **kwargs):
    """
    A test target that runs eslint on the given sources.

    Args:
      name: The name of the target.
      data: A list of targets to include in the test's data.
      srcs: A list of sources to run eslint on.
      node_modules: The node_modules target to use for eslint.
      lint_exts: A list of extensions to pass to eslint's --ext flag.
      **kwargs: Additional arguments to pass to the underlying js_test target.
    """

    eslint_cli_entry = "{}_eslint_entrypoint".format(name)

    directory_path(
        name = eslint_cli_entry,
        directory = "{}/eslint/dir".format(node_modules),
        path = "bin/eslint.js",
    )

    js_test(
        name = name,
        size = "small",
        entry_point = ":{}".format(eslint_cli_entry),
        args = [
            "--color",
            "--quiet",
            "--ext",
            ",".join(lint_exts),
        ] + ["$(execpath %s)" % (f) for f in include_exts(srcs, lint_exts)],
        data = data,
        **kwargs
    )

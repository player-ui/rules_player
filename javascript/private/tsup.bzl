load("@aspect_bazel_lib//lib:directory_path.bzl", "directory_path")
load("@aspect_rules_js//js:defs.bzl", "js_run_binary", "js_binary")

def tsup_build(
  name, 
  srcs = [],
  config = "tsup.config.ts",
  data = ["//:tsup_config"], 
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

    tsup_cli_entry = "{}_tsup_entrypoint".format(name)
    tsup_bin = "{}_tsup_bin".format(name)

    directory_path(
        name = tsup_cli_entry,
        directory = "{}/tsup/dir".format(node_modules),
        path = "dist/cli-node.js",
    )

    js_binary(
        name = tsup_bin,
        data = ["{}/tsup".format(node_modules)] + data,
        entry_point = ":{}".format(tsup_cli_entry),
    )

    js_run_binary(
        name = name,
        chdir = native.package_name(),
        tool = ":{}".format(tsup_bin),
        args = [],
        srcs = srcs + [config],
        out_dirs = ["dist"],
    )
"""
Implementation for the build rules using tsup
"""

load("@aspect_bazel_lib//lib:directory_path.bzl", "directory_path")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_run_binary")
load(":utils.bzl", "is_test_file")

def tsup_build(
        name,
        srcs = [],
        config = "tsup.config.ts",
        data = ["//:tsup_config"],
        node_modules = "//:node_modules",
        substitutions = {
            "__VERSION__": "{STABLE_VERSION}",
        },
        outs = None,
        **kwargs):
    """Run a vite test.

    Args:
        name: The name of the test.
        srcs: Inputs to the module
        config: The vite config target.
        data: The list of data dependencies.
        node_modules: The node_modules target.
        substitutions: Substitutions to stamp during the build.
        outs: Any defined outputs
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

    has_css_file = False

    for f in srcs:
        if is_test_file(f, [".css"]):
            has_css_file = True

    tsup_outs = outs

    if tsup_outs == None:
        tsup_outs = [
            "dist/index.mjs",
            "dist/index.mjs.map",
            "dist/cjs/index.cjs",
            "dist/cjs/index.cjs.map",
            "dist/index.legacy-esm.js",
        ]

        if has_css_file:
            tsup_outs.append("dist/index.css")

    js_run_binary(
        name = name,
        chdir = native.package_name(),
        tool = ":{}".format(tsup_bin),
        stamp = -1,
        args = [],
        srcs = srcs + [config],
        outs = kwargs.get("outs", tsup_outs),
        env = dict(
            {
                "STAMP_SUBSTITUTIONS": json.encode(substitutions),
            },
            **kwargs.get("env", {})
        ),
        visibility = kwargs.get("visibility", []),
    )

def tsup_native_build(
        name,
        native_bundle,
        srcs = [],
        config = "tsup.config.ts",
        data = ["//:tsup_config"],
        node_modules = "//:node_modules",
        **kwargs):
    tsup_build(
        name = name,
        visibility = ["//visibility:public"],
        srcs = srcs,
        config = config,
        data = data,
        node_modules = node_modules,
        env = {
            "PLAYER_NATIVE_BUNDLE": native_bundle,
        },
        outs = ["dist/{}.native.js".format(native_bundle), "dist/{}.native.js.map".format(native_bundle)],
        **kwargs
    )

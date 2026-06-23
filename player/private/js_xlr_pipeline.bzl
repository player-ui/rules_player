"""
Implementation for generating XLR files alongside the js_pipeline macro
"""

load("//javascript:defs.bzl", "js_pipeline")
load("xlr.bzl", "xlr_compile")

def js_xlr_pipeline(
        name = None,
        xlr_mode = "plugin",
        xlr_input_dir = "src",
        xlr_output_dir = "xlr_out",
        srcs = None,
        cli = "@player-tools/cli",
        **kwargs):
    """A rule for compiling player flows with xlr mode.

    Args:
        name: The name of the target.
        xlr_mode: The mode to use when compiling with XLR. Defaults to "plugin".
        xlr_input_dir: The input directory to generate XLR from. Defaults to "src".
        xlr_output_dir: The output directory to write XLR to. DO NOT use "dist".
        srcs: An optional list of src files (Defaults to src/**)
        cli: Player CLI to use, defaults to "@player-tools/cli"
        **kwargs: Additional args to pass to the js_pipeline macro
    """

    if name == None:
        # name = package_name.split("/")[-1]
        name = native.package_name().split("/")[-1]

    if srcs == None:
        srcs = native.glob(["src/**/*"])

    xlr_compile(
        name = name + "_xlr",
        srcs = srcs,
        mode = xlr_mode,
        input_dir = xlr_input_dir,
        output_dir = xlr_output_dir,
        data = [
        ] + kwargs.get("deps", []) + kwargs.get("peer_deps", []),
        cli = cli,
    )

    js_pipeline(
        name = name,
        include_packaging_targets = [
            ":" + name + "_xlr",
        ],
        # XLR's readonly output goes to `${xlr_output_dir}/xlr/` instead of `dist/xlr` to prevent errors
        # when tsup tries to clean `dist`. (Happens in non-sandboxed Xcode builds.) These
        # replace_prefixes ensure the xlr still ends up in `dist` in the final npm package.
        _extra_replace_prefixes = {
            "{}/xlr".format(xlr_output_dir): "dist/xlr",
        },
        create_package_json_args = {
            "additional_exports": {
                "./dist/xlr/*": "./dist/xlr/*",
                "./xlr": "./dist/xlr/manifest.js",
            },
        },
        **kwargs
    )

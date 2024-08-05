"""
Implementation for generating XLR files alongside the js_pipeline macro
"""

load("//javascript:defs.bzl", "js_pipeline")
load("xlr.bzl", "xlr_compile")

def js_xlr_pipeline(name = None, xlr_mode = "plugin", xlr_input_dir = "src", srcs = None, **kwargs):
    """A rule for compiling player flows with xlr mode.

    Args:
        name: The name of the target.
        xlr_mode: The mode to use when compiling with XLR. Defaults to "plugin".
        xlr_input_dir: The input directory to generate XLR from. Defaults to "src".
        srcs: An optional list of src files (Defaults to src/**)
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
        data = [
            "//:node_modules/dlv",
        ] + kwargs.get("deps", []) + kwargs.get("peer_deps", []),
    )

    js_pipeline(
        name = name,
        include_packaging_targets = [
            ":" + name + "_xlr",
        ],
        create_package_json_args = {
            "additional_exports": {
                "./dist/xlr/*": "./dist/xlr/*",
                "./xlr": "./dist/xlr/manifest.js"
            },
        },
        **kwargs
    )

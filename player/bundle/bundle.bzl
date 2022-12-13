load("@npm//webpack-cli:index.bzl", _webpack = "webpack_cli")

PROD = "prod"
DEV = "dev"

PRODUCTION = "production"
DEVELOPMENT = "development"

MODES = {
    PROD: PRODUCTION,
    DEV: DEVELOPMENT,
}

def webpack(name, dist, deps, mode_shorthand, visibility, bundle_name = None, bundle_entry = None, **kwargs):
    output_name = bundle_name if bundle_name != None else name
    _webpack(
        name = "%s_bundle_%s" % (name, mode_shorthand),
        outs = ["dist/%s.%s.js" % (bundle_name, mode_shorthand)],
        args = [
            "--mode %s" % MODES[mode_shorthand],
            bundle_entry if bundle_entry else "./$(RULEDIR)",
            "--config",
            "webpack.config.js",
            "-o",
            "./$@",
        ],
        data = dist + deps,
        visibility = visibility,
        **kwargs
    )

"""
Creates dev and prod bundles from cjs code
"""

def bundle(name, dist, deps, visibility, bundle_name = None, bundle_entry = None, **kwargs):
    """Wrapper to create dev and prod bundles from a ts_package"""
    webpack(name, dist, deps, DEV, visibility, bundle_name, bundle_entry, **kwargs)
    webpack(name, dist, deps, PROD, visibility, bundle_name, bundle_entry, **kwargs)

    native.filegroup(
        name = name,
        srcs = [
            "%s_bundle_prod" % name,
            "%s_bundle_dev" % name,
        ],
        visibility = visibility,
    )

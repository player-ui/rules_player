load("@npm//webpack-cli:index.bzl", _webpack = "webpack_cli")
load("@rules_player//javascript:utils.bzl", "filter_empty")
PROD = "prod"
DEV = "dev"

PRODUCTION = "production"
DEVELOPMENT = "development"

MODES = {
    PROD: PRODUCTION,
    DEV: DEVELOPMENT,
}

def webpack(name, dist, deps, mode_shorthand, visibility, bundle_entry = None, bundle_name = None, **kwargs):
    output_name = bundle_name if bundle_name != None else name
    _webpack(
        name = "%s_bundle_%s" % (name, mode_shorthand),
        outs = ["dist/%s.%s.js" % (bundle_name, mode_shorthand)],
        args = filter_empty([
            "--mode %s" % MODES[mode_shorthand],
            bundle_entry,
            "--config",
            "webpack.config.js",
            "-o",
            "./$@",
        ]),
        data = dist + deps,
        visibility = visibility,
        **kwargs
    )

"""
Creates dev and prod bundles from cjs code
"""

def bundle(name, dist, deps, visibility, bundle_entry = None, bundle_name = None, **kwargs):
    """Wrapper to create dev and prod bundles from a ts_package"""
    webpack(name, dist, deps, DEV, visibility, bundle_entry, bundle_name, **kwargs)
    webpack(name, dist, deps, PROD, visibility, bundle_entry, bundle_name, **kwargs)

    native.filegroup(
        name = name,
        srcs = [
            "%s_bundle_prod" % name,
            "%s_bundle_dev" % name,
        ],
        visibility = visibility,
    )

"""
A rule for collating several compiled XLR manifests into one, keyed by type name.
"""

load("@aspect_bazel_lib//lib:directory_path.bzl", "directory_path")
load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_run_binary")
load("@bazel_skylib//lib:paths.bzl", "paths")

def xlr_bundle(
        name,
        sources,
        node_modules = "//:node_modules",
        output_dir = "xlr_bundle_out",
        cli = "@player-tools/cli",
        **kwargs):
    """Collates several `xlr_compile` (or `js_xlr_pipeline`)-produced manifests into one manifest, keyed by type name.

    Args:
        name: The name of the output target.
        sources: An ordered list of `xlr_compile`/`js_xlr_pipeline`-produced target labels to
          collate — order matters for collision handling downstream (a consumer's own choice
          among duplicate types may depend on which source is considered first), so this isn't
          derived from a `deps` list (a Bazel depset's flattened order isn't guaranteed stable
          across builds). Each label's target output is its `<xlr output_dir>/xlr` directory,
          `manifest.json` directly inside it (not nested under `dist/xlr`, the way an installed
          npm package would be). A source's `metaData`, if it set any, rides along inside its own
          manifest — see `xlr_compile`'s `meta_data`; nothing is passed for it here.
        node_modules: A pointer to the node_modules root.
        output_dir: The output directory to write the collated manifest to. DO NOT use "dist".
        cli: the Player cli package to use
        **kwargs: Additional arguments to use for running the binary
    """

    player_cli_entrypoint = "{}_entrypoint".format(name)

    directory_path(
        name = player_cli_entrypoint,
        directory = "{}/{}/dir".format(node_modules, cli),
        path = "bin/run",
    )

    js_bin_name = "{}_binary".format(name)

    js_binary(
        name = js_bin_name,
        data = ["{}/{}".format(node_modules, cli)],
        entry_point = ":{}".format(player_cli_entrypoint),
    )

    source_args = []
    for source in sources:
        source_args += ["-s", "$(rootpath {})".format(source)]

    # XLR's readonly output goes to `${output_dir}/xlr/` instead of `dist/xlr` to prevent errors
    # when tsup tries to clean `dist`. (Happens in non-sandboxed Xcode builds.)
    js_run_binary(
        name = name,
        tool = js_bin_name,
        srcs = sources,
        stamp = -1,
        visibility = ["//:__subpackages__"],
        args = [
            "xlr",
            "bundle",
            "-o",
            paths.join(native.package_name(), output_dir),
            "--manifestPath",
            "manifest.json",
        ] + source_args,
        out_dirs = [paths.join(output_dir, "xlr")],
        **kwargs
    )

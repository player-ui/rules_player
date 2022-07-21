"""
Module for merging multiple JSON files together into one
"""

load("@build_bazel_rules_nodejs//:providers.bzl", "node_modules_aspect", "run_node")

_MERGE_JSON = Label("//javascript/package_json:merge_json")

MERGE_JSON_ATTRS = {
  # List of files to merge -- later files will override earlier ones
  "srcs": attr.label_list(default = [], allow_files = True),

  # Internal reference to script to merge attributes and files together
  "_merge_json": attr.label(default = _MERGE_JSON, executable = True, cfg = "host"),
}


def _merge_json_impl(ctx):
    merged_json = ctx.actions.declare_file("merged.json")

    run_node(
        ctx,
        inputs = ctx.files.srcs,
        outputs = [merged_json],
        arguments = [json.encode({
          "output_file": merged_json.path,
          "input_files": [f.path for f in ctx.files.srcs],
        })],
        executable = "_merge_json",
    )

    return [
        DefaultInfo(
            files = depset([merged_json]),
        ),
    ]

merge_json = rule(
    implementation = _merge_json_impl,
    attrs = MERGE_JSON_ATTRS,
)

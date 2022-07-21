"""
Module for building a contributor information about a directory. 
"""

load("@build_bazel_rules_nodejs//:providers.bzl", "node_modules_aspect", "run_node")

_CREATE_CONTRIBUTORS_JSON = Label("//javascript/package_json:contributors")

create_contribUTORS_ATTRS = {
  # All contrib src file
  "all_contributors": attr.label(allow_single_file = [".all-contributorsrc"], ),

  # Internal reference to script to generate the contributors 
  "_create_contributors": attr.label(default = _CREATE_CONTRIBUTORS_JSON, executable = True, cfg = "host"),
}

def _create_contributors_impl(ctx):
    contrib_json = ctx.actions.declare_file("_contributors.json")

    run_node(
        ctx,
        inputs = ctx.files.all_contributors,
        outputs = [contrib_json],
        arguments = [json.encode({
          "output_file": contrib_json.path,
          "all_contributors": ctx.file.all_contributors.path,
        })],
        executable = "_create_contributors",
    )

    return [
        DefaultInfo(
            files = depset([contrib_json]),
        ),
    ]

create_contributors = rule(
    implementation = _create_contributors_impl,
    attrs = create_contribUTORS_ATTRS,
)

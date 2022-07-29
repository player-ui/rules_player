"""
Module for stamping a vsix vscode-extension package
"""
load("@build_bazel_rules_nodejs//:providers.bzl", "run_node", "NODE_CONTEXT_ATTRS", "NodeContextInfo")
load("@bazel_skylib//lib:paths.bzl", "paths")

_VSCE_STAMP_JS = Label("//player/vsce:vsce_stamp")

VSCE_STAMP_ATTRS = dict(NODE_CONTEXT_ATTRS, **{
  "vsix": attr.label( allow_single_file=True ),
  "substitutions": attr.string_dict(),
  "_vsce_stamp_js": attr.label(default=_VSCE_STAMP_JS, executable=True, cfg="host"),
})

def _vsce_stamp_impl(ctx):
  """
  A .vsix file is just a fancy zip. Unzip it, stamp the items, and repack
  """
  stamped_vsix = ctx.actions.declare_file("stamped_%s" % (paths.basename(ctx.file.vsix.path)))
  
  stamp_inputs = []
  stamp = ctx.attr.node_context_data[NodeContextInfo].stamp

  if stamp:
      stamp_inputs = [ctx.info_file]

  run_node(
      ctx,
      inputs = ctx.files.vsix + stamp_inputs,
      outputs = [stamped_vsix],
      arguments = [json.encode({
        "input_file": ctx.file.vsix.path,
        "output_file": stamped_vsix.path,
        "stamp": ctx.info_file.path if stamp else None,
        "substitutions": ctx.attr.substitutions,
      })],
      executable = "_vsce_stamp_js",
      mnemonic = "VSCEStamp",
  )

  return [
    DefaultInfo(
      files = depset([stamped_vsix])
    )
  ]

vsce_stamp = rule(
  implementation = _vsce_stamp_impl,
  attrs = VSCE_STAMP_ATTRS,
)
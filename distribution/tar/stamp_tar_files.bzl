"""
Module for stamping a tar.gz file and repackaging it
"""
load("@build_bazel_rules_nodejs//:providers.bzl", "run_node", "NODE_CONTEXT_ATTRS", "NodeContextInfo")
load("@bazel_skylib//lib:paths.bzl", "paths")

_stamp_tar_files = Label("//distribution/tar:stamp_tar_files")

TAR_STAMP_ATTRS = dict(NODE_CONTEXT_ATTRS, **{
  "tar": attr.label( allow_single_file=True ),
  "substitutions": attr.string_dict(),
  "_stamp_tar_files": attr.label(default=_stamp_tar_files, executable=True, cfg="host"),
})

def _stamp_tar_impl(ctx):
  """
  Untar it, stamp the items, and repack
  """
  stamped_tar = ctx.actions.declare_file(paths.basename(ctx.attr.name + '.tar'))
  
  stamp_inputs = []
  stamp = ctx.attr.node_context_data[NodeContextInfo].stamp

  if stamp:
      stamp_inputs = [ctx.info_file]

  run_node(
      ctx,
      inputs = ctx.files.tar + stamp_inputs,
      outputs = [stamped_tar],
      arguments = [json.encode({
        "input_file": ctx.file.tar.path,
        "output_file": stamped_tar.path,
        "stamp": ctx.info_file.path if stamp else None,
        "substitutions": ctx.attr.substitutions,
      })],
      executable = "_stamp_tar_files",
      mnemonic = "tar",
  )

  return [
    DefaultInfo(
      files = depset([stamped_tar])
    )
  ]

stamp_tar_files = rule(
  implementation = _stamp_tar_impl,
  attrs = TAR_STAMP_ATTRS,
)
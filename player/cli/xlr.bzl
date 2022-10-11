load("@bazel_skylib//lib:paths.bzl", "paths")
load("@build_bazel_rules_nodejs//:providers.bzl", "JSModuleInfo", "node_modules_aspect", "run_node")
load("@build_bazel_rules_nodejs//internal/linker:link_node_modules.bzl", "module_mappings_aspect")
load("@rules_player//javascript:utils.bzl", "get_dep_files")

XLR_COMPILE_ATTRS = {
    # Dependencies needed to build the pkg
    "data": attr.label_list(
        default = [],
        aspects = [module_mappings_aspect, node_modules_aspect],
        allow_files = True,
    ),

    # Files to compile to XLR
    "srcs": attr.label_list(default = [], allow_files = True),

    # What compilation mode should be used (plugin/types)
    "mode": attr.string(default = "plugin"),

    # Input Root
    "input_root": attr.string(default = "src"),

    # Output Directory
    "output_root": attr.string(default = "dist"),

    # Player CLI executable
    "_player_cli": attr.label(default = Label("@npm//@player-tools/cli/bin:player"), executable = True, cfg = "host"),
}

def _xlr_compile(ctx):
  xlr_output = ctx.actions.declare_directory(paths.join(ctx.attr.output_root, "xlr"))
  manifest_json = ctx.actions.declare_file(paths.join(ctx.attr.output_root, "xlr", "manifest.json"))
  manifest_js = ctx.actions.declare_file(paths.join(ctx.attr.output_root, "xlr", "manifest.js"))
  file_outputs = [manifest_json, manifest_js, xlr_output]
  output_group = OutputGroupInfo(
      json = depset([manifest_json]),
      js = depset([manifest_js]),
      xlr = depset([xlr_output])
  )

  deps_inputs = get_dep_files(ctx.attr.data)
  output_root = paths.dirname(xlr_output.path)
  in_dir = paths.join(ctx.label.package, ctx.attr.input_root)

  run_node(
      ctx,
      inputs = ctx.files.srcs + deps_inputs,
      outputs = file_outputs,
      arguments = [
          "xlr",
          "compile",
          "-m",
          ctx.attr.mode,
          "-o",
          output_root,
          "-i",
          in_dir,
      ],
      executable = "_player_cli",
      mnemonic = "PlayerCLI",
  )

  output_depset = depset(file_outputs)

  return [
      DefaultInfo(
          files = output_depset,
      ),
      JSModuleInfo(
          direct_sources = output_depset,
          sources = output_depset,
      ),
      output_group,
  ]


xlr_compile = rule(
    implementation = _xlr_compile,
    attrs = XLR_COMPILE_ATTRS,
)
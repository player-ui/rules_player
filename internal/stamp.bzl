load("@build_bazel_rules_nodejs//:providers.bzl", "run_node")

_STAMP = Label("//internal:stamp_replacement")

def _stamp_impl(ctx):
  inputs = [ctx.info_file, ctx.version_file]

  outputs = []
  for file in ctx.files.files:
    outputs.append(ctx.actions.declare_file(file.basename))

  run_node(
    ctx,
    inputs = inputs + ctx.files.files,
    outputs = outputs,
    arguments = [
      json.encode({
        "info_file": ctx.info_file.path,
        "version_file": ctx.version_file.path,
        "files": [f.path for f in ctx.files.files],
        "outputs": [f.path for f in outputs],
        "substitutions": ctx.attr.substitutions,
        "stable": ctx.attr.stable
      })
    ],
    executable = "_stamp_exec"
  )

  return [
    DefaultInfo(
      files = depset(outputs)
    )
  ]

stamp = rule(
  implementation = _stamp_impl,
  attrs = {
    "files": attr.label_list(
      allow_files = True,
      mandatory = True,
      doc = "The files to stamp"
    ),
    "substitutions": attr.string_dict(
      doc = "A mapping of values to replace in a file, to the stamp variables"
    ),
    "stable": attr.bool(
      default = False,
      doc = "Whether to replace variables from stable-status or volatile-status"
    ),
    "_stamp_exec": attr.label(
      default = _STAMP,
      executable = True,
      doc = "The executable to run the stamping",
      cfg = "host"
    )
  }
)

"""
Module for stamping a tar.gz file and repackaging it
"""
load("@aspect_rules_js//js:defs.bzl","js_binary","js_library")
load("@bazel_skylib//lib:paths.bzl", "paths")

load("@aspect_bazel_lib//lib:stamping.bzl", "STAMP_ATTRS", "maybe_stamp")

_STAMP_TAR_FILES = Label("//distribution/tar:stamp_tar_files_script")

def stamp_tar_impl(ctx):
  """
  Untar it, stamp the items, and repack
  """
  stamped_tar = ctx.actions.declare_file(paths.basename(ctx.attr.name + '.tar.gz'))


  stamp = maybe_stamp(ctx) 

  args = {
    "input_file": ctx.file.tar.short_path,
    "output_file": stamped_tar.short_path,
    "stamp": ctx.info_file.path if stamp else None,
    
    "substitutions": ctx.attr.substitutions,  
  }

  input = [] 
  
  if stamp:
        input = [ctx.info_file]
        args["info_file"] = stamp.stable_status_file.path
        args["version_file"] = stamp.volatile_status_file.path
        args["stamp_file"] = ctx.info_file.short_path
        
  ctx.actions.run(
          inputs = ctx.files.tar + input,
          outputs = [stamped_tar],
          arguments = [json.encode(args)],
          executable = ctx.executable._stamp_tar_files_exec,
          mnemonic = "tar",
          env = {
              "BAZEL_BINDIR": ctx.bin_dir.path,
          },                
      )

  return [
    DefaultInfo(
      files = depset([stamped_tar])
    )
  ]

stamp_tar_files = rule(
    implementation = stamp_tar_impl,
    attrs = dict({
        "tar": attr.label(
            allow_single_file = True,
            mandatory = True,
            doc = "The files to stamp",
        ),
        "substitutions": attr.string_dict(
            doc = "A mapping of values to replace in a file, to the stamp variables",
        ),
        "_stamp_tar_files_exec": attr.label(
            default = _STAMP_TAR_FILES,
            executable = True,
            doc = "The executable to run the stamping",
            cfg = "exec",
        ),
    }, **STAMP_ATTRS),
)
"""
Module for stamping a tar.gz file and repackaging it
"""

load("@aspect_bazel_lib//lib:stamping.bzl", "STAMP_ATTRS", "maybe_stamp")
load("@bazel_skylib//lib:paths.bzl", "paths")

_STAMP_TAR_FILES = Label("//distribution/tar/private:stamp_tar_files_script")

def stamp_tar_impl(ctx):
    """
    this takes a tar file, calls maybe_stamp and replaces any variables in that file with the substituions passed, and then repackages the entire tar.

    Args:
      ctx: tar, substitutions
      maybe_stamp() generates a stable and volatile file in bazel-out


    Returns:
      stamped tar file
    """

    inputs = []

    stamped_tar = ctx.actions.declare_file(paths.basename(ctx.attr.name + ".tar.gz"))

    stamp = maybe_stamp(ctx)

    args = {
        "input_file": ctx.file.tar.short_path,
        "output_file": stamped_tar.short_path,
        "stable": ctx.attr.stable,
        "stamp": ctx.info_file.path if stamp else None,
        "substitutions": ctx.attr.substitutions,
    }

    if stamp:
        inputs = [stamp.volatile_status_file, stamp.stable_status_file]
        args["stable_file"] = stamp.stable_status_file.path
        args["volatile_file"] = stamp.volatile_status_file.path

    ctx.actions.run(
        inputs = inputs + ctx.files.tar,
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
            files = depset([stamped_tar]),
        ),
    ]

stamp_tar_files = rule(
    implementation = stamp_tar_impl,
    attrs = dict({
        "stable": attr.bool(
            default = False,
            doc = "If true, replaces variables from stable-status. False replaces from volatile-status",
        ),
        "substitutions": attr.string_dict(
            doc = "A mapping of values to replace in a file, to the stamp variables",
        ),
        "tar": attr.label(
            allow_single_file = True,
            mandatory = True,
            doc = "The files to stamp",
        ),
        "_stamp_tar_files_exec": attr.label(
            default = _STAMP_TAR_FILES,
            executable = True,
            doc = "The executable to run the stamping",
            cfg = "exec",
        ),
    }, **STAMP_ATTRS),
)

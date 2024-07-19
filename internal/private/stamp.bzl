"""
Rules related to stamping files
"""

load("@aspect_bazel_lib//lib:stamping.bzl", "STAMP_ATTRS", "maybe_stamp")

_STAMP = Label("//internal/private:stamp_replacement_script")

def _stamp_impl(ctx):
    inputs = []

    outputs = []

    for file in ctx.files.files:
        outputs.append(ctx.actions.declare_file(file.basename))

    stamp = maybe_stamp(ctx)
    args = {
        "files": [f.path for f in ctx.files.files],
        "outputs": [f.path for f in outputs],
        "stable": ctx.attr.stable,
        "substitutions": ctx.attr.substitutions,
    }

    if stamp:
        inputs = [stamp.volatile_status_file, stamp.stable_status_file]
        args["info_file"] = stamp.stable_status_file.path
        args["version_file"] = stamp.volatile_status_file.path

    ctx.actions.run(
        inputs = inputs + ctx.files.files,
        outputs = outputs,
        arguments = [
            json.encode(args),
        ],
        env = {
            "BAZEL_BINDIR": ctx.bin_dir.path,
        },
        executable = ctx.executable._stamp_exec,
    )

    return [
        DefaultInfo(
            files = depset(outputs),
        ),
    ]

stamp = rule(
    implementation = _stamp_impl,
    attrs = dict({
        "files": attr.label_list(
            allow_files = True,
            mandatory = True,
            doc = "The files to stamp",
        ),
        "stable": attr.bool(
            default = False,
            doc = "Whether to replace variables from stable-status or volatile-status",
        ),
        "substitutions": attr.string_dict(
            doc = "A mapping of values to replace in a file, to the stamp variables",
        ),
        "_stamp_exec": attr.label(
            default = _STAMP,
            executable = True,
            doc = "The executable to run the stamping",
            cfg = "exec",
        ),
    }, **STAMP_ATTRS),
)

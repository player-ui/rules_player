"""
Populate all the required fields for a package.json file needed for a full build
"""

load("@aspect_bazel_lib//lib:stamping.bzl", "STAMP_ATTRS", "maybe_stamp")

def _build_requirements_impl(ctx):
    """ Builds a requirements.txt from the base and specified deps"""
    output_file = ctx.actions.declare_file("requires.txt")
    stamp = maybe_stamp(ctx)

    stamp_inputs = []

    args = {
        "input": ctx.file.root_requirements.short_path,
        "output": output_file.short_path,
        "package_names": ctx.attr.package_names,
        "substitutions": ctx.attr.substitutions,
        "local_version": ctx.attr.local_version
    }

    if stamp:
        stamp_inputs = [stamp.volatile_status_file, stamp.stable_status_file]
        args["BAZEL_STABLE_STATUS_FILE"] = stamp.stable_status_file.path
        args["BAZEL_VOLATILE_STATUS_FILE"] = stamp.volatile_status_file.path

    ctx.actions.run(
        inputs = stamp_inputs + ctx.files.root_requirements,
        env = {
            "BAZEL_BINDIR": ctx.bin_dir.path,
        },
        arguments = [json.encode(args)],
        outputs = [output_file],
        executable = ctx.executable._build_requirements,
    )

    return [
        DefaultInfo(
            files = depset([output_file]),
        ),
    ]

build_requirements = rule(
    implementation = _build_requirements_impl,
    attrs = dict({
        "package_names": attr.string_list(
            doc = "A list of packages to parse out of the requirements.txt file.",
            mandatory = True,
        ),
        "root_requirements": attr.label(
            mandatory = True,
            doc = "The root requirements.txt for the project. Used to get the versions of dependencies",
            allow_single_file = ["requirements.txt"],
        ),
        "substitutions": attr.string_dict(default = {}),
        "local_version": attr.string(
            doc = "The version to use for local packages",
        ),
        "_build_requirements": attr.label(
            executable = True,
            cfg = "exec",
            default = "//python/private:build_requirements",
        ),
    }, **STAMP_ATTRS),
)

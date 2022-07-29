load("@npm//vsce:index.bzl", _vsce = "vsce")
load(":vsce_stamp.bzl",  "vsce_stamp")

COMMON_ARGS = [
                "--no-git-tag-version",
            "--no-update-package-json",
            "--yarn"
]

def vsce(name, data, substitutions = {}):
    _package_segments = len(native.package_name().split("/"))
    # ../.. segments to re-relative paths from the chdir back to workspace root 
    out_path = "/".join([".."] * _package_segments + ["$@"])

    default_target = ":%s" % name
    stamped_name = "%s_stamp" % name
    stamped_target = ":%s" % stamped_name

    _vsce(
        name = name,
        args = [
            "package",
            "--out",
            out_path,
        ] + COMMON_ARGS,
        chdir = native.package_name(),
        outs = ["%s.vsix" % name],
        data = data
    )

    vsce_stamp(
        name = stamped_name, 
        vsix = default_target,
        substitutions = substitutions
    )

    _vsce(
        name = "%s.publish" % name,
        data = [
            stamped_target
        ],
        args = [
            "publish",
            "--packagePath",
            "$(location %s)" % stamped_target,
        ] + COMMON_ARGS
    )

load("@npm//vsce:index.bzl", "vsce")


def package(name, data):
    _package_segments = len(native.package_name().split("/"))
    # ../.. segments to re-relative paths from the chdir back to workspace root 
    out_path = "/".join([".."] * _package_segments + ["$@"])

    vsce(
        name = "%s_vsce_package" % name,
        args = [
            "package",
            "--out",
            out_path,
            "--no-git-tag-version",
            "--no-update-package-json",
            "--yarn"

        ],
        chdir = native.package_name(),
        outs = ["%s.vsix" % name],
        data = data
    )

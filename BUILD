load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")

bzlformat_pkg(name = "bzlformat")

bzlformat_missing_pkgs(name = "bzlformat_missing_pkgs")

filegroup(
    name = "all_files",
    srcs = glob(["*"]),
    visibility = ["//:__subpackages__"],
)

filegroup(
    name = "local_repository_files",
    # Include every package that is required by the child workspaces.
    srcs = [
        ":all_files",
        "//javascript:all_files",
        "//javascript/private:all_files",
        "//kotlin:all_files",
        "//kotlin/private:all_files",
    ],
    visibility = ["//:__subpackages__"],
)

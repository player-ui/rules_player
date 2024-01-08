filegroup(
    name = "local_repository_files",
    # Include every package that is required by the child workspaces.
    srcs = [
        "BUILD.bazel",
        "WORKSPACE",
        "//javascript:all_files",
    ],
    visibility = ["//:__subpackages__"],
)

exports_files(
    [
        ".bazelignore",
    ],
    visibility = ["//:__subpackages__"],
)

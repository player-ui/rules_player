load("@aspect_rules_js//js:defs.bzl", "js_library")
load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")
load(
    "@cgrindel_bazel_starlib//updatesrc:defs.bzl",
    "updatesrc_update_all",
)

bzlformat_pkg(name = "bzlformat")

bzlformat_missing_pkgs(name = "bzlformat_missing_pkgs")

exports_files([
    "package.json",
    "pnpm-lock.yaml",
])

# Internal js_library wrapper for the bats binary and all its dependencies
# This is used by internal tests and should not be used by external users
js_library(
    name = "bats_binary",
    srcs = glob([
        "node_modules/bats/bin/**",
        "node_modules/bats/lib/**",
        "node_modules/bats/libexec/**",
    ]),
    visibility = ["//:__subpackages__"],  # Only visible within this project
)

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

updatesrc_update_all(
    name = "update_all",
)

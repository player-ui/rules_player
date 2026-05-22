load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@bazel_skylib//:bzl_library.bzl", "bzl_library")
load("@cgrindel_bazel_starlib//bzlformat:defs.bzl", "bzlformat_missing_pkgs", "bzlformat_pkg")

bzlformat_pkg(name = "bzlformat")

bzlformat_missing_pkgs(name = "bzlformat_missing_pkgs")

bzl_library(
    name = "stamp",
    srcs = ["stamp.bzl"],
    visibility = [
        "//docs:__subpackages__",
        "//internal:__subpackages__",
    ],
    deps = [
    ],
)

bzl_library(
    name = "scope_name",
    srcs = ["scope_name.bzl"],
    visibility = ["//internal:__subpackages__"],
    deps = [],
)

js_binary(
    name = "stamp_replacement_script",
    entry_point = "stamp_replacement.js",
    visibility = ["//visibility:public"],
)

# Generic `bazel cquery` + `bazel run` (or test/build) launcher used by macros
# like `abi_update_all` and `lint_fix_all` to invoke every target of a given
# rule kind in the consumer's workspace. Public visibility because consumers
# load the macros, which materialize `sh_binary` targets that reference this
# script under the consumer's repo.
exports_files(
    ["run_all_of_kind.sh"],
    visibility = ["//visibility:public"],
)

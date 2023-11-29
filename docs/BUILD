load("@aspect_bazel_lib//lib:docs.bzl", "stardoc_with_diff_test", "update_docs")

stardoc_with_diff_test(
    name = "rules",
    bzl_library_target = "//javascript:defs",
)

update_docs(name = "update")

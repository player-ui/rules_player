load("@aspect_bazel_lib//lib:docs.bzl", "stardoc_with_diff_test", "update_docs")

stardoc_with_diff_test(
    name = "javascript",
    bzl_library_target = "//javascript:defs",
)

# stardoc_with_diff_test(
#     name = "kotlin",
#     bzl_library_target = "//kotlin:defs",
# )

stardoc_with_diff_test(
    name = "ios",
    bzl_library_target = "//ios:defs",
)

# stardoc_with_diff_test(
#     name = "player",
#     bzl_library_target = "//player:defs",
# )

stardoc_with_diff_test(
    name = "distribution",
    bzl_library_target = "//distribution:defs",
)

update_docs(name = "update")

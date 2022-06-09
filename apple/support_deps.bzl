load(
    "@build_bazel_apple_support//lib:repositories.bzl",
    "apple_support_dependencies",
)

def support_deps():
    apple_support_dependencies()

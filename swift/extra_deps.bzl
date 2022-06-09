load(
    "@build_bazel_rules_swift//swift:extras.bzl",
    "swift_rules_extra_dependencies",
)

def extra_deps():
    swift_rules_extra_dependencies()

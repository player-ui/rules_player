load(
    "@build_bazel_rules_swift//swift:repositories.bzl",
    "swift_rules_dependencies",
)

def rules_deps():
    swift_rules_dependencies()

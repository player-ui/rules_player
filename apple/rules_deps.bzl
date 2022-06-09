load(
    "@build_bazel_rules_ios//rules:repositories.bzl",
    "rules_ios_dependencies"
)
load(
    "@build_bazel_rules_apple//apple:repositories.bzl",
    "apple_rules_dependencies",
)
load(
    "@build_bazel_rules_swift//swift:repositories.bzl",
    "swift_rules_dependencies",
)
load(
    "@com_google_protobuf//:protobuf_deps.bzl",
    "protobuf_deps",
)

def rules_deps():
    rules_ios_dependencies()
    apple_rules_dependencies()
    swift_rules_dependencies()
    protobuf_deps()

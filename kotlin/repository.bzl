load("@io_bazel_rules_kotlin_repo//src/main/starlark/release_archive:repository.bzl", "archive_repository")

def archive():
    archive_repository(
      name = "io_bazel_rules_kotlin",
      source_repository_name = "io_bazel_rules_kotlin_repo",
    )

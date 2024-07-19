load("@bazel_binaries//:defs.bzl", "bazel_binaries")
load("@rules_bazel_integration_test//bazel_integration_test:defs.bzl", "bazel_integration_test", "default_test_runner", "integration_test_utils")

default_test_runner(name = "simple_test_runner")

bazel_integration_test(
    name = "ts-monorepo-test",
    bazel_binaries = bazel_binaries,
    bazel_version = bazel_binaries.versions.current,
    test_runner = ":simple_test_runner",
    workspace_files = integration_test_utils.glob_workspace_files("ts-monorepo") + [
        "//:local_repository_files",
    ],
    workspace_path = "ts-monorepo",
)

bazel_integration_test(
    name = "kotlin-test",
    bazel_binaries = bazel_binaries,
    bazel_version = bazel_binaries.versions.current,
    test_runner = ":simple_test_runner",
    workspace_files = integration_test_utils.glob_workspace_files("kotlin") + [
        "//:local_repository_files",
    ],
    workspace_path = "kotlin",
)

test_suite(
    name = "all_integration_tests",
    tags = integration_test_utils.DEFAULT_INTEGRATION_TEST_TAGS,
    tests = [
        ":kotlin-test",
        ":ts-monorepo-test",
    ],
)

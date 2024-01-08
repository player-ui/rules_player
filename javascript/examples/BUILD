load(
    "@rules_bazel_integration_test//bazel_integration_test:defs.bzl",
    "bazel_integration_test",
    "default_test_runner",
    "integration_test_utils",
)

# Declare a test runner to drive the integration tests.
default_test_runner(
    name = "simple_test_runner",
)

bazel_integration_test(
    name = "simple_test",
    bazel_version = "6.4.0",
    test_runner = ":simple_test_runner",
    workspace_files = integration_test_utils.glob_workspace_files("javascript/examples/ts-monorepo") + [
        "//:local_repository_files",
    ],
    workspace_path = "javascript/examples/ts-monorepo",
)

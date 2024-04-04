load("@io_bazel_rules_kotlin//kotlin:lint.bzl", "ktlint_fix", "ktlint_test")
load(":scope_name.bzl", "scope_name")

def lint(
        *,

        name,
        srcs,
        lint_config,
):
    ktlint_test(
        name = scope_name(name, "lint"),
        srcs = srcs,
        config = lint_config,
    )

    ktlint_fix(
        name = scope_name(name, "lint-fix"),
        srcs = srcs,
        config = lint_config,
    )
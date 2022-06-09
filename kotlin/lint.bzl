load("@io_bazel_rules_kotlin//kotlin:lint.bzl", "ktlint_fix", "ktlint_test")

def lint(
        *,

        name,
        srcs,
        lint_config,
):
    ktlint_test(
        name = "%s-lint" % name,
        srcs = srcs,
        config = lint_config,
    )

    ktlint_fix(
        name = "%s-lint-fix" % name,
        srcs = srcs,
        config = lint_config,
    )
    
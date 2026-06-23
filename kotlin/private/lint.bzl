"""
Macro implementation for linting kotlin source
"""

load("@rules_kotlin//kotlin:lint.bzl", "ktlint_fix", "ktlint_test")
load("@rules_shell//shell:sh_binary.bzl", "sh_binary")
load("//internal:defs.bzl", "RUN_ALL_OF_KIND", "scope_name")

def lint(
        *,
        name,
        srcs,
        lint_config):
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

def lint_fix_all(*, name, tags = None):
    """Workspace-level launcher that runs every `ktlint_fix` target in turn.

    Args:
        name: name of the runnable launcher target.
        tags: optional tags forwarded to the generated `sh_binary`.
    """
    sh_binary(
        name = name,
        srcs = [RUN_ALL_OF_KIND],
        args = [
            "--kind",
            "ktlint_fix",
        ],
        tags = tags,
    )

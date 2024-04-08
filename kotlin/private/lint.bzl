load("@rules_jvm_external//:defs.bzl", "maven_install")
load(":scope_name.bzl", "scope_name")

def lint(
        *,

        name,
        srcs,
        lint_config,
):
    maven_install(
        artifacts = [
            "org.hamcrest:hamcrest-library:1.3",
        ],
        repositories = [
            # Private repositories are supported through HTTP Basic auth
            "https://maven.google.com",
            "https://repo1.maven.org/maven2",
        ],
    )
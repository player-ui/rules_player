workspace(
    name = "rules_player",
    managed_directories = {
        "@npm": ["node_modules"],
    },
)

# Defines all potential dependencies -- loading these deps is done lazily on first access
load(":workspace.bzl", "deps")

deps()

# Like right here
# load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")
# bazel_skylib_workspace()
load("//:conf.bzl", "apple", "distribution", "javascript", "skylib", "kotlin")

skylib()

# apple()

distribution()

javascript()

kotlin()

# TODO: This breaks the conf.bzl standard... b/c of the way bzl files
#  are required to be structured, we can't consolidate config logic
#  to a sinlge .bzl file. This is super frustrating when it comes to
#  consolidating and standardizing common workspace configuration for
#  Bazel projects and just adds to boilerplate overhead, even if in
#  the name of being explicit.
# load("//swift:rules_deps.bzl", "rules_deps")

# rules_deps()

# load("//swift:extra_deps.bzl", "extra_deps")

# extra_deps()

# load("//apple:support_deps.bzl", "support_deps")

# support_deps()


load("@io_bazel_rules_kotlin//kotlin:core.bzl", "kt_register_toolchains")

kt_register_toolchains()

load("@rules_player//junit5:conf.bzl", "junit5")

junit5()

######################
# Maven Dependencies #
######################
load("@rules_player//distribution:deps.bzl", artifacts = "maven")
load("@rules_jvm_external//:defs.bzl", "maven_install")

maven_install(
    artifacts = artifacts,
    fetch_sources = True,
    repositories = [
        "https://repo1.maven.org/maven2",
        "https://maven.google.com/",
    ],
)

#####################
# Yarn Dependencies #
#####################
load("@build_bazel_rules_nodejs//:index.bzl", "node_repositories", "yarn_install")

node_repositories(
    node_version = "16.12.0",
    yarn_version = "1.22.17",
)

yarn_install(
    name = "npm",
    package_json = "//:package.json",
    yarn_lock = "//:yarn.lock",
)

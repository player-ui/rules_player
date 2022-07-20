load("@io_bazel_rules_kotlin//kotlin:jvm.bzl", "kt_jvm_binary")
load("@rules_player//maven:parse_coordinates.bzl", "parse_coordinates")
load(":deps.bzl", "staging_cli")

# TODO: We should probably build this for the archive
kt_jvm_binary(
  name = "nexus-staging-cli",
  srcs = ["NexusStagingCli.kt"],
  main_class = "com.intuit.player.rules.distribution.NexusStagingCliKt",
  deps = parse_coordinates(staging_cli),
)

sh_binary(
  name = "staged-maven-deploy",
  srcs = [":staged-maven-deploy.sh"],
)

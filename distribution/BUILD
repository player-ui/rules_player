load("@rules_kotlin//kotlin:jvm.bzl", "kt_jvm_binary")

# TODO: We should probably build this for the archive
kt_jvm_binary(
  name = "nexus-staging-cli",
  srcs = ["NexusStagingCli.kt"],
  main_class = "com.intuit.player.rules.distribution.NexusStagingCliKt",
  deps = [
    "@rules_player_maven//:com_github_ajalt_clikt_clikt_jvm",
    "@rules_player_maven//:io_github_gradle_nexus_publish_plugin",
    "@rules_player_maven//:ch_qos_logback_logback_classic",
  ],
)

sh_binary(
  name = "staged-maven-deploy",
  srcs = [":staged-maven-deploy.sh"],
)
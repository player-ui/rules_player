load("@vaticle_bazel_distribution//maven:deps.bzl", distribution = "maven_artifacts_with_versions")

staging_cli = [
    "com.github.ajalt.clikt:clikt-jvm:3.4.0",
    "io.github.gradle-nexus:publish-plugin:1.1.0",
    "ch.qos.logback:logback-classic:1.2.11",
]

maven = distribution + staging_cli

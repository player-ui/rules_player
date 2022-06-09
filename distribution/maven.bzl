load("@rules_jvm_external//:defs.bzl", "maven_install")
load("//distribution:deps.bzl", artifacts = "maven")

def install():
  maven_install(
      artifacts = artifacts,
      repositories = ["https://repo1.maven.org/maven2",],
  )
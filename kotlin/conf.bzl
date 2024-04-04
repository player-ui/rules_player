load("@junit//junit5-jupiter-starter-bazel:junit5.bzl", "junit_jupiter_java_repositories", "junit_platform_java_repositories")

def junit5(juptier_version = "5.7.2", platform_version = "1.7.2"):
    junit_jupiter_java_repositories(version = juptier_version)
    junit_platform_java_repositories(version = platform_version)
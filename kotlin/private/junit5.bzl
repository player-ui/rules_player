"""
Utility macro for setting up junit
"""

load("//kotlin/private:junit_test.bzl", "junit_jupiter_java_repositories", "junit_platform_java_repositories")

def junit5(jupter_version = "5.7.2", platform_version = "1.7.2"):
    junit_jupiter_java_repositories(version = jupter_version)
    junit_platform_java_repositories(version = platform_version)

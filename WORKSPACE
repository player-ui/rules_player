workspace(
    name = "rules_player",
)

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

rules_kotlin_version = "1.9.0"
http_archive(
    name = "rules_kotlin",
    sha256 = "5766f1e599acf551aa56f49dab9ab9108269b03c557496c54acaf41f98e2b8d6",
    url = "https://github.com/bazelbuild/rules_kotlin/releases/download/v1.9.0/rules_kotlin-v1.9.0.tar.gz",
)

load("@rules_kotlin//kotlin:repositories.bzl", "kotlin_repositories")

kotlin_repositories()

load("@rules_kotlin//kotlin:core.bzl", "kt_register_toolchains")

kt_register_toolchains()

http_archive(
    name = "rules_jvm_external",
    sha256 = "d31e369b854322ca5098ea12c69d7175ded971435e55c18dd9dd5f29cc5249ac",
    strip_prefix = "rules_jvm_external-5.3",
    url = "https://github.com/bazelbuild/rules_jvm_external/releases/download/5.3/rules_jvm_external-5.3.tar.gz",
)

load("@rules_jvm_external//:defs.bzl", "maven_install")

maven_install(
    artifacts = [
        "com.github.ajalt.clikt:clikt-jvm:3.4.0",
        "io.github.gradle-nexus:publish-plugin:1.1.0",
        "ch.qos.logback:logback-classic:1.2.11",
        "com.eclipsesource.minimal-json:minimal-json:0.9.5",
        "com.electronwill.night-config:core:3.6.5",
        "com.electronwill.night-config:toml:3.6.5",
        "com.google.http-client:google-http-client:1.34.2",
        "info.picocli:picocli:4.3.2",
        "org.apache.commons:commons-compress:1.21",
        "org.jsoup:jsoup:1.16.1",
        "org.zeroturnaround:zt-exec:1.10",
    ],
    repositories = [
        "https://repo1.maven.org/maven2",
        "https://maven.google.com/",
        "https://plugins.gradle.org/m2/",
    ],
)


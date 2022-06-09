# Kotlin Rules

https://bazelbuild.github.io/rules_kotlin/kotlin.html

## Define Kotlin rules

### Loading default rules

```python
load("@player-ui_rules_player//:workspace.bzl", "deps")
deps()
```

### Loading rules from HTTP archive

By default, the workspace declaration is configured to work with Player modules. You can override the location of the remote archive by specifying a `tag`, `sha`, `name`, or `baseUrl`:

`$baseUrl/$tag/$name`

```python
load("@player-ui_rules_player//kotlin:workspace.bzl", "kotlin")
kotlin(
    tag = "v1.5.0",
    sha256 = "12d22a3d9cbcf00f2e2d8f0683ba87d3823cb8c7f6837568dd7e48846e023307",
    baseUrl = "https://github.com/bazelbuild/rules_kotlin/releases/download",
)
```

### Loading rules from GIT repository

```python
load("@player-ui_rules_player//kotlin:workspace.bzl", "kotlin_repository")
kotlin_repository(
    remote = "https://github.com/bazelbuild/rules_kotlin.git",
    branch = "master",
)

load("@player-ui_rules_player//kotlin:repository.bzl", "archive")
archive()
```

### Loading rules manually

If neither of those macros work for your use case, you can always declare the Kotlin ruleset repository yourself as shown in the Kotlin rules documentation:
https://github.com/bazelbuild/rules_kotlin#workspace

## Configure Kotlin repositories

```python
load("@player-ui_rules_player//kotlin:conf.bzl", kotlin_conf = "kotlin")
kotlin_conf()
```

## Configure Kotlin toolchain

In order to compile Kotlin code, you must register a Kotlin toolchain, which can be done manually, or by registering the default toolchain:

```python
load("@io_bazel_rules_kotlin//kotlin:core.bzl", "kt_register_toolchains")
kt_register_toolchains()
```

## Using JUnit 5

```python
load("@player-ui_rules_player//junit5:conf.bzl", "junit5")
junit5()
```

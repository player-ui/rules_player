# Kotlin Rules

https://bazelbuild.github.io/rules_kotlin/kotlin.html

## Define Kotlin rules

### Loading default rules

```python
load("@rules_player//:workspace.bzl", "deps")
deps()
```

### Loading rules from HTTP archive

By default, the workspace declaration is configured to work with Player modules. You can override the location of the remote archive by specifying a `tag`, `sha`, `name`, or `baseUrl`:

`$baseUrl/$tag/$name`

```python
load("@rules_player//kotlin:workspace.bzl", "kotlin")
kotlin(
    # Defaults
    tag = "v1.7.1", 
    sha256 = "fd92a98bd8a8f0e1cdcb490b93f5acef1f1727ed992571232d33de42395ca9b3",
    baseUrl = "https://github.com/bazelbuild/rules_kotlin/releases/download",
)
```

### Loading rules from GIT repository

```python
load("@rules_player//kotlin:workspace.bzl", "kotlin_repository")
kotlin_repository(
    remote = "https://github.com/bazelbuild/rules_kotlin.git",
    branch = "master",
)

load("@rules_player//kotlin:repository.bzl", "archive")
archive()
```

### Loading rules manually

If neither of those macros work for your use case, you can always declare the Kotlin ruleset repository yourself as shown in the Kotlin rules documentation:
https://github.com/bazelbuild/rules_kotlin#workspace

## Configure Kotlin repositories

```python
load("@rules_player//kotlin:conf.bzl", kotlin_conf = "kotlin")
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
load("@rules_player//junit5:conf.bzl", "junit5")
junit5()
```

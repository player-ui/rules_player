# rules_player

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/player-ui/rules_player/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/player-ui/rules_player/tree/main)

This repository contains all of the common Bazel definitions for building Player polyglot repositories.
While these rules are _mostly_ generic and may be suitable for other use-cases, our primary goal is to enable the Player repo and plugin builds — rules and implementations may change to support that. 

> This repo takes inspiration from the following:
>
> - https://github.com/vaticle/dependencies
> - https://jayconrod.com/posts/115/organizing-bazel-workspace-files
> - https://github.com/RobotLocomotion/drake/blob/2c485822aecda3b2400ce5db4262c28a37caeeeb/tools/workspace/default.bzl#L286-L306

## Usage

Add the following to you `WORKSPACE` to setup `player_common` for consumption:

```python
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

git_repository(
    name = "rules_player",
    remote = "https://github.com/player-ui/rules_player",
    branch = "main",
)
```

Then, for most cases, you can add all ruleset declarations by executing the `deps` macro from `//workspace.bzl` file and configure toolsets as needed with the macros from `tool/conf.bzl`:

```python
# Load all Player common ruleset definitions
load("@rules_player//:workspace.bzl", "deps")
deps()

# Configure specific toolchain with common properties
load("@rules_player//kotlin:conf.bzl", "kotlin")
kotlin()
```

If you don't want to add all common ruleset declarations, adding ruleset declarations can be done on a 1-by-1 basis:

```python
load("@rules_player//kotlin:workspace.bzl", kotlin_deps = "kotlin")
kotlin_deps()
```

## Contributing

Each tool defined in this repo has it's own folder that contains two main `.bzl` files, `workspace.bzl` and `conf.bzl`. `workspace.bzl` is responsible for declaring where the tool rules live, i.e. an `http_archive` or `git_repository`. These are just definitions and Bazel will download or clone them lazily, only once the workspace or builds attempt to `load` a macro or rule from these definitions. The `conf.bzl` file is optional, but can be used to contain configuration logic in a macro.

For instance, the `kotlin/workspace.bzl` defines the `http_archive` where to load Kotlin rules from and the `kotlin/conf.bzl` loads the rules from the `http_archive` to regsiter the default Kotlin toolchains.

The top-level `workspace.bzl` exposes a macro that will define all the common rulesets necessary for Player build system. Consumers can then explicitly configure these rulesets, or use the corresponding `conf.bzl` files if the common configurations work for them.


"""
Public API for player Bazel rules.
"""

load("//player/private:dsl.bzl", _compile = "compile")
load("//player/private:xlr.bzl", _xlr_compile = "xlr_compile")
load("//player/private:config.bzl", _create_base_config = "create_base_config")

compile = _compile
dsl_compile = _compile
xlr_compile = _xlr_compile
create_base_config = _create_base_config

"""
Public API for player Bazel rules.
"""

load("//player/private:config.bzl", _create_base_config = "create_base_config")
load("//player/private:dsl.bzl", _compile = "compile")
load("//player/private:js_xlr_pipeline.bzl", _js_xlr_pipeline = "js_xlr_pipeline")
load("//player/private:kt_player_plugin_wrapper.bzl", _kt_player_plugin_wrapper = "kt_player_plugin_wrapper")
load("//player/private:mocks.bzl", _compile_mocks = "compile_mocks", _generate_mocks_manifest = "generate_mocks_manifest")
load("//player/private:xlr.bzl", _xlr_compile = "xlr_compile")

compile = _compile
dsl_compile = _compile
xlr_compile = _xlr_compile
create_base_config = _create_base_config
js_xlr_pipeline = _js_xlr_pipeline
compile_mocks = _compile_mocks
generate_mocks_manifest = _generate_mocks_manifest
kt_player_plugin_wrapper = _kt_player_plugin_wrapper

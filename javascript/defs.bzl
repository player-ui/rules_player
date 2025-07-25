"""
Public API for JavaScript based project rules
"""

load("//javascript/private:eslint.bzl", _eslint_test = "eslint_test")
load("//javascript/private:js_pipeline.bzl", _js_pipeline = "js_pipeline")
load("//javascript/private:oclif.bzl", _oclif_pipeline = "oclif_pipeline")
load("//javascript/private:package_json.bzl", _create_package_json = "create_package_json")
load("//javascript/private:tsup.bzl", _tsup_build = "tsup_build")
load("//javascript/private:vitest.bzl", _vitest_bench = "vitest_bench", _vitest_test = "vitest_test")

js_pipeline = _js_pipeline
eslint_test = _eslint_test
vitest_test = _vitest_test
vitest_bench = _vitest_bench
tsup_build = _tsup_build
create_package_json = _create_package_json
oclif_pipeline = _oclif_pipeline

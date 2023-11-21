"""
Public API for JavaScript based project rules
"""

load("//javascript/private:js_pipeline.bzl", _js_pipeline = "js_pipeline")
load("//javascript/private:eslint.bzl", _eslint_test = "eslint_test")
load("//javascript/private:vitest.bzl", _vitest_test = "vitest_test")

js_pipeline = _js_pipeline
eslint_test = _eslint_test
vitest_test = _vitest_test
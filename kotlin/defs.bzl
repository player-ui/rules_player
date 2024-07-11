"""
Public API for Kotlin based project rules
"""

load("//kotlin/private:kt_jvm.bzl", _kt_jvm = "kt_jvm")
load("//kotlin/private:distribution.bzl", _distribution = "distribution")
load("//kotlin/private:lint.bzl", _lint = "lint")
load("//kotlin/private:junit_test.bzl", _kt_jvm_junit5_test = "kt_jvm_junit5_test")

kt_jvm = _kt_jvm
distribution = _distribution
lint = _lint
kt_jvm_junit5_test = _kt_jvm_junit5_test

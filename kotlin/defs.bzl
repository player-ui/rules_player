"""
Public API for Kotlin based project rules
"""

load("//kotlin/private:abi.bzl", _abi = "abi", _abi_update_all = "abi_update_all")
load("//kotlin/private:distribution.bzl", _distribution = "distribution")
load("//kotlin/private:junit_test.bzl", _kt_jvm_junit5_test = "kt_jvm_junit5_test")
load("//kotlin/private:kt_android.bzl", _kt_android = "kt_android")
load("//kotlin/private:kt_jvm.bzl", _kt_jvm = "kt_jvm")
load("//kotlin/private:lint.bzl", _lint = "lint", _lint_fix_all = "lint_fix_all")

kt_jvm = _kt_jvm
distribution = _distribution
lint = _lint
lint_fix_all = _lint_fix_all
kt_jvm_junit5_test = _kt_jvm_junit5_test
kt_android = _kt_android
abi = _abi
abi_update_all = _abi_update_all

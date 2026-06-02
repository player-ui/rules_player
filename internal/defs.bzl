"""
Public API for Utility rules
"""

load("//internal/private:scope_name.bzl", _scope_name = "scope_name")
load("//internal/private:stamp.bzl", _stamp = "stamp")

stamp = _stamp
scope_name = _scope_name

RUN_ALL_OF_KIND = Label("//internal/private:run_all_of_kind.sh")

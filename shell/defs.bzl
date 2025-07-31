"""
Public API for shell Bazel rules.
"""

load("//shell/private:shell.bzl", _sh_configure = "sh_configure")

sh_configure = _sh_configure

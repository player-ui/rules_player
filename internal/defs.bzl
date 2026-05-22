"""
Public API for Utility rules
"""

load("//internal/private:stamp.bzl", _stamp = "stamp")

stamp = _stamp

RUN_ALL_OF_KIND = Label("//internal/private:run_all_of_kind.sh")

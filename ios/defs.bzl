"""
Public API for Common iOS utils
"""

load("//ios/private:common_utils.bzl", _assemble_pod = "assemble_pod", _ios_pipeline = "ios_pipeline")

load("//ios/private:publishing.bzl", _pod_push = "pod_push", _spm_publish = "spm_publish")

#export Rule Dependencies here so Player does not need to load dependencies, does not work for rules_ios and rules_apple
load("@build_bazel_rules_swift//swift:swift.bzl", _swift_library = "swift_library")

assemble_pod = _assemble_pod
ios_pipeline = _ios_pipeline

swift_library = _swift_library

pod_push = _pod_push
spm_publish = _spm_publish
"""
Public API for Common iOS utils
"""

#export Rule Dependencies here so Player does not need to load dependencies, does not work for rules_ios and rules_apple
load("@build_bazel_rules_swift//swift:swift.bzl", _swift_library = "swift_library")
load("//ios/private:cocoapods_publishing.bzl", _ios_publish = "ios_publish")
load("//ios/private:common_utils.bzl", _ios_pipeline = "ios_pipeline")
load("//ios/private:spm_publishing.bzl", _spm_publish = "spm_publish")
load("//ios/private:zip.bzl", _assemble_package = "assemble_package", _assemble_pod = "assemble_pod")

assemble_pod = _assemble_pod
assemble_package = _assemble_package
ios_pipeline = _ios_pipeline
swift_library = _swift_library
ios_publish = _ios_publish
spm_publish = _spm_publish

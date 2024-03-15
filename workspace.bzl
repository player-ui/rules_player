load("//android:workspace.bzl", "android")
load("//apple:workspace.bzl", "apple")
load("//bazel:workspace.bzl", "skylib")
load("//cocoapods:workspace.bzl", "cocoapods")
load("//distribution:workspace.bzl", "distribution")
load("//junit5:workspace.bzl", "junit5")
load("//kotlin:workspace.bzl", "kotlin")
load("//maven:workspace.bzl", "maven")
load("//javascript:workspace.bzl", "javascript")

def deps(
    android_api_version = None,
    android_build_tools_version = None
):
    android(api_level = android_api_version, build_tools_version = android_build_tools_version)
    apple()
    skylib()
    distribution()
    junit5()
    kotlin()
    maven()
    javascript()
    cocoapods()
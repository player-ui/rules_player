# Prebuilt Hermes compiler (hermesc) shipped in the react-native npm tarball.
# Host-only: compiles JS -> HBC on the build machine. Selected by host OS.
load("@bazel_skylib//rules:native_binary.bzl", "native_binary")

native_binary(
    name = "hermesc",
    src = select({
        "@bazel_tools//src/conditions:darwin": "sdks/hermesc/osx-bin/hermesc",
        "@bazel_tools//src/conditions:windows": "sdks/hermesc/win64-bin/hermesc.exe",
        "//conditions:default": "sdks/hermesc/linux64-bin/hermesc",
    }),
    data = select({
        "@bazel_tools//src/conditions:windows": glob(["sdks/hermesc/win64-bin/*.dll"]),
        "//conditions:default": [],
    }),
    out = "hermesc",
    visibility = ["//visibility:public"],
)

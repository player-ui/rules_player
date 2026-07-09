"""Module extensions for JavaScript rules."""

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

# Pinned react-native version whose npm tarball ships the prebuilt host hermesc.
_RN_VERSION = "0.78.1"
_RN_TARBALL_SHA256 = "bf4198ba712c09df3de6d493cfaf968498cddb7107ecd48a081a1ce32d18be06"

def _hermes_impl(_module_ctx):
    http_archive(
        name = "rn_hermesc",
        build_file = "@rules_player//javascript/private:hermesc.BUILD",
        sha256 = _RN_TARBALL_SHA256,
        strip_prefix = "package",
        url = "https://registry.npmjs.org/react-native/-/react-native-{v}.tgz".format(v = _RN_VERSION),
    )

hermes = module_extension(
    implementation = _hermes_impl,
    doc = "Provides `@rn_hermesc//:hermesc`, the prebuilt host Hermes compiler.",
)

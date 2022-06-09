load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

# Obviously, this a silly abstraction, but it might be worth keeping
# like this to prove out the pattern of workspace.bzl declaration ->
# conf.bzl configuration
def skylib():
    bazel_skylib_workspace()

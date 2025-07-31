def _is_windows(repository_ctx):
    """Returns true if the host OS is Windows."""
    return repository_ctx.os.name.startswith("windows")

def _local_shell_config_impl(repository_ctx):
    """
    Detects the path of the shell interpreter via a env var
    and stores it in a sh_toolchain rule.
    """
    sh_path = repository_ctx.os.environ.get("SHELL")
    if not sh_path:
        sh_path = "/shell/binary/not/found"

    if sh_path and _is_windows(repository_ctx):
        sh_path = sh_path.replace("\\", "/")

    repository_ctx.file("BUILD", """
load("@bazel_tools//tools/sh:sh_toolchain.bzl", "sh_toolchain")
sh_toolchain(
    name = "local_sh",
    path = "{sh_path}",
    visibility = ["//visibility:public"],
)
toolchain(
    name = "local_sh_toolchain",
    toolchain = ":local_sh",
    toolchain_type = "@bazel_tools//tools/sh:toolchain_type",
)
""".format(sh_path = sh_path))

local_shell_config = repository_rule(
    environ = [
        "SHELL",
    ],
    local = True,
    implementation = _local_shell_config_impl,
)

# Used by MODULE.bazel
sh_configure = module_extension(
    implementation = lambda ctx: local_shell_config(name = "local_shell_config"),
)

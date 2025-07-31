"""
build_constants is a repo rule to configure constants for use in the Bazel ecosystem.

Ex:
```python
load("@build_constants//:constants.bzl", "VERSION")
```
"""

def _build_constants_impl(repository_ctx):
    _BUILD_FILE = """
# DO NOT EDIT: automatically generated for _build_constants rule
filegroup(
    name = 'files',
    srcs = glob(['**']),
    visibility = ['//visibility:public']
)
"""
    repository_ctx.file("BUILD", _BUILD_FILE, False)

    version_file_path = repository_ctx.path(repository_ctx.attr.version_file)
    version = repository_ctx.read(version_file_path)

    _BUILD_CONSTANTS_FILE = """
# DO NOT EDIT: automatically generated for _build_constants rule
VERSION = \"{version}\"
{constants}
"""

    constants = "\n".join(["%s = \"%s\"" % (key, value) for (key, value) in repository_ctx.attr.constants.items()])

    repository_ctx.file(
        "constants.bzl",
        _BUILD_CONSTANTS_FILE.format(version = version, constants = constants),
        False,
    )

build_constants = repository_rule(
    implementation = _build_constants_impl,
    attrs = {
        "constants": attr.string_dict(
            allow_empty = True,
        ),
        "version_file": attr.label(
            mandatory = True,
            allow_single_file = True,
            default = Label("//:VERSION"),
        ),
    },
)

"""
iOS Swift Package Manager publishing rule
"""

load("@aspect_bazel_lib//lib:stamping.bzl", "STAMP_ATTRS", "maybe_stamp")

_TEMPLATE_SPM_PUBLISH = Label("//ios/private:unzip_and_tag.sh")

def _spm_publish_impl(ctx):
    """Implementation for SPM publishing rule.

    This rule takes a pre-built zip file and publishes it to the specified repository.
    """
    output = ctx.actions.declare_file("publish.sh")

    stamp = maybe_stamp(ctx)

    stamp_inputs = []

    if stamp:
        stamp_inputs = [stamp.stable_status_file]

    ctx.actions.expand_template(
        template = ctx.file._publishTemplate,
        output = output,
        is_executable = True,
        substitutions = {
            "{REPOSITORY}": ctx.attr.repository,
            "{TARGET_BRANCH}": ctx.attr.target_branch,
            "{ZIP}": ctx.file.zip.basename,
        },
    )

    return DefaultInfo(
        executable = output,
        runfiles = ctx.runfiles(files = [ctx.file.zip] + stamp_inputs),
    )

spm_publish = rule(
    implementation = _spm_publish_impl,
    doc = """
    Publishes an iOS Swift Package Manager release package.
    
    This rule takes a pre-built zip file and publishes it to the specified repository.
    Use the assemble_package macro from zip.bzl to create the zip first.
    """,
    executable = True,
    attrs = dict({
        "repository": attr.string(
            doc = "The git repository to publish spm zip contents to",
        ),
        "target_branch": attr.string(
            default = "main",
            doc = "The branch to push the zipped files to",
        ),
        "zip": attr.label(
            allow_single_file = True,
            mandatory = True,
            doc = "The zip file to publish (created by assemble_package)",
        ),
        "_publishTemplate": attr.label(
            default = _TEMPLATE_SPM_PUBLISH,
            allow_single_file = True,
            doc = "The SPM publish script to use as a template for expansion",
        ),
    }, **STAMP_ATTRS),
)

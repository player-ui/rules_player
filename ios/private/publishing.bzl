"""
Implementation for ios & spm publishing rules
"""

load("@aspect_bazel_lib//lib:stamping.bzl", "STAMP_ATTRS", "maybe_stamp")

_TEMPLATE_REPO_PUSH = Label("//ios/private:pod_repo_push.sh")
_TEMPLATE_TRUNK_PUSH = Label("//ios/private:pod_trunk_push.sh")
_TEMPLATE_SPM_PUBLISH = Label("//ios/private:unzip_and_tag.sh")
_TEMPLATE_PUSH = Label("//ios/private:push.sh")

def _spm_publish_impl(ctx):
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

def _ios_publish_impl(ctx):
    output = ctx.actions.declare_file("publish.sh")

    spm = ctx.actions.declare_file("unzip-and-tag.sh")

    pod = ctx.actions.declare_file("pod-push.sh")

    stamp = maybe_stamp(ctx)

    stamp_inputs = []

    if stamp:
        stamp_inputs = [stamp.stable_status_file]

    ctx.actions.expand_template(
        template = ctx.file._publishTemplate,
        output = spm,
        is_executable = True,
        substitutions = {
            "{REPOSITORY}": ctx.attr.repository,
            "{TARGET_BRANCH}": ctx.attr.target_branch,
            "{ZIP}": ctx.file.zip.basename,
        },
    )

    commands = ctx.attr.executable.split(" ")

    ctx.actions.expand_template(
        template = ctx.file._templatePrivateRepo if ctx.attr.specsRepository else ctx.file._templateTrunk,
        output = pod,
        is_executable = True,
        substitutions = {
            "{GLOBAL_FLAGS}": " ".join(ctx.attr.globalFlags),
            "{PODSPEC}": ctx.file.podspec.basename,
            "{POD}": commands[0],
            "{PUSH_FLAGS}": " ".join(ctx.attr.pushFlags),
            "{REPOSITORY}": ctx.attr.specsRepository,
            "{SUBCOMMANDS}": " ".join(commands[1:]),
        },
    )

    ctx.actions.expand_template(
        template = ctx.file._templatePush,
        output = output,
        is_executable = True,
        substitutions = {
            "{POD}": pod.basename,
            "{SPM}": spm.basename,
        },
    )

    return DefaultInfo(
        executable = output,
        runfiles = ctx.runfiles(files = [ctx.file.zip, spm, pod] + stamp_inputs),
    )

spm_publish = rule(
    implementation = _spm_publish_impl,
    executable = True,
    attrs = dict({
        "repository": attr.string(
            doc = "The git repository to publish spm zip contents to",
        ),
        "target_branch": attr.string(
            default = "main",
            doc = "The branch to use for stable releases",
        ),
        "zip": attr.label(
            allow_single_file = True,
            doc = "The zip to publish the contents of",
        ),
        "_publishTemplate": attr.label(
            default = _TEMPLATE_SPM_PUBLISH,
            allow_single_file = True,
            doc = "The template shell script for publishing the zip contents to a git repository",
        ),
    }, **STAMP_ATTRS),
)

ios_publish = rule(
    implementation = _ios_publish_impl,
    executable = True,
    attrs = dict({
        "executable": attr.string(
            default = "pod",
            doc = "The command to use for cocoapods",
        ),
        "globalFlags": attr.string_list(
            default = [],
            doc = "Flags to append to all pod commands",
        ),
        "podspec": attr.label(
            allow_single_file = True,
            mandatory = True,
            doc = "The podspec to push to a specs repo",
        ),
        "pushFlags": attr.string_list(
            default = [],
            doc = "Flags to append to the push command",
        ),
        "repository": attr.string(
            doc = "The git repository to publish zip contents to",
        ),
        "specsRepository": attr.string(
            doc = "A private specs repository to push to. Otherwise pushes to trunk",
        ),
        "target_branch": attr.string(
            default = "main",
            doc = "The branch to use for stable releases",
        ),
        "zip": attr.label(
            allow_single_file = True,
            doc = "The zip to publish the contents of",
        ),
        "_publishTemplate": attr.label(
            default = _TEMPLATE_SPM_PUBLISH,
            allow_single_file = True,
            doc = "The template shell script for publishing the zip contents to a git repository",
        ),
        "_templatePrivateRepo": attr.label(
            default = _TEMPLATE_REPO_PUSH,
            allow_single_file = True,
            doc = "The repo push script to use as a template for expansion",
        ),
        "_templatePush": attr.label(
            default = _TEMPLATE_PUSH,
            allow_single_file = True,
            doc = "The push script that runs the SPM and CocoaPod publish steps",
        ),
        "_templateTrunk": attr.label(
            default = _TEMPLATE_TRUNK_PUSH,
            allow_single_file = True,
            doc = "The trunk push script to use as a template for expansion",
        ),
    }, **STAMP_ATTRS),
)

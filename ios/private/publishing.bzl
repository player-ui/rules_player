load("@aspect_bazel_lib//lib:stamping.bzl", "STAMP_ATTRS", "maybe_stamp")

_TEMPLATE_REPO_PUSH = Label("//ios/private:pod_repo_push.sh")
_TEMPLATE_TRUNK_PUSH = Label("//ios/private:pod_trunk_push.sh")
_TEMPLATE_SPM_PUBLISH = Label("//ios/private:unzip_and_tag.sh")

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
      '{REPOSITORY}': ctx.attr.repository,
      '{ZIP}': ctx.file.zip.basename,
    }
  )

  return DefaultInfo(
    executable = output,
    runfiles = ctx.runfiles(files = [ctx.file.zip] + stamp_inputs)
  )

def _pod_push_impl(ctx):
  output = ctx.actions.declare_file("push.sh")

  commands = ctx.attr.executable.split(' ')

  ctx.actions.expand_template(
    template = ctx.file._templatePrivateRepo if ctx.attr.repository else ctx.file._templateTrunk,
    output = output,
    is_executable = True,
    substitutions = {
      '{POD}': commands[0],
      '{SUBCOMMANDS}': " ".join(commands[1:]),
      '{PUSH_FLAGS}': " ".join(ctx.attr.pushFlags),
      '{GLOBAL_FLAGS}': " ".join(ctx.attr.globalFlags),
      '{PODSPEC}': ctx.file.podspec.basename,
      '{REPOSITORY}': ctx.attr.repository
    }
  )

  return DefaultInfo(
    executable = output,
    runfiles = ctx.runfiles(files = [ctx.file.podspec])
  )

pod_push = rule(
  implementation = _pod_push_impl,
  executable = True,
  attrs = {
    "podspec": attr.label(
      allow_single_file = True,
      mandatory = True,
      doc = "The podspec to push to a specs repo"
    ),
    "executable": attr.string(
      default = "pod",
      doc = "The command to use for cocoapods"
    ),
    "pushFlags": attr.string_list(
      default = [],
      doc = "Flags to append to the push command"
    ),
    "globalFlags": attr.string_list(
      default = [],
      doc = "Flags to append to all pod commands"
    ),
    "repository": attr.string(
      doc = "A private specs repository to push to. Otherwise pushes to trunk"
    ),
    "_templatePrivateRepo": attr.label(
        default = _TEMPLATE_REPO_PUSH,
        allow_single_file = True,
        doc = "The repo push script to use as a template for expansion"
    ),
    "_templateTrunk": attr.label(
        default = _TEMPLATE_TRUNK_PUSH,
        allow_single_file = True,
        doc = "The trunk push script to use as a template for expansion"
    )
  }
)

spm_publish = rule(
  implementation = _spm_publish_impl,
  executable = True,
  attrs = dict({
    "zip": attr.label(
      allow_single_file = True,
      doc = "The zip to publish the contents of"
    ),
    "repository": attr.string(
      doc = "The git repository to publish spm zip contents to"
    ),
    "_publishTemplate": attr.label(
      default = _TEMPLATE_SPM_PUBLISH,
      allow_single_file = True,
      doc = "The template shell script for publishing the zip contents to a git repository"
    )
  }, **STAMP_ATTRS)
)
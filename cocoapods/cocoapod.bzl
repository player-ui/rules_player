load("@rules_pkg//:pkg.bzl", "pkg_zip")
load("@rules_pkg//:mappings.bzl", "pkg_files", "strip_prefix")
load("//internal:stamp.bzl", _stamp = "stamp")

def assemble_pod(
  name,
  podspec = '',
  srcs = [],
  data = {}
):
  pkg_files(
    name = "podspec",
    srcs = [podspec],
    strip_prefix = strip_prefix.from_pkg(),
  )

  pkg_files(
    name = "srcs",
    srcs = srcs,
    strip_prefix = strip_prefix.from_pkg(),
  )

  data_pkgs = []
  for target in data:
    ident = "data_%d" % len(data_pkgs)
    pkg_files(
      name = ident,
      srcs = [target],
      strip_prefix = strip_prefix.from_pkg(),
      prefix = data[target]
    )
    data_pkgs.append(ident)

  pkg_zip(
      name = name,
      srcs = ["podspec", "srcs"] + data_pkgs
  )

def _pod_command(repository_ctx):
  # split up the command into an array
  # that way `pod` works, but so does `bundle exec pod`
  return repository_ctx.attr.executable.split(' ')

def _pod_install_impl(repository_ctx):
  repository_ctx.report_progress("Processing Podfile: installing pods and generating BUILD files")
  # Need to get the real path to be able to run pod install since it will have relative path
  # to the development pod
  workspace_root = str(repository_ctx.path(Label('@//:WORKSPACE')).dirname)
  path = workspace_root + str(repository_ctx.path(repository_ctx.attr.podfile))

  if ":" in path:
    root = path.split(':')[0]
  else:
    root = path

  command = _pod_command(repository_ctx)

  repository_ctx.file(
    "_pod_check.sh",
    content = """#!/usr/bin/env bash
# Immediately exit if any command fails.
set -e
cd "{root}"
'{pod}' {subcommands}
""".format(
        root = root,
        pod = command[0],
        subcommands = " ".join(command[1:])
    ),
      executable = True
  )

  # Install pods
  pod_result = repository_ctx.execute(
      [repository_ctx.path("_pod_check.sh")]
  )
  if pod_result.return_code == 0:
    repository_ctx.file(
      "_pod_install.sh",
      content = """#!/usr/bin/env bash
  # Immediately exit if any command fails.
  set -e
  (cd "{root}"; BAZEL_POD_INSTALL=true "{pod}" {subcommands} install {flags} 1>&2)
  """.format(
          root = root,
          pod = command[0],
          subcommands = " ".join(command[1:]),
          flags = " ".join(repository_ctx.attr.flags)
      ),
      executable = True
    )

    # Install pods
    install_result = repository_ctx.execute(
        [repository_ctx.path("_pod_install.sh")]
    )

    if install_result.return_code:
      fail("Return: {code} {stderr}".format(code = install_result.return_code, stderr = install_result.stderr))

    # Symlink pod folders to external/Pods folder if they have a BUILD.bazel file
    # Pods directory has more folders than just pods that aren't needed for bazel
    for f in repository_ctx.path(root).get_child('Pods').readdir():
      if f.get_child('BUILD.bazel').exists:
        repository_ctx.symlink(
          f.realpath,
          repository_ctx.path(f.basename)
        )
  else:
    print(
      "'{pod} {subcommands}' not found on system, skipping pod install"
      .format(
          pod = command[0],
          subcommands = " ".join(command[1:])
      )
    )

pod_install = repository_rule(
  implementation=_pod_install_impl,
  attrs={
    "podfile": attr.string(
      doc = "The podfile to use for install"
    ),
    "flags": attr.string_list(
      doc = "Flags to append to the pod install command"
    ),
    "executable": attr.string(
      default = "pod",
      doc = "The command to use for cocoapods"
    ),
  }
)

_TEMPLATE_REPO_PUSH = Label("//cocoapods:pod_repo_push.sh")
_TEMPLATE_TRUNK_PUSH = Label("//cocoapods:pod_trunk_push.sh")

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
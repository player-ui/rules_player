load("@rules_player//distribution/tar:stamp_tar_files.bzl", "stamp_tar_files")
load("@bazel_tools//tools/build_defs/pkg:pkg.bzl", "pkg_tar")

def pkg_stamped_tar(name, substitutions = {}, visibility = None, **kwargs):
  """
  Creates a tar.gz file in which all files are stamped with the given substitutions.
  """
  base_name = "%s_base" % name
  base_target = ":%s" % base_name

  pkg_tar(
    # TODO: Add visibility here
    name = base_name,
    **kwargs,
  )

  stamp_tar_files(
    name = name,
    substitutions = substitutions,
    visibility = visibility,
    tar = base_target
  )
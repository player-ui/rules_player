load("@aspect_rules_js//js:defs.bzl", "js_binary", "js_run_binary", "js_test")
load("@bazel_skylib//lib:paths.bzl", "paths")

def gh_pages(repo,version,gh_name = 'intuit-svc', gh_email = 'opensource-svc@intuit.com', source_dir="src", branch = "main", **kwargs):
  js_binary(
    entry_point = Label("@rules_player//gh-pages/private:gh_pages_lib"),
    data = [
      ":VERSION"
    ] + kwargs.pop("data", []),
    args = [
      "--srcDir", source_dir,
      "--repo", repo,
      "--branch", branch,
      '--gh_user', gh_name,
      '--gh_email', gh_email,
      '--version', version,
    ],
    **kwargs
  )


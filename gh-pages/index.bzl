load("@build_bazel_rules_nodejs//:index.bzl", "nodejs_binary", "nodejs_test", "npm_package_bin")

def gh_pages(repo, gh_name = 'intuit-svc', gh_email = 'opensource-svc@intuit.com', source_dir="src", branch = "main", **kwargs):
  nodejs_binary(
    entry_point = "@rules_player//gh-pages:gh-pages.js",
    data = [
      "@npm//gh-pages",
      "//:VERSION"
    ] + kwargs.pop("data", []),
    args = [
      "--srcDir", source_dir,
      "--repo", repo,
      "--branch", branch,
      "--version", "$(location //:VERSION)",
      '--gh_user', gh_name,
      '--gh_email', gh_email,
    ],
    **kwargs
  )
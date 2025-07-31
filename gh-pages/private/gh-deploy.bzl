"""
gh_pages is a rule for publishing some source to a GitHub pages branch
"""

load("@aspect_rules_js//js:defs.bzl", "js_binary")

def gh_pages(repo, version, gh_name = "intuit-svc", gh_email = "opensource-svc@intuit.com", source_dir = "src", branch = "main", **kwargs):
    js_binary(
        entry_point = Label("@rules_player//gh-pages/private:gh_pages_lib"),
        data = [
            ":VERSION",
        ] + kwargs.pop("data", []),
        args = [
            "--srcDir",
            source_dir,
            "--repo",
            repo,
            "--branch",
            branch,
            "--gh_user",
            gh_name,
            "--gh_email",
            gh_email,
            "--version",
            version,
        ],
        **kwargs
    )

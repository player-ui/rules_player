"""
Public API for JavaScript based project rules
"""

load("//:gh-deploy.bzl", _gh_pages = "gh_pages")

gh_pages = _gh_pages

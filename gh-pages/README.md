# GH Pages Deployment

The rules defined here outline a basic pipeline of deploying a folder to an org-level github-pages repo.
It leverages the same `VERSION` file that many of our distribution rules use, and automatically publishes docs to sub-folders based on their release versions

The repo structure would look something like:

```
<org>.github.io/
  1/
  2/
  latest/
  next/
```

where numbered folders correspond to the major version of the release, `latest` is an alias for the last main version, and `next` corresponds to the latest canary release.

You must supply a `GH_TOKEN` environment variable that has push rights to the target repo.


To use the rule, define it in your docs folder with the data to be published: 

```python
load("@rules_player//gh-pages:index.bzl", "gh_pages")

gh_pages(
  name="deploy_docs",
  source_dir=package_name() + "/src",
  repo="<example-org>/<example-org>.github.io",
  data = glob(["src/**"])
)
```

and run it during your deployment:

```sh
bazel run //packages/docs:deploy_docs
```
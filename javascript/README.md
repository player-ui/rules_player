# Javascript Pipeline

The JS rules/macros defined here are extension of the [rules_nodejs](https://github.com/bazelbuild/rules_nodejs) provided by `bazel`. 
They're intended to make the setup of common development patterns for JS libraries _super_ easy. 

The main integration point is the `js_library_pipeline` macro. It will: 
  - Generate a `package.json` based on the dependencies provided (pulling versions from a root `package.json`)
  - Create the proper outputs for tree-shaking support: 
    - `dist/index.cjs.js` - CommonJS output file, used in tests/node
    - `dist/index.esm.js` - ESM output, used in bundlers (webpack, etc)
    - `dist/index.d.ts` - TS type output (if using typescript)
  - Add a `:unit` test target using `jest`
  - Add a `:lint` test target using `eslint` 

Each of these steps can be customized as needed, but we try to minimize the need for it. 

## How to use the pipeline rule

### Setup

There's a bit of setup involved before you're able to leverage this pipeline. 

First add this repo as a target:

```python
load("@bazel_tools//tools/build_defs/repo:git.bzl", "git_repository")

git_repository(
    name = "player_common",
    branch = "main",
    remote = "https://github.com/player-ui/rules_player",
)
```

Load the dependent libraries

```python
load("@rules_player//:workspace.bzl", "deps")
deps()
```
Setup the libraries that we just loaded

```python
load("@rules_player//:conf.bzl", "javascript")

javascript()
```

See the `ts-monorepo` example for all the files needed to get up and running



## Rules

### create_package_json

Used to generate a `package.json` for a module, including automatically pulling in the correct versions of any dependent libraries. 

To extend the generated `package.json` there's 2 options:

- Pass a `base_package_json` label to a `.json` file. This will be used to override/extend anything defined by the generated file.
- Pass the `additional_properties` attribute, which is a JSON string of a similar set of features. 

The generation and precedence can be though of as: 

```js
{
  ...generated,
  ...base_package_json,
  ...additional_properties
}
```

### create_contributors

The `create_contributors` rule generates the `package.json` formatted contributors list from an `.all-contributorsrc` file

```python
load("@rules_player//javascript/package_json:index.bzl", "create_contributors")

create_contributors(
    name = "pkg_json_contrib",
    all_contributors = "//:.all-contributorsrc",
)
```

### merge_json

The `merge_json` rule will merge together properties from multiple JSON files into one. This can be used as an input to the `base_package_json` attribute.

```python 
load("@rules_player//javascript/package_json:index.bzl", "merge_json")

merge_json(
    name = "pkg_json_template",
    srcs = [
        "package-template.json",
        ":pkg_json_contrib",
    ]
)
```
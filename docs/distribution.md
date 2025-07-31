<!-- Generated with Stardoc: http://skydoc.bazel.build -->

Public API for distribution related Bazel rules.

<a id="build_constants"></a>

## build_constants

<pre>
load("@rules_player//distribution:defs.bzl", "build_constants")

build_constants(<a href="#build_constants-name">name</a>, <a href="#build_constants-constants">constants</a>, <a href="#build_constants-repo_mapping">repo_mapping</a>, <a href="#build_constants-version_file">version_file</a>)
</pre>

**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="build_constants-name"></a>name |  A unique name for this repository.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="build_constants-constants"></a>constants |  -   | <a href="https://bazel.build/rules/lib/dict">Dictionary: String -> String</a> | optional |  `{}`  |
| <a id="build_constants-repo_mapping"></a>repo_mapping |  In `WORKSPACE` context only: a dictionary from local repository name to global repository name. This allows controls over workspace dependency resolution for dependencies of this repository.<br><br>For example, an entry `"@foo": "@bar"` declares that, for any time this repository depends on `@foo` (such as a dependency on `@foo//some:target`, it should actually resolve that dependency within globally-declared `@bar` (`@bar//some:target`).<br><br>This attribute is _not_ supported in `MODULE.bazel` context (when invoking a repository rule inside a module extension's implementation function).   | <a href="https://bazel.build/rules/lib/dict">Dictionary: String -> String</a> | optional |  |
| <a id="build_constants-version_file"></a>version_file |  -   | <a href="https://bazel.build/concepts/labels">Label</a> | required |  |



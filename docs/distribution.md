<!-- Generated with Stardoc: http://skydoc.bazel.build -->

Public API for distribution related Bazel rules.

<a id="build_constants"></a>

## build_constants

<pre>
load("@rules_player//distribution:defs.bzl", "build_constants")

build_constants(<a href="#build_constants-name">name</a>, <a href="#build_constants-constants">constants</a>, <a href="#build_constants-version_file">version_file</a>)
</pre>

**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="build_constants-name"></a>name |  A unique name for this repository.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="build_constants-constants"></a>constants |  -   | <a href="https://bazel.build/rules/lib/dict">Dictionary: String -> String</a> | optional |  `{}`  |
| <a id="build_constants-version_file"></a>version_file |  -   | <a href="https://bazel.build/concepts/labels">Label</a> | required |  |



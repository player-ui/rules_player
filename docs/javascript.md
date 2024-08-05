<!-- Generated with Stardoc: http://skydoc.bazel.build -->

Public API for JavaScript based project rules

<a id="create_package_json"></a>

## create_package_json

<pre>
create_package_json(<a href="#create_package_json-name">name</a>, <a href="#create_package_json-additional_exports">additional_exports</a>, <a href="#create_package_json-base_package_json">base_package_json</a>, <a href="#create_package_json-custom_entrypoints">custom_entrypoints</a>, <a href="#create_package_json-dependencies">dependencies</a>,
                    <a href="#create_package_json-native_bundle">native_bundle</a>, <a href="#create_package_json-peer_dependencies">peer_dependencies</a>, <a href="#create_package_json-placeholder_version">placeholder_version</a>, <a href="#create_package_json-root_package_json">root_package_json</a>, <a href="#create_package_json-stamp">stamp</a>,
                    <a href="#create_package_json-substitutions">substitutions</a>)
</pre>



**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="create_package_json-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="create_package_json-additional_exports"></a>additional_exports |  Additional entrypoints to add to the generated package.json   | <a href="https://bazel.build/rules/lib/dict">Dictionary: String -> String</a> | optional |  `{}`  |
| <a id="create_package_json-base_package_json"></a>base_package_json |  A .json file to use to add additional properties to the generated package. This can often be a 'package.json' and the entries/outputs/dependencies will be filled in later on.   | <a href="https://bazel.build/concepts/labels">Label</a> | required |  |
| <a id="create_package_json-custom_entrypoints"></a>custom_entrypoints |  If custom main/module/types entrypoints are specified and shouldn't be overwritten   | Boolean | optional |  `False`  |
| <a id="create_package_json-dependencies"></a>dependencies |  The dependencies of the package. These will be added to the base package.json   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |
| <a id="create_package_json-native_bundle"></a>native_bundle |  The name for the native bundle if used   | String | optional |  `""`  |
| <a id="create_package_json-peer_dependencies"></a>peer_dependencies |  The peer dependencies of the package. These will be added to the base package.json   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |
| <a id="create_package_json-placeholder_version"></a>placeholder_version |  The version to use for the local dependencies in the workspace   | String | optional |  `"0.0.0-PLACEHOLDER"`  |
| <a id="create_package_json-root_package_json"></a>root_package_json |  The root package.json for the project. Used to get the versions of dependencies and peer-depedencies   | <a href="https://bazel.build/concepts/labels">Label</a> | required |  |
| <a id="create_package_json-stamp"></a>stamp |  Whether to encode build information into the output. Possible values:<br><br>- `stamp = 1`: Always stamp the build information into the output, even in     [--nostamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) builds.     This setting should be avoided, since it is non-deterministic.     It potentially causes remote cache misses for the target and     any downstream actions that depend on the result. - `stamp = 0`: Never stamp, instead replace build information by constant values.     This gives good build result caching. - `stamp = -1`: Embedding of build information is controlled by the     [--[no]stamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) flag.     Stamped targets are not rebuilt unless their dependencies change.   | Integer | optional |  `-1`  |
| <a id="create_package_json-substitutions"></a>substitutions |  -   | <a href="https://bazel.build/rules/lib/dict">Dictionary: String -> String</a> | optional |  `{}`  |


<a id="eslint_test"></a>

## eslint_test

<pre>
eslint_test(<a href="#eslint_test-name">name</a>, <a href="#eslint_test-data">data</a>, <a href="#eslint_test-srcs">srcs</a>, <a href="#eslint_test-node_modules">node_modules</a>, <a href="#eslint_test-lint_exts">lint_exts</a>, <a href="#eslint_test-kwargs">kwargs</a>)
</pre>

A test target that runs eslint on the given sources.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="eslint_test-name"></a>name |  The name of the target.   |  none |
| <a id="eslint_test-data"></a>data |  A list of targets to include in the test's data.   |  `[]` |
| <a id="eslint_test-srcs"></a>srcs |  A list of sources to run eslint on.   |  `[]` |
| <a id="eslint_test-node_modules"></a>node_modules |  The node_modules target to use for eslint.   |  `"//:node_modules"` |
| <a id="eslint_test-lint_exts"></a>lint_exts |  A list of extensions to pass to eslint's --ext flag.   |  `[".ts", ".js", ".tsx", ".jsx"]` |
| <a id="eslint_test-kwargs"></a>kwargs |  Additional arguments to pass to the underlying js_test target.   |  none |


<a id="js_pipeline"></a>

## js_pipeline

<pre>
js_pipeline(<a href="#js_pipeline-package_name">package_name</a>, <a href="#js_pipeline-name">name</a>, <a href="#js_pipeline-srcs">srcs</a>, <a href="#js_pipeline-package_json">package_json</a>, <a href="#js_pipeline-root_package_json">root_package_json</a>, <a href="#js_pipeline-vitest_config">vitest_config</a>, <a href="#js_pipeline-tsup_config">tsup_config</a>,
            <a href="#js_pipeline-node_modules">node_modules</a>, <a href="#js_pipeline-deps">deps</a>, <a href="#js_pipeline-native_bundle">native_bundle</a>, <a href="#js_pipeline-private">private</a>, <a href="#js_pipeline-peer_deps">peer_deps</a>, <a href="#js_pipeline-create_package_json_args">create_package_json_args</a>,
            <a href="#js_pipeline-include_packaging_targets">include_packaging_targets</a>, <a href="#js_pipeline-test_deps">test_deps</a>, <a href="#js_pipeline-lint_deps">lint_deps</a>, <a href="#js_pipeline-build_deps">build_deps</a>)
</pre>

The main entry point for any JS/TS project. `js_pipeline` should be the only thing you need in your BUILD file.

Creates a js_library, npm_package, and test targets for a given package.


**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="js_pipeline-package_name"></a>package_name |  The name of the package including the scope (@test/bar).   |  none |
| <a id="js_pipeline-name"></a>name |  The name of the package (defaults to the last part of the package_name).   |  `None` |
| <a id="js_pipeline-srcs"></a>srcs |  The source files for the package (defaults to src/*).   |  `None` |
| <a id="js_pipeline-package_json"></a>package_json |  The package.json file for the package (defaults to package.json).   |  `"package.json"` |
| <a id="js_pipeline-root_package_json"></a>root_package_json |  The root package.json file for the package (defaults to //:package.json).   |  `"//:package.json"` |
| <a id="js_pipeline-vitest_config"></a>vitest_config |  The vitest config for the package (defaults to None).   |  `":vitest_config"` |
| <a id="js_pipeline-tsup_config"></a>tsup_config |  The tsup config for the package (defaults to None).   |  `":tsup_config"` |
| <a id="js_pipeline-node_modules"></a>node_modules |  The base node_modules to pull dependencies from (defaults to //:node_modules).   |  `"//:node_modules"` |
| <a id="js_pipeline-deps"></a>deps |  The dependencies for the package.   |  `[]` |
| <a id="js_pipeline-native_bundle"></a>native_bundle |  The name for the native bundle global if defined.   |  `None` |
| <a id="js_pipeline-private"></a>private |  Whether or not the package should be private (skipping an npm release).   |  `False` |
| <a id="js_pipeline-peer_deps"></a>peer_deps |  The peer dependencies for the package.   |  `[]` |
| <a id="js_pipeline-create_package_json_args"></a>create_package_json_args |  Additional arguments to pass to the package_json creation   |  `{}` |
| <a id="js_pipeline-include_packaging_targets"></a>include_packaging_targets |  Additional dependencies to add to the package target   |  `[]` |
| <a id="js_pipeline-test_deps"></a>test_deps |  The test dependencies for the package.   |  `["//:vitest_config"]` |
| <a id="js_pipeline-lint_deps"></a>lint_deps |  The lint dependencies for the package.   |  `["//:eslint_config"]` |
| <a id="js_pipeline-build_deps"></a>build_deps |  The build dependencies for the package.   |  `["//:tsup_config", "//:typings"]` |


<a id="oclif_pipeline"></a>

## oclif_pipeline

<pre>
oclif_pipeline(<a href="#oclif_pipeline-package_name">package_name</a>, <a href="#oclif_pipeline-name">name</a>, <a href="#oclif_pipeline-srcs">srcs</a>, <a href="#oclif_pipeline-manifest">manifest</a>, <a href="#oclif_pipeline-node_modules">node_modules</a>, <a href="#oclif_pipeline-deps">deps</a>, <a href="#oclif_pipeline-peer_deps">peer_deps</a>, <a href="#oclif_pipeline-build_deps">build_deps</a>)
</pre>

A modified version of the `js_pipeline` for building oclif CLIs and CLI plugins.

Creates a js_library, npm_package, and test targets for a given package.


**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="oclif_pipeline-package_name"></a>package_name |  The name of the package including the scope (@test/bar).   |  none |
| <a id="oclif_pipeline-name"></a>name |  The name of the package (defaults to the last part of the package_name).   |  `None` |
| <a id="oclif_pipeline-srcs"></a>srcs |  The source files for the package (defaults to src/*).   |  `None` |
| <a id="oclif_pipeline-manifest"></a>manifest |  If an oclif manifest should be generated as part of the build. Not needed for CLI plugins.   |  `True` |
| <a id="oclif_pipeline-node_modules"></a>node_modules |  The base node_modules to pull dependencies from (defaults to //:node_modules).   |  `"//:node_modules"` |
| <a id="oclif_pipeline-deps"></a>deps |  The dependencies for the package.   |  `[]` |
| <a id="oclif_pipeline-peer_deps"></a>peer_deps |  The peer dependencies for the package.   |  `[]` |
| <a id="oclif_pipeline-build_deps"></a>build_deps |  The build dependencies for the package.   |  `["//:typings"]` |


<a id="tsup_build"></a>

## tsup_build

<pre>
tsup_build(<a href="#tsup_build-name">name</a>, <a href="#tsup_build-srcs">srcs</a>, <a href="#tsup_build-config">config</a>, <a href="#tsup_build-data">data</a>, <a href="#tsup_build-node_modules">node_modules</a>, <a href="#tsup_build-substitutions">substitutions</a>, <a href="#tsup_build-outs">outs</a>, <a href="#tsup_build-kwargs">kwargs</a>)
</pre>

Run a vite test.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="tsup_build-name"></a>name |  The name of the test.   |  none |
| <a id="tsup_build-srcs"></a>srcs |  Inputs to the module   |  `[]` |
| <a id="tsup_build-config"></a>config |  The vite config target.   |  `"tsup.config.ts"` |
| <a id="tsup_build-data"></a>data |  The list of data dependencies.   |  `["//:tsup_config"]` |
| <a id="tsup_build-node_modules"></a>node_modules |  The node_modules target.   |  `"//:node_modules"` |
| <a id="tsup_build-substitutions"></a>substitutions |  Substitutions to stamp during the build.   |  `{"__VERSION__": "{STABLE_VERSION}"}` |
| <a id="tsup_build-outs"></a>outs |  Any defined outputs   |  `None` |
| <a id="tsup_build-kwargs"></a>kwargs |  Additional arguments to pass to the test.   |  none |


<a id="vitest_test"></a>

## vitest_test

<pre>
vitest_test(<a href="#vitest_test-name">name</a>, <a href="#vitest_test-config">config</a>, <a href="#vitest_test-data">data</a>, <a href="#vitest_test-node_modules">node_modules</a>, <a href="#vitest_test-kwargs">kwargs</a>)
</pre>

Run a vite test.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="vitest_test-name"></a>name |  The name of the test.   |  none |
| <a id="vitest_test-config"></a>config |  The vite config target.   |  none |
| <a id="vitest_test-data"></a>data |  The list of data dependencies.   |  `[]` |
| <a id="vitest_test-node_modules"></a>node_modules |  The node_modules target.   |  `"//:node_modules"` |
| <a id="vitest_test-kwargs"></a>kwargs |  Additional arguments to pass to the test.   |  none |



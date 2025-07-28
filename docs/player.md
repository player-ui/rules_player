<!-- Generated with Stardoc: http://skydoc.bazel.build -->

Public API for player Bazel rules.

<a id="create_base_config"></a>

## create_base_config

<pre>
load("@rules_player//player:defs.bzl", "create_base_config")

create_base_config(<a href="#create_base_config-name">name</a>, <a href="#create_base_config-plugins">plugins</a>, <a href="#create_base_config-presets">presets</a>)
</pre>



**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="create_base_config-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="create_base_config-plugins"></a>plugins |  -   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |
| <a id="create_base_config-presets"></a>presets |  -   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |


<a id="generate_mocks_manifest"></a>

## generate_mocks_manifest

<pre>
load("@rules_player//player:defs.bzl", "generate_mocks_manifest")

generate_mocks_manifest(<a href="#generate_mocks_manifest-name">name</a>, <a href="#generate_mocks_manifest-mocks">mocks</a>)
</pre>



**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="generate_mocks_manifest-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="generate_mocks_manifest-mocks"></a>mocks |  -   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |


<a id="compile"></a>

## compile

<pre>
load("@rules_player//player:defs.bzl", "compile")

compile(<a href="#compile-name">name</a>, <a href="#compile-node_modules">node_modules</a>, <a href="#compile-srcs">srcs</a>, <a href="#compile-input_dir">input_dir</a>, <a href="#compile-output_dir">output_dir</a>, <a href="#compile-data">data</a>, <a href="#compile-config">config</a>, <a href="#compile-skip_test">skip_test</a>, <a href="#compile-schema_name">schema_name</a>,
        <a href="#compile-kwargs">**kwargs</a>)
</pre>

Run the src or src_dir through the player compiler.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="compile-name"></a>name |  The name of the target.   |  none |
| <a id="compile-node_modules"></a>node_modules |  The node_modules target to use.   |  `"//:node_modules"` |
| <a id="compile-srcs"></a>srcs |  The source files to compile.   |  `None` |
| <a id="compile-input_dir"></a>input_dir |  The directory that contains the source files.   |  `"src"` |
| <a id="compile-output_dir"></a>output_dir |  The name of the directory to write to   |  `None` |
| <a id="compile-data"></a>data |  Additional data to pass to the compiler   |  `[]` |
| <a id="compile-config"></a>config |  A config override to use   |  `None` |
| <a id="compile-skip_test"></a>skip_test |  Flag to skip generating the *_test target   |  `False` |
| <a id="compile-schema_name"></a>schema_name |  Name of the file containing the schema, defaults to "schema.ts"   |  `"schema.ts"` |
| <a id="compile-kwargs"></a>kwargs |  Additonal args to pass to the js_run_binary cmd   |  none |


<a id="compile_mocks"></a>

## compile_mocks

<pre>
load("@rules_player//player:defs.bzl", "compile_mocks")

compile_mocks(<a href="#compile_mocks-mock_dirs">mock_dirs</a>, <a href="#compile_mocks-dsl_config">dsl_config</a>, <a href="#compile_mocks-data">data</a>, <a href="#compile_mocks-name">name</a>)
</pre>

Compiles all DSL mocks in a directory.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="compile_mocks-mock_dirs"></a>mock_dirs |  top level folders to compile mocks for.   |  none |
| <a id="compile_mocks-dsl_config"></a>dsl_config |  The DSL config file that should be used for compilation.   |  none |
| <a id="compile_mocks-data"></a>data |  Any additional packages that are needed for compilation.   |  none |
| <a id="compile_mocks-name"></a>name |  target name (optional, defaults to mocks)   |  `"mocks"` |


<a id="dsl_compile"></a>

## dsl_compile

<pre>
load("@rules_player//player:defs.bzl", "dsl_compile")

dsl_compile(<a href="#dsl_compile-name">name</a>, <a href="#dsl_compile-node_modules">node_modules</a>, <a href="#dsl_compile-srcs">srcs</a>, <a href="#dsl_compile-input_dir">input_dir</a>, <a href="#dsl_compile-output_dir">output_dir</a>, <a href="#dsl_compile-data">data</a>, <a href="#dsl_compile-config">config</a>, <a href="#dsl_compile-skip_test">skip_test</a>, <a href="#dsl_compile-schema_name">schema_name</a>,
            <a href="#dsl_compile-kwargs">**kwargs</a>)
</pre>

Run the src or src_dir through the player compiler.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="dsl_compile-name"></a>name |  The name of the target.   |  none |
| <a id="dsl_compile-node_modules"></a>node_modules |  The node_modules target to use.   |  `"//:node_modules"` |
| <a id="dsl_compile-srcs"></a>srcs |  The source files to compile.   |  `None` |
| <a id="dsl_compile-input_dir"></a>input_dir |  The directory that contains the source files.   |  `"src"` |
| <a id="dsl_compile-output_dir"></a>output_dir |  The name of the directory to write to   |  `None` |
| <a id="dsl_compile-data"></a>data |  Additional data to pass to the compiler   |  `[]` |
| <a id="dsl_compile-config"></a>config |  A config override to use   |  `None` |
| <a id="dsl_compile-skip_test"></a>skip_test |  Flag to skip generating the *_test target   |  `False` |
| <a id="dsl_compile-schema_name"></a>schema_name |  Name of the file containing the schema, defaults to "schema.ts"   |  `"schema.ts"` |
| <a id="dsl_compile-kwargs"></a>kwargs |  Additonal args to pass to the js_run_binary cmd   |  none |


<a id="js_xlr_pipeline"></a>

## js_xlr_pipeline

<pre>
load("@rules_player//player:defs.bzl", "js_xlr_pipeline")

js_xlr_pipeline(<a href="#js_xlr_pipeline-name">name</a>, <a href="#js_xlr_pipeline-xlr_mode">xlr_mode</a>, <a href="#js_xlr_pipeline-xlr_input_dir">xlr_input_dir</a>, <a href="#js_xlr_pipeline-srcs">srcs</a>, <a href="#js_xlr_pipeline-kwargs">**kwargs</a>)
</pre>

A rule for compiling player flows with xlr mode.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="js_xlr_pipeline-name"></a>name |  The name of the target.   |  `None` |
| <a id="js_xlr_pipeline-xlr_mode"></a>xlr_mode |  The mode to use when compiling with XLR. Defaults to "plugin".   |  `"plugin"` |
| <a id="js_xlr_pipeline-xlr_input_dir"></a>xlr_input_dir |  The input directory to generate XLR from. Defaults to "src".   |  `"src"` |
| <a id="js_xlr_pipeline-srcs"></a>srcs |  An optional list of src files (Defaults to src/**)   |  `None` |
| <a id="js_xlr_pipeline-kwargs"></a>kwargs |  Additional args to pass to the js_pipeline macro   |  none |


<a id="xlr_compile"></a>

## xlr_compile

<pre>
load("@rules_player//player:defs.bzl", "xlr_compile")

xlr_compile(<a href="#xlr_compile-name">name</a>, <a href="#xlr_compile-node_modules">node_modules</a>, <a href="#xlr_compile-srcs">srcs</a>, <a href="#xlr_compile-data">data</a>, <a href="#xlr_compile-config">config</a>, <a href="#xlr_compile-input_dir">input_dir</a>, <a href="#xlr_compile-mode">mode</a>, <a href="#xlr_compile-kwargs">**kwargs</a>)
</pre>

    A rule for compiling files using XLR

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="xlr_compile-name"></a>name |  The name of the output target   |  none |
| <a id="xlr_compile-node_modules"></a>node_modules |  A pointer to the node_modules root   |  `"//:node_modules"` |
| <a id="xlr_compile-srcs"></a>srcs |  The list of source files to generate XLR from   |  `None` |
| <a id="xlr_compile-data"></a>data |  Additional data to use during compilation   |  `[]` |
| <a id="xlr_compile-config"></a>config |  An optional config file to pass to the Player CLI   |  `None` |
| <a id="xlr_compile-input_dir"></a>input_dir |  The root input directory to compile   |  `"src"` |
| <a id="xlr_compile-mode"></a>mode |  The XLR mode to use when compiling   |  `"plugin"` |
| <a id="xlr_compile-kwargs"></a>kwargs |  Additional arguments to use for running the binary   |  none |



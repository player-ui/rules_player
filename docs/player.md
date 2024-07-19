<!-- Generated with Stardoc: http://skydoc.bazel.build -->


Public API for player Bazel rules.


<a id="create_base_config"></a>

## create_base_config

<pre>
create_base_config(<a href="#create_base_config-name">name</a>, <a href="#create_base_config-plugins">plugins</a>, <a href="#create_base_config-presets">presets</a>)
</pre>



**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="create_base_config-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="create_base_config-plugins"></a>plugins |  -   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional | <code>[]</code> |
| <a id="create_base_config-presets"></a>presets |  -   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional | <code>[]</code> |


<a id="compile"></a>

## compile

<pre>
compile(<a href="#compile-name">name</a>, <a href="#compile-node_modules">node_modules</a>, <a href="#compile-srcs">srcs</a>, <a href="#compile-input_dir">input_dir</a>, <a href="#compile-output_dir">output_dir</a>, <a href="#compile-data">data</a>, <a href="#compile-config">config</a>, <a href="#compile-skip_test">skip_test</a>, <a href="#compile-kwargs">kwargs</a>)
</pre>

Run the src or src_dir through the player compiler.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="compile-name"></a>name |  The name of the target.   |  none |
| <a id="compile-node_modules"></a>node_modules |  The node_modules target to use.   |  <code>"//:node_modules"</code> |
| <a id="compile-srcs"></a>srcs |  The source files to compile.   |  <code>None</code> |
| <a id="compile-input_dir"></a>input_dir |  <p align="center"> - </p>   |  <code>"src"</code> |
| <a id="compile-output_dir"></a>output_dir |  <p align="center"> - </p>   |  <code>None</code> |
| <a id="compile-data"></a>data |  <p align="center"> - </p>   |  <code>[]</code> |
| <a id="compile-config"></a>config |  <p align="center"> - </p>   |  <code>None</code> |
| <a id="compile-skip_test"></a>skip_test |  <p align="center"> - </p>   |  <code>False</code> |
| <a id="compile-kwargs"></a>kwargs |  <p align="center"> - </p>   |  none |


<a id="dsl_compile"></a>

## dsl_compile

<pre>
dsl_compile(<a href="#dsl_compile-name">name</a>, <a href="#dsl_compile-node_modules">node_modules</a>, <a href="#dsl_compile-srcs">srcs</a>, <a href="#dsl_compile-input_dir">input_dir</a>, <a href="#dsl_compile-output_dir">output_dir</a>, <a href="#dsl_compile-data">data</a>, <a href="#dsl_compile-config">config</a>, <a href="#dsl_compile-skip_test">skip_test</a>, <a href="#dsl_compile-kwargs">kwargs</a>)
</pre>

Run the src or src_dir through the player compiler.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="dsl_compile-name"></a>name |  The name of the target.   |  none |
| <a id="dsl_compile-node_modules"></a>node_modules |  The node_modules target to use.   |  <code>"//:node_modules"</code> |
| <a id="dsl_compile-srcs"></a>srcs |  The source files to compile.   |  <code>None</code> |
| <a id="dsl_compile-input_dir"></a>input_dir |  <p align="center"> - </p>   |  <code>"src"</code> |
| <a id="dsl_compile-output_dir"></a>output_dir |  <p align="center"> - </p>   |  <code>None</code> |
| <a id="dsl_compile-data"></a>data |  <p align="center"> - </p>   |  <code>[]</code> |
| <a id="dsl_compile-config"></a>config |  <p align="center"> - </p>   |  <code>None</code> |
| <a id="dsl_compile-skip_test"></a>skip_test |  <p align="center"> - </p>   |  <code>False</code> |
| <a id="dsl_compile-kwargs"></a>kwargs |  <p align="center"> - </p>   |  none |


<a id="js_xlr_pipeline"></a>

## js_xlr_pipeline

<pre>
js_xlr_pipeline(<a href="#js_xlr_pipeline-name">name</a>, <a href="#js_xlr_pipeline-xlr_mode">xlr_mode</a>, <a href="#js_xlr_pipeline-xlr_input_dir">xlr_input_dir</a>, <a href="#js_xlr_pipeline-srcs">srcs</a>, <a href="#js_xlr_pipeline-kwargs">kwargs</a>)
</pre>

A rule for compiling player flows with xlr mode.

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="js_xlr_pipeline-name"></a>name |  The name of the target.   |  <code>None</code> |
| <a id="js_xlr_pipeline-xlr_mode"></a>xlr_mode |  The mode to use when compiling with XLR. Defaults to "plugin".   |  <code>"plugin"</code> |
| <a id="js_xlr_pipeline-xlr_input_dir"></a>xlr_input_dir |  <p align="center"> - </p>   |  <code>"src"</code> |
| <a id="js_xlr_pipeline-srcs"></a>srcs |  <p align="center"> - </p>   |  <code>None</code> |
| <a id="js_xlr_pipeline-kwargs"></a>kwargs |  <p align="center"> - </p>   |  none |


<a id="xlr_compile"></a>

## xlr_compile

<pre>
xlr_compile(<a href="#xlr_compile-name">name</a>, <a href="#xlr_compile-node_modules">node_modules</a>, <a href="#xlr_compile-srcs">srcs</a>, <a href="#xlr_compile-data">data</a>, <a href="#xlr_compile-config">config</a>, <a href="#xlr_compile-input_dir">input_dir</a>, <a href="#xlr_compile-mode">mode</a>, <a href="#xlr_compile-kwargs">kwargs</a>)
</pre>



**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="xlr_compile-name"></a>name |  <p align="center"> - </p>   |  none |
| <a id="xlr_compile-node_modules"></a>node_modules |  <p align="center"> - </p>   |  <code>"//:node_modules"</code> |
| <a id="xlr_compile-srcs"></a>srcs |  <p align="center"> - </p>   |  <code>None</code> |
| <a id="xlr_compile-data"></a>data |  <p align="center"> - </p>   |  <code>[]</code> |
| <a id="xlr_compile-config"></a>config |  <p align="center"> - </p>   |  <code>None</code> |
| <a id="xlr_compile-input_dir"></a>input_dir |  <p align="center"> - </p>   |  <code>"src"</code> |
| <a id="xlr_compile-mode"></a>mode |  <p align="center"> - </p>   |  <code>"plugin"</code> |
| <a id="xlr_compile-kwargs"></a>kwargs |  <p align="center"> - </p>   |  none |



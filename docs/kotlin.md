<!-- Generated with Stardoc: http://skydoc.bazel.build -->

Public API for Kotlin based project rules

<a id="distribution"></a>

## distribution

<pre>
distribution(<a href="#distribution-name">name</a>, <a href="#distribution-maven_coordinates">maven_coordinates</a>, <a href="#distribution-lib_name">lib_name</a>, <a href="#distribution-kwargs">kwargs</a>)
</pre>

Utility macro for deploying kotlin artifacts

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="distribution-name"></a>name |  The name of the export target   |  none |
| <a id="distribution-maven_coordinates"></a>maven_coordinates |  The maven location   |  none |
| <a id="distribution-lib_name"></a>lib_name |  The library name   |  `None` |
| <a id="distribution-kwargs"></a>kwargs |  Additional args to use for export   |  none |


<a id="kt_jvm"></a>

## kt_jvm

<pre>
kt_jvm(<a href="#kt_jvm-name">name</a>, <a href="#kt_jvm-lint_config">lint_config</a>, <a href="#kt_jvm-group">group</a>, <a href="#kt_jvm-version">version</a>, <a href="#kt_jvm-deploy_env">deploy_env</a>, <a href="#kt_jvm-excluded_workspaces">excluded_workspaces</a>, <a href="#kt_jvm-pom_template">pom_template</a>,
       <a href="#kt_jvm-module_name">module_name</a>, <a href="#kt_jvm-main_opts">main_opts</a>, <a href="#kt_jvm-main_srcs">main_srcs</a>, <a href="#kt_jvm-main_resources">main_resources</a>, <a href="#kt_jvm-main_resource_jars">main_resource_jars</a>,
       <a href="#kt_jvm-main_resource_strip_prefix">main_resource_strip_prefix</a>, <a href="#kt_jvm-main_associates">main_associates</a>, <a href="#kt_jvm-main_deps">main_deps</a>, <a href="#kt_jvm-main_exports">main_exports</a>, <a href="#kt_jvm-main_runtime_deps">main_runtime_deps</a>,
       <a href="#kt_jvm-test_package">test_package</a>, <a href="#kt_jvm-test_opts">test_opts</a>, <a href="#kt_jvm-test_srcs">test_srcs</a>, <a href="#kt_jvm-test_resources">test_resources</a>, <a href="#kt_jvm-test_resource_jars">test_resource_jars</a>,
       <a href="#kt_jvm-test_resource_strip_prefix">test_resource_strip_prefix</a>, <a href="#kt_jvm-test_associates">test_associates</a>, <a href="#kt_jvm-test_deps">test_deps</a>, <a href="#kt_jvm-test_runtime_deps">test_runtime_deps</a>)
</pre>

Generic Kotlin JVM macro for conditionally configuring build & test targets, linting, and publishing.

# Building + Testing

Most kt_jvm_library parameters can be forwarded for either the main or test
set by prefixing the paremeter with `main` or `test`, i.e. `main_srcs`, `test_deps`

If `srcs` or `resources` are undefined, they will default to globbing the
files grouped under Maven convention, i.e. `src/main/kotlin` and `src/main/resources`

# Linting

If a `lint_config` target it provided, a lint test and lint fix target will be
generated.

# Publishing

Distribution requires a group and version to use for Maven coordinates.

If either of these properties are provided, publishing targets will be attempted to be
created, but will error out if any of the other required properties are missing.

Three targets are created for publishing:
- {name}-assemble: Package artifact and generate POM
- {name}-deploy: Executable target for actually deploying to a Maven repo
- {name}-install: Exectuable target to locally install the artifacts


**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="kt_jvm-name"></a>name |  used for the underlying `kt_jvm_library` rule   |  none |
| <a id="kt_jvm-lint_config"></a>lint_config |  project level KtLint config   |  `None` |
| <a id="kt_jvm-group"></a>group |  (optional) group identifier for publishing   |  `None` |
| <a id="kt_jvm-version"></a>version |  (optional) version to publish under   |  `None` |
| <a id="kt_jvm-deploy_env"></a>deploy_env |  (optional) collection of targets to exclude from transitive closure   |  `None` |
| <a id="kt_jvm-excluded_workspaces"></a>excluded_workspaces |  (optional) dict of workspace names to replace, or remove, from transitive closure   |  `None` |
| <a id="kt_jvm-pom_template"></a>pom_template |  (optional) file override to use while generating the pom file   |  `None` |
| <a id="kt_jvm-module_name"></a>module_name |  (optional) Kotlin module name   |  `None` |
| <a id="kt_jvm-main_opts"></a>main_opts |  (optional) Kotlin compiler options used to compile the main source set   |  `None` |
| <a id="kt_jvm-main_srcs"></a>main_srcs |  (optional) main source set -- defaults to `glob(["src/main/kotlin/**/*.kt"])`   |  `None` |
| <a id="kt_jvm-main_resources"></a>main_resources |  (optional) main resources -- defaults to `glob(["src/main/resources/**/*"])`   |  `None` |
| <a id="kt_jvm-main_resource_jars"></a>main_resource_jars |  (optional) additional resource JARs for the main sources   |  `None` |
| <a id="kt_jvm-main_resource_strip_prefix"></a>main_resource_strip_prefix |  (optional) remove prefix from resources   |  `None` |
| <a id="kt_jvm-main_associates"></a>main_associates |  (optional) Kotlin module dependencies to treat as associates of the same module   |  `None` |
| <a id="kt_jvm-main_deps"></a>main_deps |  (optional) dependencies of the main source set   |  `None` |
| <a id="kt_jvm-main_exports"></a>main_exports |  (optional) dependencies that should be exported as apart of this module   |  `None` |
| <a id="kt_jvm-main_runtime_deps"></a>main_runtime_deps |  (optional) depencies of the main source set that are provided at runtime   |  `None` |
| <a id="kt_jvm-test_package"></a>test_package |  (required if test sources are provided) package containing tests   |  `None` |
| <a id="kt_jvm-test_opts"></a>test_opts |  (optional) Kotlin compiler options used to compile the test source set   |  `None` |
| <a id="kt_jvm-test_srcs"></a>test_srcs |  (optional) test source set -- defaults to `glob(["src/test/kotlin/**/*.kt"])`   |  `None` |
| <a id="kt_jvm-test_resources"></a>test_resources |  (optional) main resources -- defaults to `glob(["src/test/resources/**/*"])`   |  `None` |
| <a id="kt_jvm-test_resource_jars"></a>test_resource_jars |  (optional) additional resource JARs for the test sources   |  `None` |
| <a id="kt_jvm-test_resource_strip_prefix"></a>test_resource_strip_prefix |  (optional) remove prefix from resources   |  `None` |
| <a id="kt_jvm-test_associates"></a>test_associates |  (optional) Kotlin module dependencies to treat as associates of the same module   |  `None` |
| <a id="kt_jvm-test_deps"></a>test_deps |  (optional) dependencies of the test source set   |  `None` |
| <a id="kt_jvm-test_runtime_deps"></a>test_runtime_deps |  (optional) depencies of the test source set that are provided at runtime   |  `None` |


<a id="kt_jvm_junit5_test"></a>

## kt_jvm_junit5_test

<pre>
kt_jvm_junit5_test(<a href="#kt_jvm_junit5_test-name">name</a>, <a href="#kt_jvm_junit5_test-srcs">srcs</a>, <a href="#kt_jvm_junit5_test-test_package">test_package</a>, <a href="#kt_jvm_junit5_test-deps">deps</a>, <a href="#kt_jvm_junit5_test-runtime_deps">runtime_deps</a>, <a href="#kt_jvm_junit5_test-kwargs">kwargs</a>)
</pre>

Generate a *_test target for running kotlin tests using junit5

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="kt_jvm_junit5_test-name"></a>name |  The name of the target to generate   |  none |
| <a id="kt_jvm_junit5_test-srcs"></a>srcs |  The list of input sources needed to test   |  none |
| <a id="kt_jvm_junit5_test-test_package"></a>test_package |  The name of the test package to execute   |  none |
| <a id="kt_jvm_junit5_test-deps"></a>deps |  Dependencies needed for library to test   |  `[]` |
| <a id="kt_jvm_junit5_test-runtime_deps"></a>runtime_deps |  Runtime dependencies to use while testing   |  `[]` |
| <a id="kt_jvm_junit5_test-kwargs"></a>kwargs |  Additional arguments to pass to kt_jvm_test   |  none |


<a id="lint"></a>

## lint

<pre>
lint(<a href="#lint-name">name</a>, <a href="#lint-srcs">srcs</a>, <a href="#lint-lint_config">lint_config</a>)
</pre>



**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="lint-name"></a>name |  <p align="center"> - </p>   |  none |
| <a id="lint-srcs"></a>srcs |  <p align="center"> - </p>   |  none |
| <a id="lint-lint_config"></a>lint_config |  <p align="center"> - </p>   |  none |



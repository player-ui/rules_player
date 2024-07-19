<!-- Generated with Stardoc: http://skydoc.bazel.build -->


Public API for Common iOS utils


<a id="ios_publish"></a>

## ios_publish

<pre>
ios_publish(<a href="#ios_publish-name">name</a>, <a href="#ios_publish-executable">executable</a>, <a href="#ios_publish-globalFlags">globalFlags</a>, <a href="#ios_publish-podspec">podspec</a>, <a href="#ios_publish-pushFlags">pushFlags</a>, <a href="#ios_publish-repository">repository</a>, <a href="#ios_publish-specsRepository">specsRepository</a>, <a href="#ios_publish-stamp">stamp</a>,
            <a href="#ios_publish-target_branch">target_branch</a>, <a href="#ios_publish-zip">zip</a>)
</pre>



**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="ios_publish-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="ios_publish-executable"></a>executable |  The command to use for cocoapods   | String | optional | <code>"pod"</code> |
| <a id="ios_publish-globalFlags"></a>globalFlags |  Flags to append to all pod commands   | List of strings | optional | <code>[]</code> |
| <a id="ios_publish-podspec"></a>podspec |  The podspec to push to a specs repo   | <a href="https://bazel.build/concepts/labels">Label</a> | required |  |
| <a id="ios_publish-pushFlags"></a>pushFlags |  Flags to append to the push command   | List of strings | optional | <code>[]</code> |
| <a id="ios_publish-repository"></a>repository |  The git repository to publish zip contents to   | String | optional | <code>""</code> |
| <a id="ios_publish-specsRepository"></a>specsRepository |  A private specs repository to push to. Otherwise pushes to trunk   | String | optional | <code>""</code> |
| <a id="ios_publish-stamp"></a>stamp |  Whether to encode build information into the output. Possible values:<br><br>    - <code>stamp = 1</code>: Always stamp the build information into the output, even in         [--nostamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) builds.         This setting should be avoided, since it is non-deterministic.         It potentially causes remote cache misses for the target and         any downstream actions that depend on the result.     - <code>stamp = 0</code>: Never stamp, instead replace build information by constant values.         This gives good build result caching.     - <code>stamp = -1</code>: Embedding of build information is controlled by the         [--[no]stamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) flag.         Stamped targets are not rebuilt unless their dependencies change.   | Integer | optional | <code>-1</code> |
| <a id="ios_publish-target_branch"></a>target_branch |  The branch to use for stable releases   | String | optional | <code>"main"</code> |
| <a id="ios_publish-zip"></a>zip |  The zip to publish the contents of   | <a href="https://bazel.build/concepts/labels">Label</a> | optional | <code>None</code> |


<a id="spm_publish"></a>

## spm_publish

<pre>
spm_publish(<a href="#spm_publish-name">name</a>, <a href="#spm_publish-repository">repository</a>, <a href="#spm_publish-stamp">stamp</a>, <a href="#spm_publish-target_branch">target_branch</a>, <a href="#spm_publish-zip">zip</a>)
</pre>



**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="spm_publish-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="spm_publish-repository"></a>repository |  The git repository to publish spm zip contents to   | String | optional | <code>""</code> |
| <a id="spm_publish-stamp"></a>stamp |  Whether to encode build information into the output. Possible values:<br><br>    - <code>stamp = 1</code>: Always stamp the build information into the output, even in         [--nostamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) builds.         This setting should be avoided, since it is non-deterministic.         It potentially causes remote cache misses for the target and         any downstream actions that depend on the result.     - <code>stamp = 0</code>: Never stamp, instead replace build information by constant values.         This gives good build result caching.     - <code>stamp = -1</code>: Embedding of build information is controlled by the         [--[no]stamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) flag.         Stamped targets are not rebuilt unless their dependencies change.   | Integer | optional | <code>-1</code> |
| <a id="spm_publish-target_branch"></a>target_branch |  The branch to use for stable releases   | String | optional | <code>"main"</code> |
| <a id="spm_publish-zip"></a>zip |  The zip to publish the contents of   | <a href="https://bazel.build/concepts/labels">Label</a> | optional | <code>None</code> |


<a id="swift_library"></a>

## swift_library

<pre>
swift_library(<a href="#swift_library-name">name</a>, <a href="#swift_library-always_include_developer_search_paths">always_include_developer_search_paths</a>, <a href="#swift_library-alwayslink">alwayslink</a>, <a href="#swift_library-copts">copts</a>, <a href="#swift_library-data">data</a>, <a href="#swift_library-defines">defines</a>, <a href="#swift_library-deps">deps</a>,
              <a href="#swift_library-generated_header_name">generated_header_name</a>, <a href="#swift_library-generates_header">generates_header</a>, <a href="#swift_library-linkopts">linkopts</a>, <a href="#swift_library-linkstatic">linkstatic</a>, <a href="#swift_library-module_name">module_name</a>,
              <a href="#swift_library-package_name">package_name</a>, <a href="#swift_library-plugins">plugins</a>, <a href="#swift_library-private_deps">private_deps</a>, <a href="#swift_library-srcs">srcs</a>, <a href="#swift_library-swiftc_inputs">swiftc_inputs</a>)
</pre>

Compiles and links Swift code into a static library and Swift module.


**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="swift_library-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="swift_library-always_include_developer_search_paths"></a>always_include_developer_search_paths |  If <code>True</code>, the developer framework search paths will be added to the compilation command. This enables a Swift module to access <code>XCTest</code> without having to mark the target as <code>testonly = True</code>.   | Boolean | optional | <code>False</code> |
| <a id="swift_library-alwayslink"></a>alwayslink |  If true, any binary that depends (directly or indirectly) on this Swift module will link in all the object files for the files listed in <code>srcs</code>, even if some contain no symbols referenced by the binary. This is useful if your code isn't explicitly called by code in the binary; for example, if you rely on runtime checks for protocol conformances added in extensions in the library but do not directly reference any other symbols in the object file that adds that conformance.   | Boolean | optional | <code>False</code> |
| <a id="swift_library-copts"></a>copts |  Additional compiler options that should be passed to <code>swiftc</code>. These strings are subject to <code>$(location ...)</code> and ["Make" variable](https://docs.bazel.build/versions/master/be/make-variables.html) expansion.   | List of strings | optional | <code>[]</code> |
| <a id="swift_library-data"></a>data |  The list of files needed by this target at runtime.<br><br>Files and targets named in the <code>data</code> attribute will appear in the <code>*.runfiles</code> area of this target, if it has one. This may include data files needed by a binary or library, or other programs needed by it.   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional | <code>[]</code> |
| <a id="swift_library-defines"></a>defines |  A list of defines to add to the compilation command line.<br><br>Note that unlike C-family languages, Swift defines do not have values; they are simply identifiers that are either defined or undefined. So strings in this list should be simple identifiers, **not** <code>name=value</code> pairs.<br><br>Each string is prepended with <code>-D</code> and added to the command line. Unlike <code>copts</code>, these flags are added for the target and every target that depends on it, so use this attribute with caution. It is preferred that you add defines directly to <code>copts</code>, only using this feature in the rare case that a library needs to propagate a symbol up to those that depend on it.   | List of strings | optional | <code>[]</code> |
| <a id="swift_library-deps"></a>deps |  A list of targets that are dependencies of the target being built, which will be linked into that target.<br><br>If the Swift toolchain supports implementation-only imports (<code>private_deps</code> on <code>swift_library</code>), then targets in <code>deps</code> are treated as regular (non-implementation-only) imports that are propagated both to their direct and indirect (transitive) dependents.<br><br>Allowed kinds of dependencies are:<br><br>*   <code>swift_c_module</code>, <code>swift_import</code> and <code>swift_library</code> (or anything     propagating <code>SwiftInfo</code>)<br><br>*   <code>cc_library</code> (or anything propagating <code>CcInfo</code>)<br><br>Additionally, on platforms that support Objective-C interop, <code>objc_library</code> targets (or anything propagating the <code>apple_common.Objc</code> provider) are allowed as dependencies. On platforms that do not support Objective-C interop (such as Linux), those dependencies will be **ignored.**   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional | <code>[]</code> |
| <a id="swift_library-generated_header_name"></a>generated_header_name |  The name of the generated Objective-C interface header. This name must end with a <code>.h</code> extension and cannot contain any path separators.<br><br>If this attribute is not specified, then the default behavior is to name the header <code>${target_name}-Swift.h</code>.<br><br>This attribute is ignored if the toolchain does not support generating headers.   | String | optional | <code>""</code> |
| <a id="swift_library-generates_header"></a>generates_header |  If True, an Objective-C header will be generated for this target, in the same build package where the target is defined. By default, the name of the header is <code>${target_name}-Swift.h</code>; this can be changed using the <code>generated_header_name</code> attribute.<br><br>Targets should only set this attribute to True if they export Objective-C APIs. A header generated for a target that does not export Objective-C APIs will be effectively empty (except for a large amount of prologue and epilogue code) and this is generally wasteful because the extra file needs to be propagated in the build graph and, when explicit modules are enabled, extra actions must be executed to compile the Objective-C module for the generated header.   | Boolean | optional | <code>False</code> |
| <a id="swift_library-linkopts"></a>linkopts |  Additional linker options that should be passed to the linker for the binary that depends on this target. These strings are subject to <code>$(location ...)</code> and ["Make" variable](https://docs.bazel.build/versions/master/be/make-variables.html) expansion.   | List of strings | optional | <code>[]</code> |
| <a id="swift_library-linkstatic"></a>linkstatic |  If True, the Swift module will be built for static linking.  This will make all interfaces internal to the module that is being linked against and will inform the consuming module that the objects will be locally available (which may potentially avoid a PLT relocation).  Set to <code>False</code> to build a <code>.so</code> or <code>.dll</code>.   | Boolean | optional | <code>True</code> |
| <a id="swift_library-module_name"></a>module_name |  The name of the Swift module being built.<br><br>If left unspecified, the module name will be computed based on the target's build label, by stripping the leading <code>//</code> and replacing <code>/</code>, <code>:</code>, and other non-identifier characters with underscores.   | String | optional | <code>""</code> |
| <a id="swift_library-package_name"></a>package_name |  The semantic package of the Swift target being built. Targets with the same package_name can access APIs using the 'package' access control modifier in Swift 5.9+.   | String | optional | <code>""</code> |
| <a id="swift_library-plugins"></a>plugins |  A list of <code>swift_compiler_plugin</code> targets that should be loaded by the compiler when compiling this module and any modules that directly depend on it.   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional | <code>[]</code> |
| <a id="swift_library-private_deps"></a>private_deps |  A list of targets that are implementation-only dependencies of the target being built. Libraries/linker flags from these dependencies will be propagated to dependent for linking, but artifacts/flags required for compilation (such as .swiftmodule files, C headers, and search paths) will not be propagated.<br><br>Allowed kinds of dependencies are:<br><br>*   <code>swift_c_module</code>, <code>swift_import</code> and <code>swift_library</code> (or anything     propagating <code>SwiftInfo</code>)<br><br>*   <code>cc_library</code> (or anything propagating <code>CcInfo</code>)<br><br>Additionally, on platforms that support Objective-C interop, <code>objc_library</code> targets (or anything propagating the <code>apple_common.Objc</code> provider) are allowed as dependencies. On platforms that do not support Objective-C interop (such as Linux), those dependencies will be **ignored.**   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional | <code>[]</code> |
| <a id="swift_library-srcs"></a>srcs |  A list of <code>.swift</code> source files that will be compiled into the library.   | <a href="https://bazel.build/concepts/labels">List of labels</a> | required |  |
| <a id="swift_library-swiftc_inputs"></a>swiftc_inputs |  Additional files that are referenced using <code>$(location ...)</code> in attributes that support location expansion.   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional | <code>[]</code> |


<a id="assemble_pod"></a>

## assemble_pod

<pre>
assemble_pod(<a href="#assemble_pod-name">name</a>, <a href="#assemble_pod-podspec">podspec</a>, <a href="#assemble_pod-srcs">srcs</a>, <a href="#assemble_pod-data">data</a>)
</pre>



**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="assemble_pod-name"></a>name |  <p align="center"> - </p>   |  none |
| <a id="assemble_pod-podspec"></a>podspec |  <p align="center"> - </p>   |  <code>""</code> |
| <a id="assemble_pod-srcs"></a>srcs |  <p align="center"> - </p>   |  <code>[]</code> |
| <a id="assemble_pod-data"></a>data |  <p align="center"> - </p>   |  <code>{}</code> |


<a id="ios_pipeline"></a>

## ios_pipeline

<pre>
ios_pipeline(<a href="#ios_pipeline-name">name</a>, <a href="#ios_pipeline-resources">resources</a>, <a href="#ios_pipeline-deps">deps</a>, <a href="#ios_pipeline-test_deps">test_deps</a>, <a href="#ios_pipeline-hasUnitTests">hasUnitTests</a>, <a href="#ios_pipeline-hasViewInspectorTests">hasViewInspectorTests</a>, <a href="#ios_pipeline-test_host">test_host</a>,
             <a href="#ios_pipeline-hasUITests">hasUITests</a>, <a href="#ios_pipeline-needsXCTest">needsXCTest</a>, <a href="#ios_pipeline-bundle_name">bundle_name</a>)
</pre>

Packages source files, creates swift library and tests for a swift PlayerUI plugin

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="ios_pipeline-name"></a>name |  The base name of this package Targets created by this macro prefix the name with 'PlayerUI'   |  none |
| <a id="ios_pipeline-resources"></a>resources |  Any resources to include in a resource bundle This will create a Bundle.module shim as well automatically   |  none |
| <a id="ios_pipeline-deps"></a>deps |  Dependencies for the plugin   |  none |
| <a id="ios_pipeline-test_deps"></a>test_deps |  Dependencies for the tests of this plugin   |  none |
| <a id="ios_pipeline-hasUnitTests"></a>hasUnitTests |  Whether or not to generate ios_unit_test tests   |  none |
| <a id="ios_pipeline-hasViewInspectorTests"></a>hasViewInspectorTests |  Whether or not to generate ios_ui_test tests that require ViewInspector   |  none |
| <a id="ios_pipeline-test_host"></a>test_host |  The target where the tests should run (Demo app target)   |  none |
| <a id="ios_pipeline-hasUITests"></a>hasUITests |  Whether or not to generate ios_ui_test tests   |  <code>False</code> |
| <a id="ios_pipeline-needsXCTest"></a>needsXCTest |  Set the 'testonly' attribute on swift_library   |  <code>False</code> |
| <a id="ios_pipeline-bundle_name"></a>bundle_name |  Pptionally override the name used for the resource bundle   |  <code>None</code> |



<!-- Generated with Stardoc: http://skydoc.bazel.build -->

Public API for Common iOS utils

<a id="ios_publish"></a>

## ios_publish

<pre>
load("@rules_player//ios:defs.bzl", "ios_publish")

ios_publish(<a href="#ios_publish-name">name</a>, <a href="#ios_publish-executable">executable</a>, <a href="#ios_publish-globalFlags">globalFlags</a>, <a href="#ios_publish-podspec">podspec</a>, <a href="#ios_publish-pushFlags">pushFlags</a>, <a href="#ios_publish-repository">repository</a>, <a href="#ios_publish-specsRepository">specsRepository</a>, <a href="#ios_publish-stamp">stamp</a>,
            <a href="#ios_publish-target_branch">target_branch</a>, <a href="#ios_publish-zip">zip</a>)
</pre>



**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="ios_publish-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="ios_publish-executable"></a>executable |  The command to use for cocoapods   | String | optional |  `"pod"`  |
| <a id="ios_publish-globalFlags"></a>globalFlags |  Flags to append to all pod commands   | List of strings | optional |  `[]`  |
| <a id="ios_publish-podspec"></a>podspec |  The podspec to push to a specs repo   | <a href="https://bazel.build/concepts/labels">Label</a> | required |  |
| <a id="ios_publish-pushFlags"></a>pushFlags |  Flags to append to the push command   | List of strings | optional |  `[]`  |
| <a id="ios_publish-repository"></a>repository |  The git repository to publish zip contents to   | String | optional |  `""`  |
| <a id="ios_publish-specsRepository"></a>specsRepository |  A private specs repository to push to. Otherwise pushes to trunk   | String | optional |  `""`  |
| <a id="ios_publish-stamp"></a>stamp |  Whether to encode build information into the output. Possible values:<br><br>- `stamp = 1`: Always stamp the build information into the output, even in     [--nostamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) builds.     This setting should be avoided, since it is non-deterministic.     It potentially causes remote cache misses for the target and     any downstream actions that depend on the result. - `stamp = 0`: Never stamp, instead replace build information by constant values.     This gives good build result caching. - `stamp = -1`: Embedding of build information is controlled by the     [--[no]stamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) flag.     Stamped targets are not rebuilt unless their dependencies change.   | Integer | optional |  `-1`  |
| <a id="ios_publish-target_branch"></a>target_branch |  The branch to use for stable releases   | String | optional |  `"main"`  |
| <a id="ios_publish-zip"></a>zip |  The zip to publish the contents of   | <a href="https://bazel.build/concepts/labels">Label</a> | optional |  `None`  |


<a id="spm_publish"></a>

## spm_publish

<pre>
load("@rules_player//ios:defs.bzl", "spm_publish")

spm_publish(<a href="#spm_publish-name">name</a>, <a href="#spm_publish-repository">repository</a>, <a href="#spm_publish-stamp">stamp</a>, <a href="#spm_publish-target_branch">target_branch</a>, <a href="#spm_publish-zip">zip</a>)
</pre>



**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="spm_publish-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="spm_publish-repository"></a>repository |  The git repository to publish spm zip contents to   | String | optional |  `""`  |
| <a id="spm_publish-stamp"></a>stamp |  Whether to encode build information into the output. Possible values:<br><br>- `stamp = 1`: Always stamp the build information into the output, even in     [--nostamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) builds.     This setting should be avoided, since it is non-deterministic.     It potentially causes remote cache misses for the target and     any downstream actions that depend on the result. - `stamp = 0`: Never stamp, instead replace build information by constant values.     This gives good build result caching. - `stamp = -1`: Embedding of build information is controlled by the     [--[no]stamp](https://docs.bazel.build/versions/main/user-manual.html#flag--stamp) flag.     Stamped targets are not rebuilt unless their dependencies change.   | Integer | optional |  `-1`  |
| <a id="spm_publish-target_branch"></a>target_branch |  The branch to use for stable releases   | String | optional |  `"main"`  |
| <a id="spm_publish-zip"></a>zip |  The zip to publish the contents of   | <a href="https://bazel.build/concepts/labels">Label</a> | optional |  `None`  |


<a id="swift_library"></a>

## swift_library

<pre>
load("@rules_player//ios:defs.bzl", "swift_library")

swift_library(<a href="#swift_library-name">name</a>, <a href="#swift_library-deps">deps</a>, <a href="#swift_library-srcs">srcs</a>, <a href="#swift_library-data">data</a>, <a href="#swift_library-always_include_developer_search_paths">always_include_developer_search_paths</a>, <a href="#swift_library-alwayslink">alwayslink</a>, <a href="#swift_library-copts">copts</a>,
              <a href="#swift_library-defines">defines</a>, <a href="#swift_library-generated_header_name">generated_header_name</a>, <a href="#swift_library-generates_header">generates_header</a>, <a href="#swift_library-library_evolution">library_evolution</a>, <a href="#swift_library-linkopts">linkopts</a>,
              <a href="#swift_library-linkstatic">linkstatic</a>, <a href="#swift_library-module_name">module_name</a>, <a href="#swift_library-package_name">package_name</a>, <a href="#swift_library-plugins">plugins</a>, <a href="#swift_library-private_deps">private_deps</a>, <a href="#swift_library-swiftc_inputs">swiftc_inputs</a>)
</pre>

Compiles and links Swift code into a static library and Swift module.

**ATTRIBUTES**


| Name  | Description | Type | Mandatory | Default |
| :------------- | :------------- | :------------- | :------------- | :------------- |
| <a id="swift_library-name"></a>name |  A unique name for this target.   | <a href="https://bazel.build/concepts/labels#target-names">Name</a> | required |  |
| <a id="swift_library-deps"></a>deps |  A list of targets that are dependencies of the target being built, which will be linked into that target.<br><br>If the Swift toolchain supports implementation-only imports (`private_deps` on `swift_library`), then targets in `deps` are treated as regular (non-implementation-only) imports that are propagated both to their direct and indirect (transitive) dependents.<br><br>Allowed kinds of dependencies are:<br><br>*   `swift_library` (or anything propagating `SwiftInfo`)<br><br>*   `cc_library` (or anything propagating `CcInfo`)<br><br>Additionally, on platforms that support Objective-C interop, `objc_library` targets (or anything propagating the `apple_common.Objc` provider) are allowed as dependencies. On platforms that do not support Objective-C interop (such as Linux), those dependencies will be **ignored.**   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |
| <a id="swift_library-srcs"></a>srcs |  A list of `.swift` source files that will be compiled into the library.   | <a href="https://bazel.build/concepts/labels">List of labels</a> | required |  |
| <a id="swift_library-data"></a>data |  The list of files needed by this target at runtime.<br><br>Files and targets named in the `data` attribute will appear in the `*.runfiles` area of this target, if it has one. This may include data files needed by a binary or library, or other programs needed by it.   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |
| <a id="swift_library-always_include_developer_search_paths"></a>always_include_developer_search_paths |  If `True`, the developer framework search paths will be added to the compilation command. This enables a Swift module to access `XCTest` without having to mark the target as `testonly = True`.   | Boolean | optional |  `False`  |
| <a id="swift_library-alwayslink"></a>alwayslink |  If true, any binary that depends (directly or indirectly) on this Swift module will link in all the object files for the files listed in `srcs`, even if some contain no symbols referenced by the binary. This is useful if your code isn't explicitly called by code in the binary; for example, if you rely on runtime checks for protocol conformances added in extensions in the library but do not directly reference any other symbols in the object file that adds that conformance.   | Boolean | optional |  `False`  |
| <a id="swift_library-copts"></a>copts |  Additional compiler options that should be passed to `swiftc`. These strings are subject to `$(location ...)` and ["Make" variable](https://docs.bazel.build/versions/master/be/make-variables.html) expansion.   | List of strings | optional |  `[]`  |
| <a id="swift_library-defines"></a>defines |  A list of defines to add to the compilation command line.<br><br>Note that unlike C-family languages, Swift defines do not have values; they are simply identifiers that are either defined or undefined. So strings in this list should be simple identifiers, **not** `name=value` pairs.<br><br>Each string is prepended with `-D` and added to the command line. Unlike `copts`, these flags are added for the target and every target that depends on it, so use this attribute with caution. It is preferred that you add defines directly to `copts`, only using this feature in the rare case that a library needs to propagate a symbol up to those that depend on it.   | List of strings | optional |  `[]`  |
| <a id="swift_library-generated_header_name"></a>generated_header_name |  The name of the generated Objective-C interface header. This name must end with a `.h` extension and cannot contain any path separators.<br><br>If this attribute is not specified, then the default behavior is to name the header `${target_name}-Swift.h`.<br><br>This attribute is ignored if the toolchain does not support generating headers.   | String | optional |  `""`  |
| <a id="swift_library-generates_header"></a>generates_header |  If True, an Objective-C header will be generated for this target, in the same build package where the target is defined. By default, the name of the header is `${target_name}-Swift.h`; this can be changed using the `generated_header_name` attribute.<br><br>Targets should only set this attribute to True if they export Objective-C APIs. A header generated for a target that does not export Objective-C APIs will be effectively empty (except for a large amount of prologue and epilogue code) and this is generally wasteful because the extra file needs to be propagated in the build graph and, when explicit modules are enabled, extra actions must be executed to compile the Objective-C module for the generated header.   | Boolean | optional |  `False`  |
| <a id="swift_library-library_evolution"></a>library_evolution |  Indicates whether the Swift code should be compiled with library evolution mode enabled.<br><br>This attribute should be used to compile a module that will be distributed as part of a client-facing (non-implementation-only) module in a library or framework that will be distributed for use outside of the Bazel build graph. Setting this to true will compile the module with the `-library-evolution` flag and emit a `.swiftinterface` file as one of the compilation outputs.   | Boolean | optional |  `False`  |
| <a id="swift_library-linkopts"></a>linkopts |  Additional linker options that should be passed to the linker for the binary that depends on this target. These strings are subject to `$(location ...)` and ["Make" variable](https://docs.bazel.build/versions/master/be/make-variables.html) expansion.   | List of strings | optional |  `[]`  |
| <a id="swift_library-linkstatic"></a>linkstatic |  If True, the Swift module will be built for static linking.  This will make all interfaces internal to the module that is being linked against and will inform the consuming module that the objects will be locally available (which may potentially avoid a PLT relocation).  Set to `False` to build a `.so` or `.dll`.   | Boolean | optional |  `True`  |
| <a id="swift_library-module_name"></a>module_name |  The name of the Swift module being built.<br><br>If left unspecified, the module name will be computed based on the target's build label, by stripping the leading `//` and replacing `/`, `:`, and other non-identifier characters with underscores.   | String | optional |  `""`  |
| <a id="swift_library-package_name"></a>package_name |  The semantic package of the Swift target being built. Targets with the same package_name can access APIs using the 'package' access control modifier in Swift 5.9+.   | String | optional |  `""`  |
| <a id="swift_library-plugins"></a>plugins |  A list of `swift_compiler_plugin` targets that should be loaded by the compiler when compiling this module and any modules that directly depend on it.   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |
| <a id="swift_library-private_deps"></a>private_deps |  A list of targets that are implementation-only dependencies of the target being built. Libraries/linker flags from these dependencies will be propagated to dependent for linking, but artifacts/flags required for compilation (such as .swiftmodule files, C headers, and search paths) will not be propagated.<br><br>Allowed kinds of dependencies are:<br><br>*   `swift_library` (or anything propagating `SwiftInfo`)<br><br>*   `cc_library` (or anything propagating `CcInfo`)<br><br>Additionally, on platforms that support Objective-C interop, `objc_library` targets (or anything propagating the `apple_common.Objc` provider) are allowed as dependencies. On platforms that do not support Objective-C interop (such as Linux), those dependencies will be **ignored.**   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |
| <a id="swift_library-swiftc_inputs"></a>swiftc_inputs |  Additional files that are referenced using `$(location ...)` in attributes that support location expansion.   | <a href="https://bazel.build/concepts/labels">List of labels</a> | optional |  `[]`  |


<a id="assemble_pod"></a>

## assemble_pod

<pre>
load("@rules_player//ios:defs.bzl", "assemble_pod")

assemble_pod(<a href="#assemble_pod-name">name</a>, <a href="#assemble_pod-podspec">podspec</a>, <a href="#assemble_pod-srcs">srcs</a>, <a href="#assemble_pod-data">data</a>)
</pre>

Assemble a zip file for a podspec and related sources

**PARAMETERS**


| Name  | Description | Default Value |
| :------------- | :------------- | :------------- |
| <a id="assemble_pod-name"></a>name |  Name of the target   |  none |
| <a id="assemble_pod-podspec"></a>podspec |  The podspec file   |  `""` |
| <a id="assemble_pod-srcs"></a>srcs |  Source files for the pod   |  `[]` |
| <a id="assemble_pod-data"></a>data |  Other dependencies   |  `{}` |


<a id="ios_pipeline"></a>

## ios_pipeline

<pre>
load("@rules_player//ios:defs.bzl", "ios_pipeline")

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
| <a id="ios_pipeline-hasUITests"></a>hasUITests |  Whether or not to generate ios_ui_test tests   |  `False` |
| <a id="ios_pipeline-needsXCTest"></a>needsXCTest |  Set the 'testonly' attribute on swift_library   |  `False` |
| <a id="ios_pipeline-bundle_name"></a>bundle_name |  Pptionally override the name used for the resource bundle   |  `None` |



"""
Macro implementation for building, testing, and deploying Android Kotlin code
"""

load(":distribution.bzl", "distribution")
load(":kt_android_library_and_test.bzl", "kt_android_library_and_test")
load(":lint.bzl", "lint")

def kt_android(
        *,

        # Artifact ID
        name,

        # Project level config
        lint_config = None,

        # Distribution config
        group = None,
        version = None,
        deploy_env = None,
        excluded_workspaces = None,
        pom_template = None,

        # Package level config
        manifest = None,
        plugins = None,
        module_name = None,
        main_opts = None,
        main_srcs = None,
        main_resources = None,
        main_res = None,
        main_assets = None,
        main_associates = None,
        main_deps = [],
        main_exports = [],
        unit_test_package = None,
        unit_test_opts = None,
        unit_test_srcs = None,
        unit_test_resources = None,
        unit_test_resource_jars = None,
        unit_test_resource_strip_prefix = None,
        unit_test_associates = None,
        unit_test_deps = [],
        unit_test_runtime_deps = None,
        instrumented_test_opts = None,
        instrumented_test_srcs = None,
        instrumented_test_classes = None,
        instrumented_test_resources = None,
        instrumented_test_associates = None,
        instrumented_test_deps = []):
    """Generic Kotlin JVM macro for conditionally configuring build & test targets, linting, and publishing.

    # Building + Testing

    Most kt_jvm_library parameters can be forwarded for either the main, unit_test, or instrumented_test,
    set by prefixing the parameter with `main` or `test`, i.e. `main_srcs`, `unit_test_deps`

    If `srcs`, `resources`, `res`, `assets`, or `manifest` are undefined, they will default to globbing the
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

    Args:
        name: used for the underlying `kt_android_library` rule

        lint_config: project level KtLint config

        group: (optional) group identifier for publishing
        version: (optional) version to publish under
        deploy_env: (optional) collection of targets to exclude from transitive closure
        excluded_workspaces: (optional) dict of workspace names to replace, or remove, from transitive closure
        pom_template: (optional) file override to use while generating the pom file

        manifest: (optional) Android manifest for this module -- defaults to `:src/main/AndroidManifest.xml`
        plugins: (optional) Kotlin compiler plugins to pass to all kt_ build targets
        module_name: (optional) Kotlin module name
        main_opts: (optional) Kotlin compiler options used to compile the main source set
        main_srcs: (optional) main source set -- defaults to `glob(["src/main/kotlin/**/*.kt"])`
        main_resources: (optional) main resources -- defaults to `glob(["src/main/resources/**/*"])`
        main_res: (optional) main Android resources -- defaults to `glob(["src/main/res/**/*"])`
        main_assets: (optional) main Android assets -- defaults to `glob(["src/main/assets/**/*"])`
        main_associates: (optional) Kotlin module dependencies to treat as associates of the same module
        main_deps: (optional) dependencies of the main source set
        main_exports: (optional) dependencies that should be exported as apart of this module
        unit_test_package: (required if test sources are provided) package containing unit tests
        unit_test_opts: (optional) Kotlin compiler options used to compile the unit test source set
        unit_test_srcs: (optional) unit test source set -- defaults to `glob(["src/test/kotlin/**/*.kt"])`
        unit_test_resources: (optional) unit test resources resources -- defaults to `glob(["src/test/resources/**/*"])`
        unit_test_resource_jars: (optional) additional resource JARs for unit test sources
        unit_test_resource_strip_prefix: (optional) remove prefix from unit test resources
        unit_test_associates: (optional) Kotlin module dependencies to treat as associates of the same module
        unit_test_deps: (optional) dependencies of the unit test source set
        unit_test_runtime_deps: (optional) dependencies of the unit test source set that are provided at runtime
        instrumented_test_opts: (optional) Kotlin compiler options used to compile the instrumented test source set
        instrumented_test_srcs: (optional) instrumented test source set -- defaults to `glob(["src/androidTest/kotlin/**/*.kt"])`
        instrumented_test_classes: (optional) instrumented test classes to test -- will infer based on source set, explicitly pass if getting unexpected failures
        instrumented_test_resources: (optional) unit test resources resources -- defaults to `glob(["src/androidTest/resources/**/*"])`
        instrumented_test_associates: (optional) Kotlin module dependencies to treat as associates of the same module
        instrumented_test_deps: (optional) dependencies of the instrumented test source set
    """

    if manifest == None:
        manifest = ":src/main/AndroidManifest.xml"

    if main_srcs == None:
        main_srcs = native.glob(["src/main/kotlin/**/*.kt"], allow_empty = True)

    if main_resources == None:
        main_resources = native.glob(["src/main/resources/**/*"], allow_empty = True)

    if main_res == None:
        main_res = native.glob(["src/main/res/**/*"], allow_empty = True)

    if main_assets == None:
        main_assets = native.glob(["src/main/assets/**/*"], allow_empty = True)

    if unit_test_srcs == None:
        unit_test_srcs = native.glob(["src/test/kotlin/**/*.kt"], allow_empty = True)

    if unit_test_resources == None:
        unit_test_resources = native.glob(["src/test/resources/**/*"], allow_empty = True)

    if instrumented_test_srcs == None:
        instrumented_test_srcs = native.glob(["src/androidTest/kotlin/**/*.kt"], allow_empty = True)

    if instrumented_test_resources == None:
        instrumented_test_resources = native.glob(["src/androidTest/resources/**/*"], allow_empty = True)

    should_publish = group or version
    required_info_to_publish = group and version

    if should_publish and not required_info_to_publish:
        fail("publishing info not fully provided. to enable publishing, ensure group and version are provided: %s, %s" % (group, version))

    maven_coordinates = "%s:%s:aar:%s" % (group, name, version if version else "{pom_version}") if should_publish else None

    kt_android_library_and_test(
        name = name,
        package = group,
        manifest = manifest,
        tags = ["maven_coordinates=%s" % (maven_coordinates)] if maven_coordinates else None,
        plugins = plugins,
        module_name = module_name,
        main_opts = main_opts,
        main_srcs = main_srcs,
        main_resources = main_resources,
        main_res = main_res,
        main_assets = main_assets,
        main_associates = main_associates,
        main_deps = main_deps,
        main_exports = main_exports,
        unit_test_package = unit_test_package if unit_test_package else group,
        unit_test_opts = unit_test_opts,
        unit_test_srcs = unit_test_srcs,
        unit_test_resources = unit_test_resources,
        unit_test_resource_jars = unit_test_resource_jars,
        unit_test_resource_strip_prefix = unit_test_resource_strip_prefix,
        unit_test_associates = unit_test_associates,
        unit_test_deps = unit_test_deps,
        unit_test_runtime_deps = unit_test_runtime_deps,
        instrumented_test_opts = instrumented_test_opts,
        instrumented_test_srcs = instrumented_test_srcs,
        instrumented_test_classes = instrumented_test_classes,
        instrumented_test_resources = instrumented_test_resources,
        instrumented_test_associates = instrumented_test_associates,
        instrumented_test_deps = instrumented_test_deps,
    )

    if lint_config:
        lint(
            name = name,
            srcs = main_srcs + unit_test_srcs + instrumented_test_srcs,
            lint_config = lint_config,
        )

    if should_publish:
        distribution(
            name = name,
            maven_coordinates = "%s:%s:%s" % (group, name, version if version else "{pom_version}"),
            deploy_env = deploy_env,
            excluded_workspaces = excluded_workspaces,
            pom_template = pom_template,
        )

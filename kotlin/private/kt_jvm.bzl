"""
Macro implementation for building, testing, and deploying kotlin code
"""

load(":distribution.bzl", "distribution")
load(":kt_jvm_library_and_test.bzl", "kt_jvm_library_and_test")
load(":lint.bzl", "lint")

def kt_jvm(
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
        module_name = None,
        main_opts = None,
        main_srcs = None,
        main_resources = None,
        main_resource_jars = None,
        main_resource_strip_prefix = None,
        main_associates = None,
        main_deps = None,
        main_exports = None,
        main_runtime_deps = None,
        test_package = None,
        test_opts = None,
        test_srcs = None,
        test_resources = None,
        test_resource_jars = None,
        test_resource_strip_prefix = None,
        test_associates = None,
        test_deps = None,
        test_runtime_deps = None):
    """Generic Kotlin JVM macro for conditionally configuring build & test targets, linting, and publishing.

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

    Args:
        name: used for the underlying `kt_jvm_library` rule

        lint_config: project level KtLint config


        group: (optional) group identifier for publishing
        version: (optional) version to publish under
        deploy_env: (optional) collection of targets to exclude from transitive closure
        excluded_workspaces: (optional) dict of workspace names to replace, or remove, from transitive closure
        pom_template: (optional) file override to use while generating the pom file

        module_name: (optional) Kotlin module name
        main_opts: (optional) Kotlin compiler options used to compile the main source set
        main_srcs: (optional) main source set -- defaults to `glob(["src/main/kotlin/**/*.kt"])`
        main_resources: (optional) main resources -- defaults to `glob(["src/main/resources/**/*"])`
        main_resource_jars: (optional) additional resource JARs for the main sources
        main_resource_strip_prefix: (optional) remove prefix from resources
        main_associates: (optional) Kotlin module dependencies to treat as associates of the same module
        main_deps: (optional) dependencies of the main source set
        main_exports: (optional) dependencies that should be exported as apart of this module
        main_runtime_deps: (optional) depencies of the main source set that are provided at runtime
        test_package: (required if test sources are provided) package containing tests
        test_opts: (optional) Kotlin compiler options used to compile the test source set
        test_srcs: (optional) test source set -- defaults to `glob(["src/test/kotlin/**/*.kt"])`
        test_resources: (optional) main resources -- defaults to `glob(["src/test/resources/**/*"])`
        test_resource_jars: (optional) additional resource JARs for the test sources
        test_resource_strip_prefix: (optional) remove prefix from resources
        test_associates: (optional) Kotlin module dependencies to treat as associates of the same module
        test_deps: (optional) dependencies of the test source set
        test_runtime_deps: (optional) depencies of the test source set that are provided at runtime
    """

    if main_srcs == None:
        main_srcs = native.glob(["src/main/kotlin/**/*.kt"])

    if main_resources == None:
        main_resources = native.glob(["src/main/resources/**/*"])

    if test_srcs == None:
        test_srcs = native.glob(["src/test/kotlin/**/*.kt"])

    if test_resources == None:
        test_resources = native.glob(["src/test/resources/**/*"])

    should_publish = group or version
    required_info_to_publish = group and version

    if should_publish and not required_info_to_publish:
        fail("publishing info not fully provided. to enable publishing, ensure group and version are provided: %s, %s" % (group, version))

    maven_coordinates = "%s:%s:%s" % (group, name, version if version else "{pom_version}") if should_publish else None

    kt_jvm_library_and_test(
        name = name,
        tags = ["maven_coordinates=%s" % (maven_coordinates)] if maven_coordinates else None,
        module_name = module_name,
        main_opts = main_opts,
        main_srcs = main_srcs,
        main_resources = main_resources,
        main_resource_jars = main_resource_jars,
        main_resource_strip_prefix = main_resource_strip_prefix,
        main_associates = main_associates,
        main_deps = main_deps,
        main_exports = main_exports,
        main_runtime_deps = main_runtime_deps,
        test_package = test_package,
        test_opts = test_opts,
        test_srcs = test_srcs,
        test_resources = test_resources,
        test_resource_jars = test_resource_jars,
        test_resource_strip_prefix = test_resource_strip_prefix,
        test_associates = test_associates,
        test_deps = test_deps,
        test_runtime_deps = test_runtime_deps,
    )

    if lint_config:
        lint(
            name = name,
            srcs = main_srcs + test_srcs,
            lint_config = lint_config,
        )

    if should_publish:
        distribution(
            name = name,
            maven_coordinates = maven_coordinates,
            deploy_env = deploy_env,
            excluded_workspaces = excluded_workspaces,
            pom_template = pom_template,
        )

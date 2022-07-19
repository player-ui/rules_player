load(":build.bzl", "kt_jvm_library_and_test")
load(":lint.bzl", "lint")
load(":distribution.bzl", "distribution")

def kt_jvm(
        *,

        # Artifact ID
        name,

        # Project level config
        lint_config = None,

        # Distribution config
        group = None,
        release_repo = None,
        snapshot_repo = None,
        version_file = None,

        # (optional)
        project_name = None,
        project_description = None,
        project_url = None,
        scm_url = None,
        developers = None,
        workspace_refs = None,

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
        test_runtime_deps = None,
):
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

    Distribution requires a group to use for Maven coordinates, as well as the Maven
    snapshot and release repositories to publish to. Additionally, a version file is
    required to read the version from for publishing.

    If any of these properties are provided, publishing will be attempted, but will
    error out if any of the additional properties are missing.

    The following can be provided for additional information to publish the artifact
    with:
    - project_name
    - project_description
    - project_url
    - scm_url

    Args:
        name: used for the underlying `kt_jvm_library` rule

        # Project config
        lint_config: project level KtLint config

        # Distribution project config
        group: (optional) group identifier for publishing
        release_repo: (optional) Maven release repository
        snapshot_repo: (optional) Maven snapshot repository
        version_file: (optional) file containing version string

        # Distribution target config
        project_name: (optional) project name for POM
        project_description: (optional) project description for POM
        project_url: (optional) project url for POM
        scm_url: (optional) project scm url for POM
        developers: (optional) developers for POM
        workspace_refs: (optional) refs used to track dependencies

        # Package level config
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

    should_publish = group or version_file or snapshot_repo or release_repo
    required_info_to_publish = group and version_file and snapshot_repo and release_repo

    if should_publish and not required_info_to_publish:
        fail("publishing info not fully provided. to enable publishing, ensure group, version_file, snapshot_repo, and release_repo are provided: %s, %s, %s, %s" % (group, version_file, snapshot_repo, release_repo))

    kt_jvm_library_and_test(
        name = name,
        tags = ["maven_coordinates=%s:%s:{pom_version}" % (group, name)] if should_publish else None,
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
            release_repo = release_repo,
            snapshot_repo = snapshot_repo,
            version_file = version_file,
            project_name = project_name,
            project_description = project_description,
            project_url = project_url,
            scm_url = scm_url,
            developers = developers,
            workspace_refs = workspace_refs,
        )

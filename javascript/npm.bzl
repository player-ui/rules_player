load("@vaticle_bazel_distribution//npm:rules.bzl", "assemble_npm", "deploy_npm")
load("@build_bazel_rules_nodejs//:index.bzl", "pkg_npm")

def publish_npm(name, version, bundle):
    pkg_npm(
        name = "pkg_npm",
        package_name = name,
        deps = bundle,
        substitutions = {
            "__VERSION__": "{VERSION}",
            "0.0.0-PLACEHOLDER": "{VERSION}",
            "__GIT_COMMIT__": "{STABLE_GIT_COMMIT}",
        },
        validate = False,
    )

    # assemble_npm(
    #     name = "assemble_npm",
    #     target = "pkg_npm",
    #     version_file = version,
    # )

    # deploy_npm(
    #     name = "deploy_npm",
    #     target = "assemble_npm",
    #     release = "https://registry.npmjs.intuit.com",
    #     snapshot = "https://registry.npmjs.intuit.com",
    # )

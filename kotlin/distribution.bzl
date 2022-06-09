load("@vaticle_bazel_distribution//maven:rules.bzl", "assemble_maven", "deploy_maven")

def distribution(
        *,
        name,

        release_repo,
        snapshot_repo,
        version_file,

        # (optional)
        project_name = None,
        project_description = None,
        project_url = None,
        scm_url = None,

        workspace_refs = None,
):
    assemble_name = "%s-assemble" % name
    assemble_maven(
        name = assemble_name,
        target = ":%s" % name,
        project_name = project_name,
        project_description = project_description,
        project_url = project_url,
        scm_url = scm_url,
        version_file = version_file,
        workspace_refs = workspace_refs,
    )

    deploy_maven(
        name = "%s-deploy" % name,
        target = ":%s" % assemble_name,
        release = release_repo,
        snapshot = snapshot_repo,
    )

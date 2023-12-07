load("@vaticle_bazel_distribution//maven:rules.bzl", "assemble_maven", "deploy_maven", "MavenDeploymentInfo")
load("//internal:scope_name.bzl", "scope_name")

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
        developers = None,

        workspace_refs = None,
):
    assemble_name = scope_name(name, "assemble")
    assemble_maven(
        name = assemble_name,
        target = ":%s" % name,
        project_name = project_name,
        project_description = project_description,
        project_url = project_url,
        scm_url = scm_url,
        developers = developers,
        version_file = version_file,
        workspace_refs = workspace_refs,
    )

    install_maven(
        name = scope_name(name, "install"),
        target = ":%s" % assemble_name,
    )

    deploy_maven(
        name = scope_name(name, "deploy"),
        target = ":%s" % assemble_name,
        release = release_repo,
        snapshot = snapshot_repo,
    )

def _install_maven_impl(ctx):
    deployment_info = ctx.attr.target[MavenDeploymentInfo]
    file = deployment_info.jar

    script = ctx.actions.declare_file("%s-install" % ctx.label.name)
    script_content = "mvn install:install-file -Dfile={}".format(file.short_path,)
    ctx.actions.write(script, script_content, is_executable = True)

    runfiles = ctx.runfiles(files = [file])
    return [DefaultInfo(executable = script, runfiles = runfiles)]

install_maven = rule(
    implementation = _install_maven_impl,
    attrs = {
        "target": attr.label(
            mandatory = True,
            providers = [MavenDeploymentInfo],
            doc = "assemble_maven target to install",
        ),
    },
    executable = True,
)

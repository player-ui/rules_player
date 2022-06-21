load("@build_bazel_rules_nodejs//:providers.bzl", "node_modules_aspect", "run_node", "NODE_CONTEXT_ATTRS", "NodeContextInfo")
load("@build_bazel_rules_nodejs//internal/linker:link_node_modules.bzl", "module_mappings_aspect")
load("@rules_player//javascript:utils.bzl", "get_dep_files")

NEXT_ATTRS = dict(NODE_CONTEXT_ATTRS, **{
    # Dependencies needed to build the pkg
    "data": attr.label_list(
        default = [],
        aspects = [module_mappings_aspect, node_modules_aspect],
        allow_files = True,
    ),
    "env": attr.string_dict(),
    "srcs": attr.label_list(default = [], allow_files = True),
    "_next": attr.label(default = Label("//javascript/next:next_build"), executable = True, cfg = "host"),
})

def _next_export(ctx):
    next_dir = ctx.actions.declare_directory(ctx.label.name)
    deps_inputs = get_dep_files(ctx.attr.data)

    stamp = ctx.attr.node_context_data[NodeContextInfo].stamp

    stamp_args = []
    stamp_inputs = []

    if stamp:
        stamp_args = ['--stamp-file', ctx.info_file.path]
        stamp_inputs = [ctx.info_file]

    run_node(
        ctx,
        inputs = ctx.files.srcs + deps_inputs + stamp_inputs,
        outputs = [next_dir],
        env = ctx.attr.env,
        arguments = [
            "--root-dir",
            ctx.label.package,
            "--out_dir",
            next_dir.path
        ] + stamp_args,
        executable = "_next",
        mnemonic = "Next",
    )

    return [
        DefaultInfo(
            files = depset([next_dir]),
        ),
    ]

next_export = rule(
    implementation = _next_export,
    attrs = NEXT_ATTRS,
)

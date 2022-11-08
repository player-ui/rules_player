load("@bazel_skylib//lib:paths.bzl", "paths")
load("@build_bazel_rules_nodejs//:providers.bzl", "JSModuleInfo", "node_modules_aspect", "run_node")
load("@build_bazel_rules_nodejs//internal/linker:link_node_modules.bzl", "module_mappings_aspect")
load("@rules_player//javascript:utils.bzl", "get_dep_files", "get_path_mappings", "filter_empty")

ROLLUP_ATTRS = {
    # Dependencies needed to build the pkg
    "data": attr.label_list(
        default = [],
        aspects = [module_mappings_aspect, node_modules_aspect],
        allow_files = True,
    ),

    # The entry file, used to calculate the name of the output src/index.ts -> dist/index.cjs.js
    "entry": attr.string(mandatory = True),

    # The output directory, used to calculate the output file
    "out_dir": attr.string(mandatory = True),
    "srcs": attr.label_list(default = [], allow_files = True),

    "esm_only": attr.bool(default = False),

    "_rollup": attr.label(default = Label("@npm//rollup/bin:rollup"), executable = True, cfg = "host"),
    "_rollup_config_template": attr.label(default = Label("//javascript/rollup:rollup.config.template.js"), allow_single_file = True),
}

ROLLUP_BIN_ATTRS = dict(ROLLUP_ATTRS, **{
    "bin_name": attr.string(default = "cli"),
})

def _rollup_build(ctx):
    is_bin_build = hasattr(ctx.attr, "bin_name")
    is_esm_only = ctx.attr.esm_only
    file_outputs = []
    output_group = None

    if is_bin_build:
        cjs_out = ctx.actions.declare_file(paths.join(ctx.attr.out_dir, "%s.js" % ctx.attr.bin_name))
        file_outputs = [cjs_out]
        output_group = OutputGroupInfo(
            cjs = depset([cjs_out]),
        )

    else:
        cjs_out = None if is_esm_only else ctx.actions.declare_file(paths.join(ctx.attr.out_dir, "index.cjs.js"))
        esm_out = ctx.actions.declare_file(paths.join(ctx.attr.out_dir, "index.esm.js"))
        dts_out = ctx.actions.declare_file(paths.join(ctx.attr.out_dir, "index.d.ts"))
        file_outputs = filter_empty([cjs_out, esm_out, dts_out])
        output_group = OutputGroupInfo(
            cjs = depset(filter_empty([None if is_esm_only else cjs_out ])),
            esm = depset([esm_out]),
            types = depset([dts_out]),
        )

    out_dir = paths.dirname(file_outputs[0].path)
    deps_inputs = get_dep_files(ctx.attr.data)

    rollup_config = ctx.actions.declare_file("rollup.config%s.js" % (".bin" if is_bin_build else ""))
    path_alias_mappings = get_path_mappings(ctx.attr.data, paths.dirname(rollup_config.path))

    ctx.actions.expand_template(
        output = rollup_config,
        template = ctx.file._rollup_config_template,
        substitutions = {
            "TMPL_build_target_type": "CLI" if is_bin_build else "LIB",
            "TMPL_entry": paths.join(ctx.label.package, ctx.attr.entry),
            "TMPL_out_dir": out_dir,
            "TMPL_esm_only": "true" if is_esm_only else "false",
            "TMPL_bin_name": paths.basename(file_outputs[0].path),
            "TMPL_ts_paths": json.encode(path_alias_mappings),
        },
    )

    run_node(
        ctx,
        inputs = ctx.files.srcs + [rollup_config] + deps_inputs,
        outputs = file_outputs,
        arguments = [
            "--silent",
            "--preserveSymlinks",
            "-c",
            rollup_config.path,
        ],
        executable = "_rollup",
        mnemonic = "Rollup",
    )

    output_depset = depset(file_outputs)

    return [
        DefaultInfo(
            files = output_depset,
        ),
        JSModuleInfo(
            direct_sources = output_depset,
            sources = output_depset,
        ),
        output_group,
    ]

rollup_build = rule(
    implementation = _rollup_build,
    attrs = ROLLUP_ATTRS,
)

rollup_bin_build = rule(
    implementation = _rollup_build,
    attrs = ROLLUP_BIN_ATTRS,
)

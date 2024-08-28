"""
A rule for creating player cli configs
"""

load("@aspect_rules_js//js:providers.bzl", "JsInfo")

_config_attrs = {
    "plugins": attr.label_list(
        default = [],
        providers = [JsInfo],
        allow_files = True,
        allow_empty = True,
    ),
    "presets": attr.label_list(
        default = [],
        providers = [JsInfo],
        allow_files = True,
        allow_empty = True,
    ),
    "_config_template": attr.label(
        allow_single_file = True,
        default = Label("//player/private:player.config.js.template"),
    ),
}

def _create_base_config_impl(ctx):
    """
    Implementation for player cli config
    """

    tmpl_plugins = []
    tmpl_presets = []

    for plugin in ctx.attr.plugins:
        linked_list = plugin[JsInfo].npm_package_store_infos.to_list()
        if len(linked_list) > 1:
            fail("Plugin {} has more than one linked package".format(plugin))

        tmpl_plugins.append(linked_list[0].package)

    for plugin in ctx.attr.presets:
        linked_list = plugin[JsInfo].npm_package_store_infos.to_list()
        if len(linked_list) > 1:
            fail("Plugin {} has more than one linked package".format(plugin))

        tmpl_presets.append(linked_list[0].package)

    output_file = ctx.actions.declare_file("{}.player.config.js".format(ctx.label.name))

    ctx.actions.expand_template(
        template = ctx.file._config_template,
        output = output_file,
        substitutions = {
            "_TMPL_PLUGINS": json.encode(tmpl_plugins),
            "_TMPL_PRESETS": json.encode(tmpl_presets),
        },
    )

    output_sources = [output_file]
    output_sources_depset = depset(output_sources)

    return [
        DefaultInfo(
            files = output_sources_depset,
        ),
    ]

create_base_config = rule(
    implementation = _create_base_config_impl,
    attrs = _config_attrs,
)

"""
Implementation of `kt_player_plugin_wrapper` for generating a Kotlin Player plugin wrapper
"""

load("@bazel_skylib//lib:dicts.bzl", "dicts")
load("@rules_jvm_external//:defs.bzl", "artifact")
load("//kotlin:defs.bzl", "kt_jvm")

DEFAULT_DEPS = [artifact("com.intuit.playerui:core")]
DEFAULT_TEST_DEPS = [artifact("com.intuit.playerui:testutils")]

def kt_player_plugin_wrapper(
        *,

        # Artifact ID
        name,
        package,
        plugin_name,
        plugin_source,
        resources,
        plugin_constructor = None,
        main_deps = DEFAULT_DEPS,
        main_exports = DEFAULT_DEPS,
        test_deps = DEFAULT_TEST_DEPS,
        **kwargs):
    """Macro for generating a JVM wrapper of a platform-agnostic TS plugin.

    Currently,this is only supported for plugins that meet the following criteria:
     - Doesn't require constructor parameters
     - Doesn't expose additional APIs

    If your platform agnostic plugin requires constructor parameters, it'll need to be
    wrapped manually. You could use this macro to generate the JVM wrapper and expose
    additional APIs through extensions, but it's likely best to wrap manually to preserve
    platform parity as it relates to member functions.

    Args:
        name: used for the underlying `kt_jvm` rule, used as artifact ID
        package: scope to generate the plugin under
        plugin_name: name of plugin bundle
        plugin_source: path to plugin bundle
        resources: resources containing plugin bundle to pass to `kt_jvm`
        plugin_constructor: (optional) reference to instantiate plugin with
                                       -- defaults to ${plugin_name}.${plugin_name}

        main_deps: (optional) main deps to compile wrapper with -- defaults to [artifact("com.intuit.playerui:core")]
        main_exports: (optional) main deps to compile wrapper with -- defaults to [artifact("com.intuit.playerui:core")]
        test_deps: (optional) test deps to compile wrapper tests with -- defaults to [artifact("com.intuit.playerui:testutils")]
        **kwargs: (optional) arbitrary parameters to pass into `kt_jvm` -- see `kt_jvm` docs <https://github.com/player-ui/rules_player/blob/main/docs/kotlin.md#kt_jvm>
    """
    generate_plugin_wrapper(
        name = "%s-gen" % name,
        package = package,
        plugin_name = plugin_name,
        plugin_constructor = plugin_constructor if plugin_constructor else "%s.%s" % (plugin_name, plugin_name),
        plugin_source_path = plugin_source,
    )

    generate_plugin_test_wrapper(
        name = "%s-gen-test" % name,
        package = package,
        plugin_name = plugin_name,
    )

    kt_jvm(
        name = name,
        main_srcs = ["%s-gen" % name],
        main_deps = main_deps,
        main_exports = main_exports,
        main_resources = resources,
        test_srcs = ["%s-gen-test" % name],
        test_deps = test_deps,
        test_package = package,
        **kwargs
    )

def _generate_file(context):
    generated = context.actions.declare_file("%s%s.kt" % (context.attr.plugin_name, "Test" if hasattr(context.attr, "_test") else ""))
    context.actions.expand_template(
        output = generated,
        template = context.file._template,
        substitutions = {
            "@{{%s}}" % key: getattr(context.attr, key)
            for key in dir(context.attr)
            if type(getattr(context.attr, key)) == "string"
        },
    )
    return [DefaultInfo(files = depset([generated]))]

_generate_attrs = {
    "package": attr.string(mandatory = True),
    "plugin_name": attr.string(mandatory = True),
}

generate_plugin_wrapper = rule(
    implementation = _generate_file,
    attrs = dicts.add(
        _generate_attrs,
        plugin_constructor = attr.string(mandatory = True),
        plugin_source_path = attr.string(mandatory = True),
        _template = attr.label(
            allow_single_file = True,
            default = "plugin_wrapper_template.kt.tpl",
        ),
    ),
)

generate_plugin_test_wrapper = rule(
    implementation = _generate_file,
    attrs = dicts.add(
        _generate_attrs,
        _test = attr.bool(default = True),
        _template = attr.label(
            allow_single_file = True,
            default = "plugin_wrapper_test_template.kt.tpl",
        ),
    ),
)

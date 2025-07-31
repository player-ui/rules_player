"""
Implementation of `kt_player_plugin_wrapper` for generating a Kotlin Player plugin wrapper
"""

load("@bazel_skylib//lib:dicts.bzl", "dicts")
load("@rules_jvm_external//:defs.bzl", "artifact")
load("//kotlin:defs.bzl", "kt_jvm")

def kt_player_plugin_wrapper(
        *,

        # Artifact ID
        name,
        package,
        plugin_name,
        plugin_source,
        resources,
        plugin_constructor = None):
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
        # TODO: Should we pull these from @maven for user defined packages? Or @rules_player_maven for low-config needed?
        main_deps = [artifact("com.intuit.playerui:core")],
        main_exports = [artifact("com.intuit.playerui:core")],
        main_resources = resources,
        test_srcs = ["%s-gen-test" % name],
        test_deps = [artifact("com.intuit.playerui:testutils")],
        test_package = package,
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

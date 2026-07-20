"""
Hermes bytecode (HBC) compilation.

`hermes_compile` runs the prebuilt host `hermesc` over the `<bundle>.native.js`
produced by a `js_pipeline` native bundle to emit Hermes bytecode. `hermes_bundle`
is a thin alias kept for backwards compatibility.
"""

def _hermes_compile_impl(context):
    native_js = "%s.native.js" % context.attr.bundle_name

    # The native bundle target emits dist/<bundle>.native.js alongside its .map;
    # pick the .native.js out of the multi-file input rather than copying it to a
    # second flat output (which collides with the bundle's own file on some hosts).
    input = None
    for file in context.files.native_bundle:
        if file.basename == native_js:
            input = file
            break

    if input == None:
        fail("Could not find %s in native bundle %s" % (native_js, context.attr.native_bundle.label))

    hbc = context.actions.declare_file("%s.hbc" % input.basename)

    args = context.actions.args()
    args.add("-emit-binary")
    args.add("-out", hbc)
    args.add(input)

    context.actions.run(
        mnemonic = "HermesC",
        executable = context.executable._hermesc,
        arguments = [args],
        inputs = depset([input]),
        outputs = [hbc],
    )

    return [DefaultInfo(files = depset([hbc]))]

hermes_compile = rule(
    implementation = _hermes_compile_impl,
    attrs = {
        "bundle_name": attr.string(
            doc = "The `native_bundle` string passed to js_pipeline (e.g. \"Player\").",
        ),
        "native_bundle": attr.label(
            allow_files = True,
            doc = "The `:<name>_native_bundle` target from js_pipeline.",
        ),
        "_hermesc": attr.label(
            default = Label("@rn_hermesc//:hermesc"),
            allow_single_file = True,
            executable = True,
            cfg = "exec",
        ),
    },
)

def hermes_bundle(name, native_bundle, bundle_name, visibility = None):
    """Compile a js_pipeline native bundle to Hermes bytecode.

    Args:
      name: Name of the resulting HBC target.
      native_bundle: The `:<name>_native_bundle` target from js_pipeline.
      bundle_name: The `native_bundle` string passed to js_pipeline (e.g. "Player").
      visibility: Visibility for the generated targets.
    """
    hermes_compile(
        name = name,
        native_bundle = native_bundle,
        bundle_name = bundle_name,
        visibility = visibility,
    )

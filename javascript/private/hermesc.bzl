"""
Hermes bytecode (HBC) compilation.

`hermes_compile` runs the prebuilt host `hermesc` over a single JS file to emit
Hermes bytecode. `hermes_bundle` is a convenience macro that extracts the
`<bundle>.native.js` produced by a `js_pipeline` native bundle and compiles it.
"""

def _hermes_compile_impl(context):
    input = context.file.js
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
        "js": attr.label(
            allow_single_file = True,
            doc = "Single JS file to compile to HBC.",
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
    native_js = "%s.native.js" % bundle_name
    extract_name = "%s_native_js" % name

    # js_run_binary emits a set of files (dist/<bundle>.native.js + .map);
    # hermesc needs a single file, so pull it out flat.
    native.genrule(
        name = extract_name,
        srcs = [native_bundle],
        outs = [native_js],
        cmd = "echo $(SRCS) | tr ' ' '\\n' | grep %s$$ | xargs -I {} cp {} $(OUTS)" % native_js,
    )

    hermes_compile(
        name = name,
        js = ":" + extract_name,
        visibility = visibility,
    )

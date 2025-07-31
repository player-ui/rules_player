load("dsl.bzl", compile_dsl = "compile")

def compile_mocks(mock_dirs, dsl_config, data, name = "mocks"):
    """Compiles all DSL mocks in a directory.

    Args:
        name: target name (optional, defaults to mocks)
        mock_dirs: top level folders to compile mocks for.
        dsl_config: The DSL config file that should be used for compilation.
        data: Any additional packages that are needed for compilation.
    """

    dsl_srcs = native.glob(["{}/*.tsx".format(d) for d in mock_dirs])

    for mock_dir in mock_dirs:
        compile_dsl(
            name = "dsl_mocks_" + mock_dir,
            srcs = native.glob([
                mock_dir + "/*.tsx",
            ]),
            input_dir = mock_dir,
            output_dir = mock_dir,
            config = dsl_config,
            data = data + [
                "//:node_modules/@player-tools/dsl",
                "//:node_modules/@types/react",
                "//:node_modules/react",
            ],
        )

    native.filegroup(
        name = "compiled_mocks",
        srcs = [":dsl_mocks_" + mock_dir for mock_dir in mock_dirs],
    )

    native.filegroup(
        name = "mocks",
        srcs = [
            ":compiled_mocks",
        ] + dsl_srcs,
        visibility = ["//visibility:public"],
    )

def _determine_mock_info(file):
    return file.path.split("/")[-3:]

def _generate_mocks_manifest(context):
    mocks = [mock for group in context.attr.mocks for mock in group[DefaultInfo].files.to_list()]

    manifest = context.actions.declare_file("manifest.json")
    context.actions.write(
        output = manifest,
        content = json.encode([{
            "group": group,
            "name": file.replace(".json", ""),
            "path": "./%s/%s/%s" % (root, group, file),
        } for root, group, file in [_determine_mock_info(mock) for mock in mocks if mock.basename.endswith(".json")]]),
    )

    # we re-write the mocks so that we have a consistent prefix to trim
    mock_outputs = []
    for input in mocks:
        _, group, file = _determine_mock_info(input)
        output = context.actions.declare_file("{}/{}".format(group, file))
        mock_outputs.append(output)
        context.actions.run_shell(
            outputs = [output],
            inputs = depset([input]),
            arguments = [input.path, output.path],
            command = "cp $1 $2",
        )

    return [DefaultInfo(files = depset([manifest] + mock_outputs))]

generate_mocks_manifest = rule(
    attrs = {
        "mocks": attr.label_list(
            allow_files = [".json"],
        ),
    },
    implementation = _generate_mocks_manifest,
)

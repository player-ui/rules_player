load("@bazel_skylib//rules/private:copy_file_private.bzl", "copy_bash")
load("@bazel_skylib//lib:paths.bzl", "paths")
load("@build_bazel_rules_nodejs//:providers.bzl", "DeclarationInfo", "ExternalNpmPackageInfo", "JSEcmaScriptModuleInfo", "JSModuleInfo")
load("@build_bazel_rules_nodejs//internal/linker:link_node_modules.bzl", "LinkerPackageMappingInfo")

def filter_empty(things):
    new_things = []
    for f in things:
        if f != None:
            new_things.append(f)
    return new_things

def get_relative_path(source, target):
    # Get a directory split of them
    source_split = source.split("/")
    target_split = target.split("/")

    path_prefix = ""
    for i in range(len(source_split)):
        if source_split[i] == target_split[i]:
            path_prefix = paths.join(path_prefix, source_split[i])
        else:
            break

    return paths.join("../" * len(paths.relativize(source, path_prefix).split("/")), paths.relativize(target, path_prefix))

def get_dep_files(data):
    deps_depsets = []
    for dep in data:
        if JSEcmaScriptModuleInfo in dep:
            deps_depsets.append(dep[JSEcmaScriptModuleInfo].sources)
        if DeclarationInfo in dep:
            deps_depsets.append(dep[DeclarationInfo].transitive_declarations)

        if DefaultInfo in dep:
            deps_depsets.append(dep[DefaultInfo].data_runfiles.files)

        if JSModuleInfo in dep:
            deps_depsets.append(dep[JSModuleInfo].sources)
        elif hasattr(dep, "files"):
            deps_depsets.append(dep.files)

        # Also include files from npm deps as inputs.
        # These deps are identified by the ExternalNpmPackageInfo provider.
        if ExternalNpmPackageInfo in dep:
            deps_depsets.append(dep[ExternalNpmPackageInfo].sources)

    return depset(transitive = deps_depsets).to_list()

def get_path_mappings(data, output_relative_dir):
    path_alias_mappings = dict()

    for dep in data:
        if LinkerPackageMappingInfo in dep:
            for key, value in dep[LinkerPackageMappingInfo].mappings.items():
                # key is of format "package_name:package_path"
                package_name = key.split(":")[0]
                path_alias_mappings[package_name] = [get_relative_path(output_relative_dir, value)]

def copy_to_bin(ctx, srcs):
    outs = []

    for src in srcs:
        out = ctx.actions.declare_file(src.basename, sibling = src)
        copy_bash(ctx, src, out)
        outs.append(out)

    return outs

def is_test_file(file, test_file_pattern):
    for p in test_file_pattern:
        if p in file:
            return True
    return False

def filter_false(arr):
    filtered = []
    for f in arr:
        if f:
            filtered.append(f)

    return filtered

def include_exts(files, file_patterns):
    return filter_false([f if is_test_file(f, file_patterns) else None for f in files])

def without_tests(files, test_file_pattern):
    return filter_false([f if not is_test_file(f, test_file_pattern) else None for f in files])

def remove_duplicates(data):
    filtered = []
    for d in data:
        if d in filtered:
            continue
        filtered.append(d)
    return filtered
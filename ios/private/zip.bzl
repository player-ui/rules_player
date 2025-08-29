"""
Common utilities for creating the zip for publishing
"""

load("@rules_pkg//:mappings.bzl", "pkg_files", "strip_prefix")
load("@rules_pkg//:pkg.bzl", "pkg_zip")

def assemble_pod(
        name,
        podspec = "",
        srcs = [],
        data = {}):
    """
    Assemble a zip file for a podspec and related sources

    Args:
      name: Name of the target
      podspec: The podspec file
      srcs: Source files for the pod
      data: Other dependencies
    """

    pkg_files(
        name = name + "_podspec",
        srcs = [podspec],
        strip_prefix = strip_prefix.from_pkg(),
    )

    pkg_files(
        name = name + "_srcs",
        srcs = srcs,
        strip_prefix = strip_prefix.from_pkg(),
    )

    data_pkgs = []
    for target in data:
        ident = name + "_data_%d" % len(data_pkgs)
        pkg_files(
            name = ident,
            srcs = [target],
            strip_prefix = strip_prefix.from_pkg(),
            prefix = data[target],
        )
        data_pkgs.append(":" + ident)

    pkg_zip(
        name = name,
        srcs = [":" + name + "_podspec", ":" + name + "_srcs"] + data_pkgs,
    )

def _deduce_path_from_target(target):
    """Deduces the SPM path from a Bazel target.

    Converts targets like:
      "//plugins/fancy/swiftui:ExampleFancyPlugin_Sources" -> "plugins/fancy/swiftui"
      "//assets/fancy-dog/swiftui:ExampleFancyDogAsset_Sources" -> "assets/fancy-dog/swiftui"
    """

    # Remove the leading "//" and split on ":"
    if target.startswith("//"):
        target = target[2:]

    # Split on ":" and take the first part (the package path)
    package_path = target.split(":")[0]

    return package_path

def _normalize_target_config(item):
    """Normalizes a target configuration to a dict with target and path.

    Args:
      item: Either a string target or a dict with target/path keys

    Returns:
      Dict with 'target', 'path', and 'resourceTarget' keys
    """
    if type(item) == "string":
        return {
            "path": _deduce_path_from_target(item),
            "resourceTarget": None,
            "target": item,
        }
    else:
        target = item["target"]
        return {
            "path": item.get("path", _deduce_path_from_target(target)),
            "resourceTarget": item.get("resourceTarget", None),
            "target": target,
        }

def _create_pkg_files_for_targets(name_prefix, targets):
    """Creates pkg_files rules for a list of target configurations.

    Args:
      name_prefix: Prefix for the generated rule names
      targets: List of normalized target configurations

    Returns:
      List of target names that were created (includes both source and resource targets)
    """
    created_targets = []
    for i, config in enumerate(targets):
        # Create pkg_files for the main source target
        source_target_name = name_prefix + "_" + str(i)
        pkg_files(
            name = source_target_name,
            srcs = [config["target"]],
            strip_prefix = strip_prefix.from_pkg(),
            prefix = config["path"],
        )
        created_targets.append(":" + source_target_name)

        # Create pkg_files for the resource target if provided
        if config["resourceTarget"]:
            resource_target_name = name_prefix + "_" + str(i) + "_resources"

            # Determine the Resources path based on the source path
            resources_path = config["path"] + "/Resources"
            pkg_files(
                name = resource_target_name,
                srcs = [config["resourceTarget"]],
                strip_prefix = strip_prefix.from_pkg(),
                prefix = resources_path,
            )
            created_targets.append(":" + resource_target_name)

    return created_targets

def assemble_package(
        name,
        package_swift,
        plugins = [],
        assets = []):
    """Assembles an iOS Swift Package Manager package zip.

    This creates the proper directory structure with Package.swift, plugins, and assets
    that matches SPM expectations.

    Args:
      name: Name of the package target
      package_swift: The Package.swift file to include
      plugins: <b>List of plugin configurations.</b> Each can be either:
        <ul>
          <li>A string: The Bazel target (path will be auto-deduced)</li>
          <li>
            A dict with:
            <ul>
              <li><b>target</b>: The Bazel target (e.g., <code>//plugins/fancy/swiftui:ExampleFancyPlugin_Sources</code>)</li>
              <li><b>path</b>: The path in Package.swift (optional, auto-deduced if not provided)</li>
              <li><b>resourceTarget</b>: The JS bundle target for this plugin (optional, e.g., <code>//plugins/fancy/core:core_native_bundle</code>)</li>
            </ul>
          </li>
        </ul>
      assets: <b>List of asset configurations.</b> Each can be either:
        <ul>
          <li>A string: The Bazel target (path will be auto-deduced)</li>
          <li>
            A dict with:
            <ul>
              <li><b>target</b>: The Bazel target (e.g., <code>//assets/fancy-dog/swiftui:ExampleFancyDogAsset_Sources</code>)</li>
              <li><b>path</b>: The path in Package.swift (optional, auto-deduced if not provided)</li>
              <li><b>resourceTarget</b>: The JS bundle target for this asset (optional, e.g., <code>//assets/fancy-dog/core:core_native_bundle</code>)</li>
            </ul>
          </li>
        </ul>
    """

    # Package.swift file at root
    pkg_files(
        name = name + "_package_swift",
        srcs = [package_swift],
        strip_prefix = strip_prefix.from_pkg(),
    )

    # Normalize and create pkg_files for plugins and assets
    # This now automatically handles resources via the resourceTarget field
    normalized_plugins = [_normalize_target_config(p) for p in plugins]
    normalized_assets = [_normalize_target_config(a) for a in assets]

    plugin_targets = _create_pkg_files_for_targets(name + "_plugin", normalized_plugins)
    asset_targets = _create_pkg_files_for_targets(name + "_asset", normalized_assets)

    # Create the zip package with all sources and resources
    pkg_zip(
        name = name,
        srcs = [":" + name + "_package_swift"] + plugin_targets + asset_targets,
    )

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
    """Assemble a zip file for a podspec and related sources.

    > [!WARNING]
    > This function is deprecated and will be removed in v3. Use `assemble_ios_release` instead.

    Args:
        name: Name of the target
        podspec: The podspec file
        srcs: Source files for the pod
        data: Other dependencies (dictionary mapping files to destination paths)

    Deprecated:
        This will be removed in v3. Use `assemble_ios_release` which provides a unified interface for both
        CocoaPods and Swift Package Manager releases.
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

def assemble_ios_release(
        name,
        data = {}):
    """Assembles an iOS release zip file for either CocoaPods or Swift Package Manager (SPM).

    This unified function creates properly structured zip files that can be used for:
    - CocoaPods distribution (with `ios_publish`)
    - Swift Package Manager distribution (with `spm_publish`)

    The function uses a simple dictionary-based approach where all files are specified
    in the `data` parameter with their destination paths within the zip.

    CocoaPods Example:

    ```python
    assemble_ios_release(
        name = "MyLibraryPod",
        data = {
            "MyLibrary.podspec": "",  # Root level
            "Sources/MyLibrary/MyLibrary.swift": "Sources/MyLibrary/",
            "Sources/MyLibrary/Internal.swift": "Sources/MyLibrary/",
            "Resources/config.json": "Resources/",
            "LICENSE": "",
            "README.md": "",
        },
    )
    ```

    Swift Package Manager Example:

    ```python
    assemble_ios_release(
        name = "MyLibrarySPM",
        data = {
            "Package.swift": "",  # Root level
            "Sources/MyLibrary/MyLibrary.swift": "Sources/MyLibrary/",
            "Sources/MyLibrary/Internal.swift": "Sources/MyLibrary/",
            "Resources/config.json": "Resources/",
            "LICENSE": "",
            "README.md": "",
        },
    )
    ```

    Both examples create similar zip structures:
    ```
    CocoaPods:                     SPM:
    MyLibraryPod.zip               MyLibrarySPM.zip
    ├── MyLibrary.podspec          ├── Package.swift
    ├── Sources/                   ├── Sources/
    │   └── MyLibrary/             │   └── MyLibrary/
    │       ├── MyLibrary.swift    │       ├── MyLibrary.swift
    │       └── Internal.swift     │       └── Internal.swift
    ├── Resources/                 ├── Resources/
    │   └── config.json            │   └── config.json
    ├── LICENSE                    ├── LICENSE
    └── README.md                  └── README.md
    ```

    Args:
        name: Name of the target
        data: Dictionary mapping files to their destination paths within the zip.
              Keys are Bazel targets (source file paths). Values are destination directory paths.
              Use empty string ("") for root level placement.
    """

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
        srcs = data_pkgs,
    )

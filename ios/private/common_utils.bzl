"""
Common utilities for ios builds
"""

load("@build_bazel_rules_apple//apple:resources.bzl", "apple_resource_bundle")
load("@build_bazel_rules_apple//apple:ios.bzl", "ios_ui_test", "ios_unit_test")
load("@build_bazel_rules_swift//swift:swift.bzl", "swift_library")
load("@rules_pkg//:mappings.bzl", "pkg_files", "strip_prefix")
load("@rules_pkg//:pkg.bzl", "pkg_zip")

def ios_bundle_module_shim(name):
    native.genrule(
        name = name + "ResourceShim",
        srcs = ["@rules_player//ios/private:ResourceShimTemplate.swift"],
        outs = [name + "ResourceShim.swift"],
        cmd = "sed 's/PLACEHOLDER/" + name + "/g' < $< > $@",
    )

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
        name = "podspec",
        srcs = [podspec],
        strip_prefix = strip_prefix.from_pkg(),
    )

    pkg_files(
        name = "srcs",
        srcs = srcs,
        strip_prefix = strip_prefix.from_pkg(),
    )

    data_pkgs = []
    for target in data:
        ident = "data_%d" % len(data_pkgs)
        pkg_files(
            name = ident,
            srcs = [target],
            strip_prefix = strip_prefix.from_pkg(),
            prefix = data[target],
        )
        data_pkgs.append(ident)

    pkg_zip(
        name = name,
        srcs = ["podspec", "srcs"] + data_pkgs,
    )

def ios_pipeline(
        name,
        resources,
        deps,
        test_deps,
        hasUnitTests,
        hasViewInspectorTests,
        test_host,
        hasUITests = False,
        needsXCTest = False,
        bundle_name = None):
    """Packages source files, creates swift library and tests for a swift PlayerUI plugin

    Args:
      name: The base name of this package
        Targets created by this macro prefix the name with 'PlayerUI'
      resources: Any resources to include in a resource bundle
        This will create a Bundle.module shim as well automatically
      deps: Dependencies for the plugin
      test_deps: Dependencies for the tests of this plugin
      hasUnitTests: Whether or not to generate ios_unit_test tests
      hasViewInspectorTests: Whether or not to generate ios_ui_test tests that require ViewInspector
      test_host: The target where the tests should run (Demo app target)
      hasUITests: Whether or not to generate ios_ui_test tests
      needsXCTest: Set the 'testonly' attribute on swift_library
      bundle_name: Pptionally override the name used for the resource bundle
    """

    # if we are backed by a JS package, these attributes
    # will be populated to add to the sources/resources of the
    # swift_library
    data = []
    resource_sources = []

    resolved_bundle_name = bundle_name if bundle_name != None else name

    if len(resources) > 0:
        apple_resource_bundle(
            name = name + "ResourceBundle",
            bundle_name = resolved_bundle_name,
            bundle_id = "com.intuit.ios.player.resources." + name,
            resources = resources,
        )

        ios_bundle_module_shim(resolved_bundle_name)
        data.append(":" + name + "ResourceBundle")
        resource_sources.append(":" + resolved_bundle_name + "ResourceShim")

    # Group up files to be used in swift_library
    # and in //:PlayerUI_Pod which builds the zip of sources
    pkg_files(
        name = name + "_Sources",
        srcs = native.glob(["Sources/**/*.swift"]),
        strip_prefix = strip_prefix.from_pkg(),
        visibility = ["//visibility:public"],
    )

    swift_library(
        name = name,
        module_name = name,
        srcs = [":" + name + "_Sources"] + resource_sources,
        visibility = ["//visibility:public"],
        testonly = needsXCTest,
        deps = deps,
        data = data,
        # this define makes Bundle.module extension work from ios_bundle_module_shim
        # TODO: Bazel upgrade requires `SWIFT_PACKAGE` to be set for our usage of it, 
        #       should likely have a better way to dynamically configure `-DSWIFT_PACKAGE`
        #       rather than applying it holistically to every `swift_library`
        defines = ["BAZEL_TARGET", "SWIFT_PACKAGE"],
    )

    # Packages not specific to SwiftUI don't need ViewInspector
    # so it can just be regular unit tests
    if hasUnitTests == True:
        ios_unit_test(
            name = name + "Tests",
            data = native.glob(["Tests/**/*.swift"]),
            minimum_os_version = "14.0",
            deps = [
                ":" + name,
            ] + deps + test_deps,
            visibility = ["//visibility:public"],
        )

    # ViewInspector has to run as a UI Test to work properly
    # Some SwiftUI plugins need ViewInspector
    if hasViewInspectorTests == True:
        libraryName = name + "TestLibrary"
        testTargetName = name + "ViewInspectorTests"
        swift_library(
            name = libraryName,
            srcs = native.glob(["ViewInspector/**/*.swift"]),
            tags = ["manual"],
            deps =  [
                "@swiftpkg_viewinspector//:ViewInspector",
                ":" + name,
            ] + deps + test_deps,
            testonly = True,
        )
        ios_ui_test(
            name = testTargetName,
            minimum_os_version = "14.0",
            deps = [":" + libraryName],
            visibility = ["//visibility:public"],
            test_host = test_host,
        )

    #Some SwiftUI plugins have UI tests without ViewInspector
    if hasUITests == True:
        ios_ui_test(
            name = name + "UITests",
            data = native.glob(["UITests/**/*.swift"]),
            minimum_os_version = "14.0",
            deps = [
            ] + deps + test_deps,
            visibility = ["//visibility:public"],
            test_host = test_host,
        )

    # Runs SwiftLint as a test calling the genrule target which outputs the result of linting
    native.sh_test(
        name = name + "SwiftLint",
        srcs = [":" + name + "_Lint"],
        visibility = ["//visibility:public"],
    )

    # Runs the SwiftLint as part of the build, if lint fails with serious violations defer the results for the test
    native.genrule(
        name = name + "_Lint",
        tools = [
            "@SwiftLint//:swiftlint",
        ],
        srcs = [":" + name + "_Sources"] + ["//:.swiftlint.yml"],
        outs = ["output.sh"],
        executable = True,
        testonly = True,
        visibility = ["//visibility:public"],
        cmd = """
      echo `$(location @SwiftLint//:swiftlint) --config $(location //:.swiftlint.yml) $(SRCS) || true` > lint_results.txt
      LINT=$$(cat lint_results.txt)

      echo '#!/bin/bash' > $(location output.sh)
      echo "echo '$$LINT'" > $(location output.sh)

      LINESWITHERROR=$$(echo grep error lint_results.txt || true)
      echo "exit $$(($$LINESWITHERROR) | wc -l)" >> $(location output.sh)
  """,
    )

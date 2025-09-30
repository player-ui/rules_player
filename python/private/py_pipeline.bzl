"""
Macro for a standard and easy approach for python development
"""

load("@bazel_skylib//rules:copy_directory.bzl", "copy_directory")
load("@rules_python//python:packaging.bzl", "py_wheel")
load("@rules_python//python:py_library.bzl", "py_library")
load("@rules_python//python:py_test.bzl", "py_test")
load(":build_requirements.bzl", "build_requirements")

def clean_version(semver_string):
    """

    Converts semvar to PEP440 compliant string

    Args:
        semver_string: string to convert
    Returns:
        string
    """
    version = semver_string

    # Handle next/canaries
    if "-" in semver_string:
        base_version, pre_release = semver_string.split("-", 1)
        pre_release = pre_release.replace("canary", "dev").replace("next", "rc").replace("-", "").replace(".", "")
        version = base_version + pre_release

    return str(version)

def py_pipeline(
        name,
        version,
        deps = [],
        test_deps = [],
        lint_deps = [],
        requirements_file = "//:requirements.txt",
        lint_config = ["//:.pylintrc"],
        **kwargs):
    """
    The main entry point for any python project. `python_pipeline` should be the only thing you need in your BUILD file.

    Creates a python library, setups tests, and a whl publishing target

    Args:
        name: The name of the package.
        deps: runtime dependencies
        test_deps: test dependencies (min: pytest)
        lint_deps: lint dependencies (min: pytest, pytest-list)
        version: the make variable that should be expanded for the whl version when published
        requirements_file: (default is "//:requirements.txt") base requirements.txt file
        lint_config: (default "//:.pylintrc) lint config
        **kwargs: additional args to pass into py_wheel for publishing info
    """

    srcs = native.glob(include = ["src/**/*.py"], exclude = ["**/__tests__/**/*"])
    test_files = native.glob(["src/**/__tests__/**/*.py"])
    all_files = native.glob(["src/**/*"], allow_empty = True)
    
    library_name = "{}_library".format(name)
    library_target = ":{}".format(library_name)

    # Publishable target
    py_library(
        name = library_name,
        srcs = srcs,
        deps = deps,
        visibility = ["//visibility:public"],
    )

    # Copy files into directory named after package to be able to link locally
    local_name = "{}_local".format(name)
    local_target = ":{}".format(local_name)
    copy_directory(
        name = local_name,
        src = "src",
        out = name,
    )

    # Target for local use
    py_library(
        name = name,
        srcs = [local_target],
        imports = ["."],
        visibility = ["//visibility:public"],
    )

    test_name = "{}_pytest".format(name)
    py_test(
        name = test_name,
        srcs = [
            "@rules_player//python/private:pytest_wrapper.py",
        ] + all_files,
        main = "@rules_player//python/private:pytest_wrapper.py",
        args = [
            "--capture=no",
        ] + ["$(location :%s)" % x for x in test_files],
        python_version = "PY3",
        srcs_version = "PY3",
        deps = deps + test_deps,
    )

    lint_name = "{}_pytest_lint".format(name)
    py_test(
        name = lint_name,
        srcs = [
            "@rules_player//python/private:pytest_wrapper.py",
        ] + srcs,
        main = "@rules_player//python/private:pytest_wrapper.py",
        args = [
            "--capture=no",
            "--pylint",
        ] + ["$(location :%s)" % x for x in srcs],
        python_version = "PY3",
        srcs_version = "PY3",
        deps = deps + lint_deps,
        data = lint_config
    )

    requirements_name = "{}_requirements".format(name)
    requirements_target = ":{}".format(requirements_name)

    build_requirements(
        name = requirements_name,
        root_requirements = requirements_file,
        package_names = deps,
    )

    py_wheel(
        name = "wheel",
        distribution = name,
        python_tag = "py3",
        version = clean_version(version),
        deps = [library_target],
        requires_file = requirements_target,
        strip_path_prefixes = [(native.package_name() + "/src")],
        **kwargs
    )

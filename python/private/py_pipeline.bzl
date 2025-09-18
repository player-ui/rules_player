"""
Macro for a standard and easy approach for python development
"""

load("@rules_python//python:py_library.bzl", "py_library")
load("@rules_python//python:py_test.bzl", "py_test")
load("@rules_python//python:packaging.bzl", "py_wheel", "py_package")
load(":build_requirements.bzl", "build_requirements")


# temp macro for python pipeline while its being developed
def py_pipeline(
        name, 
        deps = [], 
        test_deps = [],
        lint_deps = [],
        requirements_file = "//:requirements.txt",
        version_arg = "STABLE_VERSION",
        **kwargs):
    """
    The main entry point for any python project. `python_pipeline` should be the only thing you need in your BUILD file.

    Creates a python library, setups tests, and a whl publishing target

    Args:
        name: The name of the package.
        deps: runtime dependencies
        test_deps: test dependencies (min: pytest)
        lint_deps: lint dependencies (min: pytest, pytest-list)
        version_arg: the make variable that should be expanded for the whl version when published
        requirements_file: (default is "//:requirements.txt") base requirements.txt file
        **kwargs : additional args to pass into py_wheel for publishing info
    """
    
    srcs = native.glob(include = ["src/**/*.py"], exclude = ["**/__tests__/**/*"])
    all_files = native.glob(["src/**/__tests__/**/*.py"])

    library_name = "{}_library".format(name)
    library_target = ":{}".format(library_name)

    
    py_library(
        name = library_name,
        srcs = srcs,
        deps = deps,
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
        ] + ["$(location :%s)" % x for x in all_files],
        python_version = "PY3",
        srcs_version = "PY3",
        deps = deps + test_deps
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
            "--pylint"
           ] + ["$(location :%s)" % x for x in srcs],
        python_version = "PY3",
        srcs_version = "PY3",
        deps = deps + lint_deps
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
        version = "$("+ version_arg + ")",
        deps = [library_target],
        requires_file = requirements_target,
        strip_path_prefixes = [(native.package_name() + "/src")],
        **kwargs
    )
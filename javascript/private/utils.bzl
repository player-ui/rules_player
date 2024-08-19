"""
General utils for working in JS projects
"""

load("@aspect_rules_js//js:providers.bzl", "JsInfo")

def filter_empty(things):
    """
    Create a new array removing any empty values from the given array

    Args:
        things: The array to filter

    Returns:
        A new array
    """

    new_things = []
    for f in things:
        if f != None:
            new_things.append(f)
    return new_things

def remove_duplicates(data):
    """
    Create a new array removing any duplicate values from the given array

    Args:
        data: The array to filter

    Returns:
        A new array
    """

    filtered = []
    for d in data:
        if d in filtered:
            continue
        filtered.append(d)
    return filtered

def is_test_file(file, test_file_pattern):
    """
    Check if the given file matches the provided test patterns

    Args:
        file: A file path to test
        test_file_pattern: A list of globs to test against

    Returns:
        True if the given file patches the pattern
    """
    for p in test_file_pattern:
        if p in file:
            return True
    return False

def filter_false(arr):
    """
    Create a new array removing any falsy values from the given array

    Args:
        arr: The array to filter

    Returns:
        A new array
    """

    filtered = []
    for f in arr:
        if f:
            filtered.append(f)

    return filtered

def include_exts(files, file_patterns):
    return filter_false([f if is_test_file(f, file_patterns) else None for f in files])

def get_js_npm_name(dep):
    linked_list = dep[JsInfo].npm_package_store_infos.to_list()
    if len(linked_list) > 1:
        fail("Package {} has more than one linked package".format(dep[JsInfo].npm_package_store_infos.to_list()))

    return linked_list[0].package

def without_tests(files, test_file_pattern):
    return filter_false([f if not is_test_file(f, test_file_pattern) else None for f in files])

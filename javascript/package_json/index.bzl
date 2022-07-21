load(":merge_json.bzl", _merge_json = "merge_json")
load(":package_json.bzl", _create_package_json = "create_package_json")
load(":contributors.bzl", _create_contributors = "create_contributors")

merge_json = _merge_json
create_package_json = _create_package_json
create_contributors = _create_contributors
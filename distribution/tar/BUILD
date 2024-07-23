load("@aspect_rules_js//js:defs.bzl", "js_binary")
load("@npm//:defs.bzl", "npm_link_all_packages")

package(default_visibility = ["//visibility:public"])

load("@tar//:defs.bzl", npm_link_types_node = "npm_link_imported_package")

npm_link_types_node(name = "node_modules")

npm_link_all_packages(
    name = "node_modules",
)

js_binary(
    name = "stamp_tar_files",
    entry_point = "stamp_tar_files.js",
    visibility = ["//visibility:public"],
    data = [
        ":node_modules/tar"
        ],

)


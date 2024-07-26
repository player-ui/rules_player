
load("@npm//esbuild","esbuild_bin")
load("@npm//:defs.bzl","npm_link_all_packages")

load("@aspect_rules_js//js:defs.bzl","js_binary","js_library")

package(default_visibility = ["//visibility:public"])

npm_link_all_packages(
    name = "node_modules",
)
# js_library(
#     name = "gh-pages-ts",
#     srcs= ["gh-pages.ts"],
#     deps = [
#         "@npm//@types/node",
#     ]
# )
# nodejs_binary 

run tsup/gh-pages.ts 
-> that should point to this repo and output the gh-pages.js

player will call the bazel rule that calls the already generated gh-pages.js file


js_binary(
    name = "gh_pages",
    data = [],
    entry_point = ":gh-pages.js",

)

# js_library(
#     name = "tsup_config",
#     srcs = [ "tsup.config.ts"],
#     visibility = ["//visibility:public"],
#     deps = [
#         ":node_modules/tsup",
#         ":node_modules/typescript"
#         ":node_modules/gh-pages",
#         ":node_modules/yargs",
#         ":node_modules/tar"

#     ]
# )


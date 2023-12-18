load("@rules_player//javascript:defs.bzl", "js_pipeline")
load("@aspect_rules_js//js:defs.bzl", "js_library")

js_library(
    name = "vitest_config",
    srcs = ["vitest.config.ts"],
)

js_library(
    name = "tsup_config",
    srcs = ["tsup.config.ts"],
)

js_pipeline(
    package_name = "@test/module-a",
    tsup_config = "tsup.config.ts",
    vitest_config = "vitest.config.ts",
    deps = [
        "//:node_modules/@types/node",
    ],
)

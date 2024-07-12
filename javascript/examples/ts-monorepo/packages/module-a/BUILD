load("@rules_player//javascript:defs.bzl", "js_pipeline")

js_pipeline(
    package_name = "@test/module-a",
    tsup_config = "tsup.config.ts",
    vitest_config = "vitest.config.ts",
    deps = [
        "//:node_modules/@types/node",
    ],
)

load("@player-ui_rules_player//:index.bzl", _js_library_pipeline = "js_library_pipeline")

DATA = []
TEST_DATA = [
    "//:babel.config.js",
    "@npm//@babel/preset-typescript",
    "@npm//@babel/preset-env",
]
BUILD_DATA = []
LINT_DATA = [
    "//:.eslintrc.js",
    "@npm//eslint-plugin-jest",
    "@npm//@babel/eslint-parser"
]

def js_library_pipeline(
        name,
        srcs,
        entry,
        dependencies = [],
        peer_dependencies = [],
        **kwargs):
    _js_library_pipeline(
        name = name,
        srcs = srcs,
        entry = entry,
        dependencies = dependencies,
        peer_dependencies = peer_dependencies,
        eslint_config = None,
        data = DATA,
        test_data = TEST_DATA,
        build_data = BUILD_DATA,
        lint_data = LINT_DATA,
        **kwargs
    )

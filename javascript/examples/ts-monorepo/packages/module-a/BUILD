load("@build_bazel_rules_nodejs//:index.bzl", "generated_file_test")
load("//:index.bzl", "js_library_pipeline")

js_library_pipeline(
    name = "@test/module-a",
    srcs = glob(["src/*"]) + ["README.md"],
    entry = "./src/index.ts",
    peer_dependencies = [
        "@npm//typescript",
    ],
)

generated_file_test(
    name = "package-json-test",
    src = "package.test.json",
    generated = ":@test/module-a-package_json",
)

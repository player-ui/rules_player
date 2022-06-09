load("@build_bazel_rules_nodejs//:index.bzl", "generated_file_test")
load("//:index.bzl", "js_library_pipeline")

js_library_pipeline(
    name = "@test/module-b",
    srcs = glob(["files/**"]),
    bin_entry = "./files/cli.ts",
    dependencies = [
        "//packages/module-a:@test/module-a",
    ],
    entry = "./files/entry.ts",
)

generated_file_test(
    name = "package-json-test",
    src = "package.test.json",
    generated = ":@test/module-b-package_json",
)

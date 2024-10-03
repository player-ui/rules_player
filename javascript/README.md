# JavaScript rules

This is a guide to use JavaScript rules.

## Example usage of `eslint_test`
Code example can be found [here](https://github.intuit.com/mercillo/autoregistrationfees/commit/f062bf4db9cb697ff834ad9c7de8524132867f7d).

### Linting dependencies installation
Install all linting dependencies as `devDependencies`.

```
  "devDependencies": {
    "@typescript-eslint/eslint-plugin": "^5.1.0",
    "@typescript-eslint/parser": "^5.1.0",
    "eslint": "^8.54.0",
    "eslint-plugin-react": "7.37.1",
    "eslint-plugin-prettier": "5.2.1"
  },
```

### Add eslint config
Add `.eslintrc.js` ([example](https://github.intuit.com/mercillo/autoregistrationfees/blob/f062bf4db9cb697ff834ad9c7de8524132867f7d/.eslintrc.js)) and export target `eslint_configs`
```
js_library(
    name = "eslint_configs",
    srcs = [
        ".eslintrc.js",
    ],
    visibility = ["//visibility:public"],
)
```

### Load eslint_test in bazel BUILD

1. load eslint_test from @rules_player
```
load("@rules_player//javascript:defs.bzl", "eslint_test")
```

2. Define build and lint dependencies
```
deps = [
    "//:node_modules/react",
    "//:node_modules/@types/react",
    "//:node_modules/@cg-player/components",
    "//:node_modules/@cg-player/common-types-plugin",
    "//:node_modules/@player-ui/types",
    "//:node_modules/@player-tools/dsl",
    "//:node_modules/@player-ui/make-flow",
    "//:node_modules/@ctg-topics/cg-topic-dsl-utils",
]

lint_deps = [
    "//:node_modules/eslint",
    "//:node_modules/eslint-plugin-react",
    "//:node_modules/eslint-plugin-prettier",
    "//:node_modules/@typescript-eslint/eslint-plugin",
    "//:node_modules/@typescript-eslint/parser",
]
```

3. Define your source files to run lint on
```
ALL_SRCS = glob(["flows/*.tsx", "flows/*.ts"])
```

4. eslint-test

```
eslint_test(
    name = "player-lint",
    node_modules = "//:node_modules",
    srcs = ALL_SRCS,
    data = ["//.eslint_configs.js"] + ALL_SRCS + deps + lint_deps
)
```

### Test 

Run bazel test command on the target your BUILD file located.

```
bazel test //player/...
```
or direcly by the name of `eslint_test`
```
bazel test //player:player-lint
```

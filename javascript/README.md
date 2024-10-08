# JavaScript rules

This guide provides instructions on using JavaScript rules.

## Example usage of `eslint_test`

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
Add `.eslintrc.js` and export target `eslint_configs`
`.eslintrc.js` with example configs: 
```
module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["node_modules", "dist", "__snapshots__"],
  plugins: ["@typescript-eslint", "prettier"],
  rules: {
    "prettier/prettier": "error",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-empty-function": "off",
    "react/no-unescaped-entities": "off",
  },
  root: true,
};
```

`eslint_configs`:
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

There may be more dependencies required for your build, but these are the required linting, react, and player ones needed.

```
deps = [
    "//:node_modules/react",
    "//:node_modules/@types/react",
    "//:node_modules/@player-ui/types",
    "//:node_modules/@player-tools/dsl",
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

# Player Specific Rules/Macros
The rules in this folder are a bit more specific for player use-cases. 


## VSCE

The VSCE rules aid with bundling, stamping, and publishing vscode extensions. 

```python
load("@rules_player//player/vsce:index.bzl", "vsce")

vsce(
    name = "vscode-ext",
    substitutions = {
        "__VERSION__": "{STABLE_VERSION}",
        "0.0.0-PLACEHOLDER": "{STABLE_VERSION}",
        "__GIT_COMMIT__": "{STABLE_GIT_COMMIT}",
    },
    data = [
        "package.json",
        ".vscodeignore"
    ] + glob(["syntaxes/*"])
)
```

Then to build publish the extension:

```sh
bazel build //packages/vscode:vscode-ext
bazel run //packages/vscode:vscode-ext.publish
```


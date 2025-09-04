# Automatically format all bzl files. You probably want to do this before committing.
# It is super slow though :/.
format:
    #!/usr/bin/env bash
    set -euo pipefail
    targets=$(bazel query "attr(name, 'bzlformat_update', '//...')" --output label 2>/dev/null)
    for target in $targets; do
        echo "Running bzlformat_update for $target"
        bazel run "$target"
    done
#!/usr/bin/env bash
#
# Launcher script for `abi_update_all`. Discovers every `abi_update` target in
# the workspace via `bazel cquery` and runs each one in sequence.
#
# This script is intended to be invoked through `bazel run` so the launcher
# `exec`s in place (releasing the outer command lock) before issuing nested
# `bazel` invocations.

set -euo pipefail

if [[ -z "${BUILD_WORKSPACE_DIRECTORY:-}" ]]; then
    echo "error: this target must be invoked with 'bazel run' so BUILD_WORKSPACE_DIRECTORY is set" >&2
    exit 1
fi

cd "${BUILD_WORKSPACE_DIRECTORY}"

bazel="${BIT_BAZEL_BINARY:-bazel}"

# Enumerate every abi_update target in the workspace. `cquery --output=label`
# appends a configuration hash like " (7f8856b)" to each line, so strip
# everything from the first space onward.
update_targets=()
while IFS=$'\n' read -r line; do
    label="${line%% *}"
    [[ -n "${label}" ]] && update_targets+=("${label}")
done < <(
    "${bazel}" cquery 'kind(abi_update, //...)' --output=label 2>/dev/null | sort -u
)

if [[ ${#update_targets[@]} -eq 0 ]]; then
    echo "abi_update_all: no abi_update targets found in this workspace"
    exit 0
fi

for target in "${update_targets[@]}"; do
    echo "==> Running ${target}"
    "${bazel}" run "${target}"
done

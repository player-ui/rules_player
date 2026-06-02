#!/usr/bin/env bash
#
# Generic launcher that enumerates every target of a given rule kind in the
# consumer's workspace via `bazel cquery` and runs each in sequence.
#
# Intended to be the `srcs` of a wrapping `sh_binary` that passes `--kind` (and
# optionally `--mode`) so each callsite produces a distinct, ergonomic launcher
# like `abi_update_all` or `ktlint_all`.
#
# The wrapper must be invoked through `bazel run` so this script `exec`s in
# place (releasing the outer command lock) before it issues nested `bazel`
# invocations.

set -euo pipefail

usage() {
    cat >&2 <<'EOF'
Usage: run_all_of_kind --kind <rule_kind> [--mode run|build|test] [--scope <pattern>]

Options:
    --kind   Bazel rule kind to enumerate (e.g. abi_update, ktlint_fix). Required.
    --mode   bazel command to invoke for each discovered target. Defaults to "run".
    --scope  Target pattern to query within. Defaults to "//...".
EOF
    exit 2
}

KIND=""
MODE="run"
SCOPE="//..."

while [[ $# -gt 0 ]]; do
    case "$1" in
        --kind) KIND="$2"; shift 2 ;;
        --mode) MODE="$2"; shift 2 ;;
        --scope) SCOPE="$2"; shift 2 ;;
        -h|--help) usage ;;
        *) echo "unknown option: $1" >&2; usage ;;
    esac
done

[[ -n "$KIND" ]] || { echo "error: --kind is required" >&2; usage; }

if [[ -z "${BUILD_WORKSPACE_DIRECTORY:-}" ]]; then
    echo "error: this target must be invoked with 'bazel run' so BUILD_WORKSPACE_DIRECTORY is set" >&2
    exit 1
fi

cd "${BUILD_WORKSPACE_DIRECTORY}"

bazel="${BIT_BAZEL_BINARY:-bazel}"

# Enumerate every target of $KIND. `query --output=label` appends a
# configuration hash like " (7f8856b)" to each line, so strip everything from
# the first space onward.
targets=()
while IFS=$'\n' read -r line; do
    label="${line%% *}"
    [[ -n "${label}" ]] && targets+=("${label}")
done < <(
    "${bazel}" query "kind(${KIND}, ${SCOPE})" --output=label 2>/dev/null | sort -u
)

if [[ ${#targets[@]} -eq 0 ]]; then
    echo "run_all_of_kind: no ${KIND} targets found in ${SCOPE}"
    exit 0
fi

for target in "${targets[@]}"; do
    echo "==> ${MODE} ${target}"
    "${bazel}" "${MODE}" "${target}"
done

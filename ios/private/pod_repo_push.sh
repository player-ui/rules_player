set -e
echo "{POD} {SUBCOMMANDS} repo add {GLOBAL_FLAGS} bazel_publish_repo {REPOSITORY}" 1>&2
"{POD}" {SUBCOMMANDS} repo add {GLOBAL_FLAGS} bazel_publish_repo {REPOSITORY} 1>&2
echo "{POD} {SUBCOMMANDS} repo push {GLOBAL_FLAGS} {PUSH_FLAGS} {REPOSITORY} {PODSPEC}" 1>&2
"{POD}" {SUBCOMMANDS} repo push {GLOBAL_FLAGS} {PUSH_FLAGS} {REPOSITORY} {PODSPEC} 1>&2
echo "{POD} {SUBCOMMANDS} repo remove {GLOBAL_FLAGS} bazel_publish_repo" 1>&2
"{POD}" {SUBCOMMANDS} repo remove {GLOBAL_FLAGS} bazel_publish_repo 1>&2
"""
Private helpers for referencing Maven artifacts from this repo's BUILD files.

`rules_player_maven` is the named `rules_jvm_external` repository this repo
installs its own JVM dependencies into. `maven_artifact()` wraps the upstream
`artifact()` helper so callers can pass plain Maven coordinates without having
to repeat `repository_name = "rules_player_maven"` at every call site.
"""

load("@rules_jvm_external//:defs.bzl", _upstream_artifact = "artifact")

_REPOSITORY_NAME = "rules_player_maven"

def artifact(coordinates):
    """Resolve a Maven artifact label inside this repo's `rules_player_maven` namespace.

    Args:
        coordinates: Maven coordinates in `group:name` form
            (e.g. `org.ow2.asm:asm`). Versions are pinned in MODULE.bazel.

    Returns:
        A label string pointing at the artifact within `@rules_player_maven`.
    """
    return _upstream_artifact(coordinates, repository_name = _REPOSITORY_NAME)

#!/usr/bin/env bash

set -u -e -o pipefail

# Called by auto -- `release` for normal releases or `snapshot` for canary/next.
readonly RELEASE_TYPE=${1:-snapshot}

# TODO: It'd be really nice to encapsulate this into a rule -- but requires touching the workspace and during wildcard queries
if [ "$RELEASE_TYPE" == "snapshot" ]; then
  # Need to add snapshot identifier for snapshot releases
  cp VERSION VERSION.bak
  echo -n -SNAPSHOT >> VERSION
elif [ "$RELEASE_TYPE" == "release" ]; then
  # Prep staging repo
  readonly STAGING=$(bazel run @rules_player//rules/distribution:nexus-staging-cli -- --package-group=com.jeremiahzucker)
fi

# Find all the maven packages in the repo
readonly DEPLOY_LABELS=$(bazel query --output=label 'kind("deploy_maven rule", //...) - attr("tags", "\[.*do-not-publish.*\]", //...)')
for pkg in $DEPLOY_LABELS ; do
  if [ -n "${STAGING-}" ]; then
    bazel run "$pkg" --define=DEPLOY_MAVEN_RELEASE_REPO="$STAGING" -- "$1" --gpg
  else
    bazel run "$pkg" -- "$1" --gpg
  fi
done

if [ -n "${STAGING-}" ]; then
  # Close and release staging repo
  bazel run rules_player//rules/distribution:nexus-staging-cli -- --staging-id="${STAGING##*/}"
fi

# Cleanup
if [ -f VERSION.bak ]; then
  rm VERSION
  mv VERSION.bak VERSION
fi

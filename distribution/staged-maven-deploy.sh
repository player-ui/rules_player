#!/usr/bin/env bash

set -u -e -o pipefail

# First arg must be release type followed by any args to pass to the nexus-staging-cli, i.e. --package-group=com.example

# Execute from the actual top level workspace
cd $BUILD_WORKSPACE_DIRECTORY

# Called by auto -- `release` for normal releases or `snapshot` for canary/next.
readonly RELEASE_TYPE=${1}

# TODO: It'd be really nice to encapsulate this into a rule -- but requires touching the workspace and during wildcard queries
if [ "$RELEASE_TYPE" == "snapshot" ]; then
  # Need to add snapshot identifier for snapshot releases
  cp VERSION VERSION.bak
  echo -n -SNAPSHOT >> VERSION
elif [ "$RELEASE_TYPE" == "release" ]; then
  # Prep staging repo
  readonly STAGING=$(bazel run @rules_player//distribution:nexus-staging-cli -- "${@:2}")
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
  bazel run @rules_player//distribution:nexus-staging-cli -- "${@:2}" --staging-id="${STAGING##*/}"
fi

# Cleanup
if [ -f VERSION.bak ]; then
  rm VERSION
  mv VERSION.bak VERSION
fi

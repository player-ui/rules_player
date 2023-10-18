#!/usr/bin/env bash

set -u -e -o pipefail

function runtest(){
  ROOT=$(pwd)
  testDir=$1
  cd $testDir
  cp $ROOT/.bazelversion .
  bazel clean --async
  bazel test //...
  bazel clean
  rm .bazelversion
  cd $ROOT
}

#Workaround for now. Since tests can be nested at two different levels we need to use two regexes

workspace_dirs=$(find ./*/** -type f -name 'WORKSPACE' | sed -r 's|/[^/]+$||' |sort |uniq)

for dir in $workspace_dirs
do
  echo "Running tests in $dir"
  runtest $dir
  echo "Done with $dir"
done
# If we're not being run with --stamp we can't get the version
# so fail early if the file we need doesn't exist
if ! [ -f stable-status.txt ]; then
    echo "Must be run with --stamp and provide STABLE_VERSION through workspace status"
    exit 1
fi

# We only need the version, so find that line and grab the value
# (lines are space delimited in stable-status.txt)
VERSION_NUMBER=$(cat stable-status.txt | grep STABLE_VERSION | cut -d' ' -f2)

BRANCH="{TARGET_BRANCH}"

# Change the target branch if this is not a stable release
if [[ $VERSION_NUMBER =~ "-" ]]; then
    echo "Prerelease/Canary"
    BRANCH=$(echo $VERSION_NUMBER | cut -d- -f1)
fi

echo "Using version $VERSION_NUMBER for new release."

# Locally bazel didn't always clean up the cloned repository
# so this is a guard in the event that happens in CI
if [ -d publishRepo ]; then
    rm -rf publishRepo
fi

# Clone the target repository
git clone {REPOSITORY} publishRepo

cd publishRepo

git fetch --all

# Switches to the target branch
git checkout -b $BRANCH

# Unzip contents and overwrite files in the target repository
unzip -o ../{ZIP} -d .

# Commit files
git add . && git commit -m "Version $VERSION_NUMBER"

# Tag commit
git tag -a $VERSION_NUMBER -m "Version $VERSION_NUMBER"

echo "Pushing new tag $VERSION_NUMBER to {REPOSITORY}"

# Push commit and tags to repository
git push -f --follow-tags origin refs/heads/$BRANCH:refs/heads/$BRANCH
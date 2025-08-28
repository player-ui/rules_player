#!/bin/bash
# Wrapper script to run BATS tests in Bazel environment

set -euo pipefail

# Check if BATS is installed
if ! command -v bats >/dev/null 2>&1; then
    echo "❌ BATS is not installed. Please install it first:"
    echo ""
    echo "On macOS:"
    echo "  brew install bats-core"
    echo ""
    echo "On Ubuntu/Debian:"
    echo "  sudo apt-get install bats"
    echo ""
    echo "Or install manually:"
    echo "  git clone https://github.com/bats-core/bats-core.git"
    echo "  cd bats-core"
    echo "  sudo ./install.sh /usr/local"
    echo ""
    exit 1
fi

# Get the BATS test file from command line argument
BATS_TEST_FILE="$1"

if [[ ! -f "$BATS_TEST_FILE" ]]; then
    echo "❌ BATS test file not found: $BATS_TEST_FILE"
    exit 1
fi

echo "🧪 Running BATS tests: $BATS_TEST_FILE"
echo "======================================"

# Run BATS with the test file
exec bats "$BATS_TEST_FILE"

#!/bin/bash

# Script to help discover all iOS targets that should be included in ios_spm_package
# This analyzes your entire codebase and suggests what to include
#
# Generated with Cursor by Koriann South on August 29, 2025
#
# Usage:
#   bazel run //:discover-ios-targets
#   OR
#   ./helpers/release/discover-ios-targets.sh
#
# Manual Discovery Commands:
#   # Find all Swift source targets:
#   bazel query "//..." | grep "_Sources$" | grep -E "(swiftui|ios)"
#
#   # Find all JS native bundles:
#   bazel query "//..." | grep ":core_native_bundle$"
#
#   # Find all targets in workspace:
#   bazel query "//..."

set -euo pipefail

# Check if output file argument is provided
if [[ $# -lt 1 ]]; then
    echo "Usage: $0 <output_file> [variable_name]"
    echo "Example: $0 ios_targets.bzl"
    echo "Example: $0 ios_targets.bzl my_sources"
    exit 1
fi

OUTPUT_FILE="$1"
VARIABLE_NAME="${2:-sources}"  # Default to "sources" if not provided

echo "🔍 Discovering all iOS targets for ios_spm_package..."
echo "📝 Output file: $OUTPUT_FILE"
echo "🏷️  Variable name: $VARIABLE_NAME"
echo ""

if [[ -n "${BUILD_WORKSPACE_DIRECTORY:-}" ]]; then
    # Running through bazel run - change to workspace directory
    cd "$BUILD_WORKSPACE_DIRECTORY"
fi

# Find all Swift source targets across the entire workspace
echo "📱 All Swift Source Targets:"
echo "============================"
ALL_SWIFT_SOURCES=$(bazel query "//..." 2>/dev/null | grep "_Sources$" | grep -E "(swiftui|ios)" | sort)

if [[ -n "$ALL_SWIFT_SOURCES" ]]; then
    echo "$ALL_SWIFT_SOURCES"
else
    echo "No Swift source targets found."
fi

echo ""

# Find all JS native bundles that could be used as resourceTargets
echo "📦 All JS Native Bundles:"
echo "========================="
ALL_JS_BUNDLES=$(bazel query "//..." 2>/dev/null | grep ":core_native_bundle$" | sort)

if [[ -n "$ALL_JS_BUNDLES" ]]; then
    echo "$ALL_JS_BUNDLES"
else
    echo "No JS native bundles found."
fi

echo ""

# Generate the .bzl file with discovered targets
echo "💡 Generating $OUTPUT_FILE..."

cat > "$OUTPUT_FILE" << EOF
"""
iOS targets discovered by discover_ios_targets.sh
Generated with Cursor by Koriann South on August 29, 2025
"""

$VARIABLE_NAME = [
EOF

if [[ -n "$ALL_SWIFT_SOURCES" ]]; then
    while IFS= read -r source_target; do
        if [[ -n "$source_target" ]]; then
            # Try to find corresponding JS bundle by extracting the base path
            # This handles patterns like:
            # //plugins/fancy/swiftui:ExampleFancyPlugin_Sources -> //plugins/fancy/core:core_native_bundle
            # //assets/fancy-dog/swiftui:ExampleFancyDogAsset_Sources -> //assets/fancy-dog/core:core_native_bundle
            
            base_path=$(echo "$source_target" | sed 's|\(//[^/]*/[^/]*\)/.*|\1|')
            js_bundle="${base_path}/core:core_native_bundle"
            
            # Check if JS bundle exists
            if echo "$ALL_JS_BUNDLES" | grep -q "^$js_bundle$"; then
                echo "    {" >> "$OUTPUT_FILE"
                echo "        \"target\": \"$source_target\"," >> "$OUTPUT_FILE"
                echo "        \"resourceTarget\": \"$js_bundle\"," >> "$OUTPUT_FILE"
                echo "    }," >> "$OUTPUT_FILE"
            else
                echo "    \"$source_target\",  # No JS bundle found" >> "$OUTPUT_FILE"
            fi
        fi
    done <<< "$ALL_SWIFT_SOURCES"
fi

echo "]" >> "$OUTPUT_FILE"

echo "✅ Generated $OUTPUT_FILE with $(grep -c '"target":\|^    "' "$OUTPUT_FILE" || echo "0") targets"
echo ""
echo "📋 Usage Instructions:"
echo "====================="
echo "1. Load the '$VARIABLE_NAME' variable from $OUTPUT_FILE in your BUILD file:"
echo "   load(\":$OUTPUT_FILE\", \"$VARIABLE_NAME\")"
echo "2. Use it in your ios_spm_package rule:"
echo "   sources = $VARIABLE_NAME"
echo "3. Review each target and remove any you don't want to publish"
#!/usr/bin/env bats

# Generated with Cursor by Koriann South, Aug 28, 2025.
# BATS tests for zip assembly functions (assemble_pod and assemble_package)

setup() {
    # Create a temporary directory for test workspace
    TEST_TEMP_DIR="$(mktemp -d)"
    export TEST_TEMP_DIR
    
    # Find the runfiles directory where our test data is located
    if [[ -n "${TEST_SRCDIR:-}" ]]; then
        RUNFILES_DIR="$TEST_SRCDIR/_main"
    elif [[ -n "${RUNFILES_DIR:-}" ]]; then
        RUNFILES_DIR="$RUNFILES_DIR/_main"
    else
        # Fallback for when running directly
        RUNFILES_DIR="$(cd "${BATS_TEST_DIRNAME}/../../.." && pwd)"
    fi
    export RUNFILES_DIR
}

teardown() {
    if [[ -n "${TEST_TEMP_DIR:-}" && -d "$TEST_TEMP_DIR" ]]; then
        /bin/rm -rf "$TEST_TEMP_DIR"
    fi
}

@test "assemble_pod creates basic zip successfully" {
    # Find the pre-built zip file in runfiles
    local zip_file="$RUNFILES_DIR/ios/private/tests/test_pod_basic.zip"
    [ -f "$zip_file" ]
    
    # Extract and verify contents
    cd "$TEST_TEMP_DIR"
    run unzip -q "$zip_file"
    [ "$status" -eq 0 ]
    
    # Check that required files are present (they're in resources/ subdirectory)
    [ -f "resources/test.podspec" ]
    [ -f "resources/TestSource.swift" ]
}

@test "assemble_pod with data creates zip with resources" {
    # Find the pre-built zip file in runfiles
    local zip_file="$RUNFILES_DIR/ios/private/tests/test_pod_with_data.zip"
    [ -f "$zip_file" ]
    
    # Extract and verify contents
    cd "$TEST_TEMP_DIR"
    run unzip -q "$zip_file"
    [ "$status" -eq 0 ]
    
    # Check that all files are present
    [ -f "resources/test.podspec" ]
    [ -f "resources/TestSource.swift" ]
    [ -f "Resources/resources/TestResource.txt" ]
    
    # Verify content of resource file
    run cat "Resources/resources/TestResource.txt"
    [[ "$output" == *"test resource file"* ]]
}

@test "assemble_package creates basic SPM zip successfully" {
    # Find the pre-built zip file in runfiles
    local zip_file="$RUNFILES_DIR/ios/private/tests/test_package_basic.zip"
    [ -f "$zip_file" ]
    
    # Extract and verify contents
    cd "$TEST_TEMP_DIR"
    run unzip -q "$zip_file"
    [ "$status" -eq 0 ]
    
    # Check that Package.swift is present
    [ -f "resources/Package.swift" ]
    
    # Verify Package.swift contains expected content
    run cat "resources/Package.swift"
    [[ "$output" == *"TestPackage"* ]]
    [[ "$output" == *"swift-tools-version"* ]]
}

@test "assemble_package with plugins creates structured zip" {
    # Find the pre-built zip file in runfiles
    local zip_file="$RUNFILES_DIR/ios/private/tests/test_package_with_plugins.zip"
    [ -f "$zip_file" ]
    
    # Extract and verify contents
    cd "$TEST_TEMP_DIR"
    run unzip -q "$zip_file"
    [ "$status" -eq 0 ]
    
    # Check that Package.swift is present at the root level
    [ -f "resources/Package.swift" ]
    
    # Check that the plugin file is placed in the correct structure
    # Plugin path: "resources/TestSource.swift" -> resources/TestSource.swift/resources/TestSource.swift
    [ -f "resources/TestSource.swift/resources/TestSource.swift" ]
    
    # Verify the plugin directory structure exists
    [ -d "resources/TestSource.swift" ]
    [ -d "resources/TestSource.swift/resources" ]
    
    # List all files to see the structure (for debugging)
    run find . -type f | sort
    echo "Files in zip: $output"
    
    # Verify we have exactly the expected files (Package.swift + plugin file)
    local file_count=$(find . -type f | wc -l)
    [ "$file_count" -eq 2 ]
}

@test "assemble_package with dict config creates proper structure" {
    # Find the pre-built zip file in runfiles
    local zip_file="$RUNFILES_DIR/ios/private/tests/test_package_with_dict_config.zip"
    [ -f "$zip_file" ]
    
    # Extract and verify contents
    cd "$TEST_TEMP_DIR"
    run unzip -q "$zip_file"
    [ "$status" -eq 0 ]
    
    # Check that Package.swift is present at the root level
    [ -f "resources/Package.swift" ]
    
    # Verify plugin structure with custom path "plugins/test"
    [ -d "plugins" ]
    [ -d "plugins/test" ]
    [ -d "plugins/test/resources" ]
    [ -f "plugins/test/resources/TestSource.swift" ]
    
    # Verify asset structure with custom path "assets/test"
    [ -d "assets" ]
    [ -d "assets/test" ]
    [ -d "assets/test/resources" ]
    [ -f "assets/test/resources/TestSource.swift" ]
    
    # List all files to see the structure (for debugging)
    run find . -type f | sort
    echo "Files in zip: $output"
    
    # Verify we have exactly the expected files (Package.swift + plugin + asset)
    local file_count=$(find . -type f | wc -l)
    [ "$file_count" -eq 3 ]
}

@test "assemble_package with resourceTargets creates Resources directories" {
    # Find the pre-built zip file in runfiles
    local zip_file="$RUNFILES_DIR/ios/private/tests/test_package_with_resources.zip"
    [ -f "$zip_file" ]
    
    # Extract and verify contents
    cd "$TEST_TEMP_DIR"
    run unzip -q "$zip_file"
    [ "$status" -eq 0 ]
    
    # Check that Package.swift is present at the root level
    [ -f "resources/Package.swift" ]
    
    # Verify plugin structure with main target and resourceTarget
    [ -d "plugins/fancy" ]
    [ -d "plugins/fancy/resources" ]
    [ -f "plugins/fancy/resources/TestSource.swift" ]
    [ -d "plugins/fancy/Resources" ]
    [ -d "plugins/fancy/Resources/resources" ]
    [ -f "plugins/fancy/Resources/resources/TestResource.txt" ]
    
    # Verify asset structure with main target and resourceTarget
    [ -d "assets/fancy" ]
    [ -d "assets/fancy/resources" ]
    [ -f "assets/fancy/resources/TestSource.swift" ]
    [ -d "assets/fancy/Resources" ]
    [ -d "assets/fancy/Resources/resources" ]
    [ -f "assets/fancy/Resources/resources/TestResource.txt" ]
    
    # List all files to see the structure (for debugging)
    run find . -type f | sort
    echo "Files in zip: $output"
    
    # Verify we have exactly the expected files:
    # Package.swift + plugin source + plugin resource + asset source + asset resource = 5
    local file_count=$(find . -type f | wc -l)
    [ "$file_count" -eq 5 ]
    
    # Verify the content of resource files is preserved
    run cat "plugins/fancy/Resources/resources/TestResource.txt"
    [[ "$output" == *"This is a test resource file used for testing zip assembly functionality."* ]]
    
    run cat "assets/fancy/Resources/resources/TestResource.txt" 
    [[ "$output" == *"This is a test resource file used for testing zip assembly functionality."* ]]
}

@test "zip files are valid archives" {
    # Test that each zip can be listed without errors
    local zip_file
    
    zip_file="$RUNFILES_DIR/ios/private/tests/test_pod_basic.zip"
    [ -f "$zip_file" ]
    run unzip -l "$zip_file"
    [ "$status" -eq 0 ]
    
    zip_file="$RUNFILES_DIR/ios/private/tests/test_pod_with_data.zip"
    [ -f "$zip_file" ]
    run unzip -l "$zip_file"
    [ "$status" -eq 0 ]
    
    zip_file="$RUNFILES_DIR/ios/private/tests/test_package_basic.zip"
    [ -f "$zip_file" ]
    run unzip -l "$zip_file"
    [ "$status" -eq 0 ]
}

@test "podspec content is preserved correctly" {
    # Find the pre-built zip file
    local zip_file="$RUNFILES_DIR/ios/private/tests/test_pod_basic.zip"
    [ -f "$zip_file" ]
    
    # Extract and check podspec content
    cd "$TEST_TEMP_DIR"
    run unzip -q "$zip_file"
    [ "$status" -eq 0 ]
    
    # Verify podspec contains expected metadata
    run cat "resources/test.podspec"
    [[ "$output" == *"TestPod"* ]]
    [[ "$output" == *"1.0.0"* ]]
    [[ "$output" == *"Pod::Spec.new"* ]]
    [[ "$output" == *"swift_version"* ]]
}

@test "Package.swift content is preserved correctly" {
    # Find the pre-built zip file
    local zip_file="$RUNFILES_DIR/ios/private/tests/test_package_basic.zip"
    [ -f "$zip_file" ]
    
    # Extract and check Package.swift content
    cd "$TEST_TEMP_DIR"
    run unzip -q "$zip_file"
    [ "$status" -eq 0 ]
    
    # Verify Package.swift contains expected metadata
    run cat "resources/Package.swift"
    [[ "$output" == *"TestPackage"* ]]
    [[ "$output" == *"swift-tools-version: 5.7"* ]]
    [[ "$output" == *"Package("* ]]
    [[ "$output" == *".iOS(.v12)"* ]]
}
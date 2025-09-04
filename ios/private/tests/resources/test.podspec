Pod::Spec.new do |spec|
  spec.name         = "TestPod"
  spec.version      = "1.0.0"
  spec.summary      = "A test podspec for unit testing"
  spec.description  = "This is a test podspec used for verifying assemble_pod functionality"
  spec.homepage     = "https://example.com/TestPod"
  spec.license      = { :type => "MIT", :file => "LICENSE" }
  spec.author       = { "Test Author" => "test@example.com" }
  spec.source       = { :git => "https://github.com/example/TestPod.git", :tag => "#{spec.version}" }
  spec.ios.deployment_target = "12.0"
  spec.swift_version = "5.0"
  spec.source_files  = "Sources/**/*.{swift,h,m}"
end

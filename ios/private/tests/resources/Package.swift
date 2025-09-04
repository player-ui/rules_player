// swift-tools-version: 5.7
import PackageDescription

let package = Package(
    name: "TestPackage",
    platforms: [
        .iOS(.v12)
    ],
    products: [
        .library(
            name: "TestPackage",
            targets: ["TestPackage"]
        ),
    ],
    dependencies: [],
    targets: [
        .target(
            name: "TestPackage",
            dependencies: []
        ),
        .testTarget(
            name: "TestPackageTests",
            dependencies: ["TestPackage"]
        ),
    ]
)

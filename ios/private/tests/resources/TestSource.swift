import Foundation

public struct TestSource {
    public let name: String
    
    public init(name: String) {
        self.name = name
    }
    
    public func greet() -> String {
        return "Hello from \(name)!"
    }
}

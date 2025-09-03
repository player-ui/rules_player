# Contributing to rules_player

Thank you for your interest in contributing to rules_player! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

1. **Bazel**: Install the version specified in `.bazelversion`
2. **Node.js and yarn**: For JavaScript/TypeScript development
3. **Java**: For Kotlin development


### Development Workflow

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/rules_player.git
   cd rules_player
   ```

2. **Install Dependencies**
   ```bash
   pnpm i
   ```

3. **Run Tests**
   ```bash
   bazel test //...
   ```

4. **Code Formatting**
   ```bash
   # Format Bazel files
   bazel run //:bzlformat
   
   # Check formatting
   bazel test //... --test_tag_filters=bzlformat
   ```

## Project Structure

This repository provides Bazel rules for building Player UI applications across multiple platforms:

- `kotlin/` - Kotlin/JVM build rules
- `javascript/` - JavaScript/TypeScript build rules  
- `ios/` - iOS/Swift build rules
- `player/` - Player CLI and plugin rules
- `examples/` - Example projects and integration tests

## Testing

### Integration Tests

The primary testing strategy uses `bazel_integration_test` to validate rules work in real projects:

- `//examples:kotlin-test` - Tests Kotlin rules
- `//examples:ts-monorepo-test` - Tests JavaScript/TypeScript rules

### Adding New Tests

1. **For Bazel Rules**: Add integration tests in `examples/`
2. **For Shell Scripts**: Add BATS tests in appropriate `*/private/tests/` directory
3. **For Utilities**: Add unit tests as appropriate for the language

## Submitting Changes

1. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow existing code patterns
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   bazel test //...
   ```

4. **Commit and Push**
   ```bash
   git add .
   git commit -m "feat: add new feature"
   git push origin feature/your-feature-name
   ```

5. **Create Pull Request**
   - Provide clear description of changes
   - Reference any related issues
   - Ensure CI tests pass

## CI/CD

The project uses CircleCI for continuous integration:

- **Format checks**: Validates code formatting
- **Unit tests**: Runs `bazel test //...`
- **Integration tests**: Runs example project tests

## Release Process

Releases are automated using:
- Semantic versioning based on commit messages
- Automated changelog generation
- GitHub releases with artifacts

## Getting Help

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check existing docs in `docs/` directory
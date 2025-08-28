# Contributing to rules_player

Thank you for your interest in contributing to rules_player! This document provides guidelines and information for contributors.

## Development Setup

### Prerequisites

1. **Bazel**: Install the version specified in `.bazelversion`
2. **[BATS](https://github.com/bats-core/bats-core)**: Required for running shell script tests
3. **Node.js and yarn**: For JavaScript/TypeScript development
4. **Java**: For Kotlin development


### Development Workflow

1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/rules_player.git
   cd rules_player
   ```

2. **Install Dependencies**
   ```bash
   yarn install
   ```

3. **Run Tests**
   ```bash
   # Run all tests
   bazel test //...
   
   # Run integration tests
   bazel test //examples:all_integration_tests
   
   # Run BATS tests for shell scripts
   bats ios/private/tests/test_discover_ios_targets_simple.bats
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

### Shell Script Tests

Shell scripts are tested using BATS:

- Located in `*/private/tests/` directories
- Run with `bats <test_file>.bats`
- Integrated with Bazel via `sh_test` rules

### Adding New Tests

1. **For Bazel Rules**: Add integration tests in `examples/`
2. **For Shell Scripts**: Add BATS tests in appropriate `*/private/tests/` directory
3. **For Utilities**: Add unit tests as appropriate for the language

## Code Style

- **Bazel files**: Use `bzlformat` for consistent formatting
- **Shell scripts**: Follow Google Shell Style Guide
- **Documentation**: Update relevant README files and inline docs

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
   # Run all tests
   bazel test //...
   
   # Run formatting checks
   bazel test //... --test_tag_filters=bzlformat
   
   # Run BATS tests if you modified shell scripts
   bats ios/private/tests/*.bats
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
- **Shell script tests**: Runs BATS tests for shell scripts

## Release Process

Releases are automated using:
- Semantic versioning based on commit messages
- Automated changelog generation
- GitHub releases with artifacts

## Getting Help

- **Issues**: Report bugs or request features via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions
- **Documentation**: Check existing docs in `docs/` directory

## Code of Conduct

Please be respectful and professional in all interactions. We aim to maintain a welcoming environment for all contributors.

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

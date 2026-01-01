# MufiZ Documentation Website

This is the official documentation website for MufiZ - a programming language that integrates Mufi-Lang with Zig's build system for enhanced cross-compatibility and memory safety.

## About MufiZ

MufiZ (Mufi Lang with Ziggyness) is a powerful programming language that combines the best of both worlds:

- **Cross-Platform**: Built with Zig's build system for easy cross-compatibility and efficient caching
- **Memory Safe**: Enhanced memory safety through integration with Zig's memory management
- **Rich Standard Library**: Comprehensive modules for math, collections, networking, file operations, and more
- **High Performance**: SIMD optimizations for string operations and mathematical computations
- **Interactive Development**: Enhanced REPL with improved input handling

## Project Structure

```
mufi-lang.org/
├── index.html                    # Main documentation page with enhanced function docs
├── styles.css                    # Enhanced styling with improved code block backgrounds
├── script.js                     # Interactive functionality
├── examples/                     # Comprehensive code example files
│   ├── hello_world.mufi          # Basic language introduction
│   ├── collections.mufi          # Vector and hash table operations
│   ├── math_operations.mufi      # Mathematical functions and computations
│   ├── control_flow.mufi         # Loops, conditions, and program flow
│   ├── matrix_operations.mufi    # Complete matrix algebra examples
│   ├── network_operations.mufi   # HTTP requests and networking (requires -Denable_net)
│   └── filesystem_operations.mufi # File I/O and directories (requires -Denable_fs)
└── README.md                     # This documentation
```

## Requirements

- **Zig v0.15.2** - Required for building MufiZ
- Modern web browser for viewing documentation
- Optional: Web server for local development

## Installation Options

### Quick Install
```bash
curl -sSL https://install.mufi-lang.org | sh
```

Visit [install.mufi-lang.org](https://install.mufi-lang.org) for platform-specific instructions.

### Package Managers
- **Homebrew**: `brew tap Mustafif
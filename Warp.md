# Warp Agent Guidelines

This document contains important guidelines and commands that all Warp agents should follow when working with this codebase.

## Git Worktree Management

**IMPORTANT**: Before making any changes to the code, Warp agents should create a git worktree to ensure safe development practices and avoid conflicts with the main working directory.


## Benefits of Using Worktrees

- **Isolation**: Keep experimental changes separate from the main working directory
- **Safety**: Avoid accidentally breaking the main development environment
- **Parallel Development**: Work on multiple features simultaneously
- **Clean History**: Easier to manage branches and commits
- **No Stashing**: Switch between different features without stashing changes

## Best Practices

1. Always create a descriptive worktree name that reflects the feature/fix being worked on
2. Base your worktree on the appropriate branch (main, develop, etc.)
3. Clean up worktrees after merging your changes
4. Use meaningful commit messages in your worktree branches
5. Test your changes thoroughly in the worktree before merging

---

*This file should be read and followed by all Warp agents working on this codebase.*

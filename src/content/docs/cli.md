---
title: 'CLI Reference'
description: 'Basis UI CLI commands and options'
category: 'documentation'
order: 5
---

## Commands

### `init`

Setup your Astro project with Basis UI:

```bash
npx @basisui/ui@latest init
```

This command:

- Validates Astro project
- Installs Alpine.js and plugins
- Sets up Tailwind CSS with theme variables
- Configures path aliases in `tsconfig.json`
- Adds utility functions

**Options:**

- `--yes, -y` - Skip confirmations
- `--overwrite` - Overwrite existing files

### `add`

Add all components to your project:

```bash
npx @basisui/ui add
```

Installs all 59 components into `@/components/ui/`.

**Options:**

- `--overwrite` - Overwrite existing components
- `--yes, -y` - Skip confirmations

### `diff`

Check for component updates:

```bash
npx @basisui/ui diff
```

Shows which components have updates available.

**Options:**

- `--verbose, -v` - Show detailed changes
- `--json` - JSON output format

## Global Options

- `--help, -h` - Show help
- `--version, -v` - Show CLI version
- `--config <path>` - Custom config file

## Usage Examples

```bash
# Setup new project
npx @basisui/ui@latest init --yes

# Add all components
npx @basisui/ui add --overwrite

# Check for updates
npx @basisui/ui diff
```

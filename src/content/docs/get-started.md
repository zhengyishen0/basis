---
title: 'Get Started'
description: 'Learn how to install and use Basis UI components in your Astro project with Alpine.js'
category: 'documentation'
order: 1
---

# Welcome

Basis UI is a beautiful, customizable component library built specifically for **Astro + Alpine.js**. With 59 components across 8 categories, it provides everything you need to build modern web applications with a copy-paste approach.

## Quick Start

### 1. Prerequisites

Before you begin, make sure you have:

- **Node.js** 18.0 or higher
- **Astro** 3.0 or higher project
- **Git** installed

### 2. Initialize Your Project

Run the initialization command in your Astro project root:

```bash
npx @basisui/ui@latest init
```

This command will:

- ✅ Validate your Astro project
- ✅ Install Alpine.js and required plugins
- ✅ Set up Tailwind CSS with theme variables
- ✅ Configure path aliases in `tsconfig.json`
- ✅ Add utility functions (`cn`, component variants)

### 3. Add All Components

Add the complete UI component library to your project:

```bash
# Add all components at once
npx @basisui/ui add

# Add with options (overwrite existing)
npx @basisui/ui add --overwrite --yes
```

This command will install all 59 components across 8 categories into your project's `@/components/ui` directory.

### 4. Use in Your Astro Pages

```astro
---
// src/pages/index.astro
import Layout from '@/layouts/Layout.astro'
import Button from '@/components/ui/button/Button.astro';
import Card from '@/components/ui/card/Card.astro';
---
<Layout>
    <Card>
        <h1>Welcome to Basis UI</h1>
        <p>Beautiful components for your Astro project.</p>
        <Button variant="default">Get Started</Button>
    </Card>
</Layout>
```

## Next Steps

Now that you have Basis UI set up, you can:

1. **[Browse Components](/docs/components)** - Explore all available components
2. **[Configuration](/docs/config)** - Project setup and configuration options
3. **[Theming](/docs/theming)** - Customize colors and dark mode
4. **[Customize](/docs/customize)** - Alpine.js integration and variants
5. **[CLI Reference](/docs/cli-reference)** - Command reference

## Support

- 📖 **Documentation**: [basis.zhengyishen.com](https://basis.zhengyishen.com)
- 🐛 **Issues**: [GitHub Issues](https://github.com/zhengyishen0/basis-ui/issues)
- 💬 **Discussions**: [GitHub Discussions](https://github.com/zhengyishen0/basis-ui/discussions)

---

_Built with ❤️ for the Astro community_

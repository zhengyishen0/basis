---
title: 'Configuration'
description: 'Project configuration and setup options for Basis UI'
category: 'documentation'
order: 2
---

## Path Aliases

Set up TypeScript path aliases in `tsconfig.json`:

```json
{
    "extends": "astro/tsconfigs/strict",
    "compilerOptions": {
        "baseUrl": ".",
        "paths": {
            "@/*": ["src/*"]
        }
    }
}
```

## Tailwind Configuration

Your `tailwind.config.js` includes comprehensive theming:

```javascript
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                border: 'var(--border)',
                background: 'var(--background)',
                foreground: 'var(--foreground)',
                primary: {
                    DEFAULT: 'var(--primary)',
                    foreground: 'var(--primary-foreground)',
                },
                secondary: {
                    DEFAULT: 'var(--secondary)',
                    foreground: 'var(--secondary-foreground)',
                },
                destructive: {
                    DEFAULT: 'var(--destructive)',
                    foreground: 'var(--destructive-foreground)',
                },
                // ... additional color system
            },
            borderRadius: {
                DEFAULT: 'var(--radius)',
            },
            // Custom spacing, shadows, animations included
        },
    },
    plugins: [require('@tailwindcss/typography')],
};
```

## Alpine.js Setup

Import Alpine.js in your layout:

```astro
---
// src/layouts/Layout.astro
import '@/styles/global.css';
---

<html lang="en">
<head>
  <!-- ... -->
</head>
<body>
  <slot />

  <script>
    import Alpine from 'alpinejs';

    // Optional plugins
    import collapse from '@alpinejs/collapse';
    import focus from '@alpinejs/focus';
    import intersect from '@alpinejs/intersect';

    Alpine.plugin(collapse);
    Alpine.plugin(focus);
    Alpine.plugin(intersect);

    Alpine.start();
  </script>
</body>
</html>
```

## Global Styles

Your `src/styles/global.css` should include:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
    --primary: 221.2 83.2% 53.3%;
    --secondary: 210 40% 96%;
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --border: 214.3 31.8% 91.4%;
    --muted: 210 40% 96%;
    --accent: 210 40% 96%;
    --destructive: 0 62.8% 30.6%;
    --radius: 0.5rem;
}

.dark {
    --primary: 217.2 91.2% 59.8%;
    --secondary: 217.2 32.6% 17.5%;
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    --border: 217.2 32.6% 17.5%;
    --muted: 217.2 32.6% 17.5%;
    --accent: 217.2 32.6% 17.5%;
    --destructive: 0 62.8% 30.6%;
}
```

## Dependencies

Required packages for Basis UI:

```json
{
    "dependencies": {
        "alpinejs": "^3.13.0",
        "class-variance-authority": "^0.7.1",
        "clsx": "^2.1.1",
        "tailwind-merge": "^3.3.1",
        "@astrojs/check": "^0.9.0"
    },
    "devDependencies": {
        "@alpinejs/collapse": "^3.13.0",
        "@alpinejs/focus": "^3.13.0",
        "@alpinejs/intersect": "^3.13.0",
        "tailwindcss": "^3.4.0",
        "astro-icon": "^1.1.0"
    }
}
```

## Directory Structure

After setup, your project structure should look like:

```bash
src/
├── components/
│   └── ui/           # Basis UI components
├── lib/
│   ├── utils.ts      # Utility functions
│   └── component-variants.ts
├── layouts/
│   └── Layout.astro  # Main layout with Alpine.js
├── styles/
│   └── global.css   # Global styles and CSS variables
└── pages/
    └── index.astro
```

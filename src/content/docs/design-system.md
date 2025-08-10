---
title: Design System Guide
description: Complete guide to the 3-layer design system architecture
---

## Overview

This design system follows a 3-layer architecture that ensures developers don't make design decisions. All design choices are pre-decided in templates, with developers using semantic components without exposure to design tokens.

**Core Philosophy:** "Developers shouldn't make design decisions" - All design choices are pre-decided in templates.

## Architecture

### 3-Layer System

1. **Primitive Tokens** - Generated color scales, spacing, typography
2. **Semantic Tokens** - Pre-decided mappings that hide implementation
3. **Component Layer** - Framework components provide final abstraction

## Color System

### Why Use Color Shades?

Single colors don't work for real UI needs. You need different shades for:

- **Interactive states** (hover, active, disabled)
- **Visual hierarchy** (backgrounds, borders, text)
- **Communication** (alerts, badges, status)

### Shade Usage Guidelines

```css
/* 50-200: Backgrounds and very light uses */
.alert-info {
  background: var(--blue-50);
  border: 1px solid var(--blue-200);
}

/* 300-400: Disabled states, placeholders */
.button:disabled {
  background: var(--gray-300);
  color: var(--gray-400);
}

/* 500-600: Primary actions, main colors */
.button-primary {
  background: var(--blue-600);
}

/* 700-800: Hover states, emphasis */
.button:hover {
  background: var(--blue-700);
}

/* 900: Text on light backgrounds */
.text-primary {
  color: var(--gray-900);
}
```

### Essential Color Categories

#### 1. Neutrals (Required)

The most important color family - used for text, borders, and backgrounds.

```css
--gray-50: #f9fafb; /* Background layers */
--gray-100: #f3f4f6; /* Hover backgrounds */
--gray-200: #e5e7eb; /* Borders */
--gray-300: #d1d5db; /* Disabled borders */
--gray-400: #9ca3af; /* Placeholder text */
--gray-500: #6b7280; /* Subdued text */
--gray-600: #4b5563; /* Secondary text */
--gray-700: #374151; /* Body text */
--gray-800: #1f2937; /* Headings */
--gray-900: #111827; /* Primary text */
```

#### 2. Primary (Brand Color)

Your main interactive color for links, buttons, and focus states.

```css
--primary-500: #3b82f6; /* Links, buttons */
--primary-600: #2563eb; /* Default buttons */
--primary-700: #1d4ed8; /* Hover state */
```

#### 3. Semantic Status Colors

For communicating system states and feedback.

```css
--danger-500: #ef4444; /* Errors, destructive */
--success-500: #10b981; /* Success, positive */
--warning-500: #f59e0b; /* Warnings, caution */
--info-500: #3b82f6; /* Information */
```

## Typography System

### Font Families (2-3 Maximum)

```css
--font-sans: system-ui, -apple-system, "Segoe UI", sans-serif;
--font-mono: "SF Mono", Monaco, monospace; /* Optional: code */
```

### Font Sizes (T-Shirt Sizing)

```css
--text-xs: 0.75rem; /* 12px - Tiny labels */
--text-sm: 0.875rem; /* 14px - Buttons, captions */
--text-base: 1rem; /* 16px - Body text */
--text-lg: 1.125rem; /* 18px - Large body */
--text-xl: 1.25rem; /* 20px - Section headings */
--text-2xl: 1.5rem; /* 24px - Page headings */
--text-3xl: 1.875rem; /* 30px - Hero headings */
```

### Font Weights (3-4 Maximum)

```css
--font-normal: 400; /* Body text */
--font-medium: 500; /* Buttons, emphasis */
--font-semibold: 600; /* Headings */
--font-bold: 700; /* Special emphasis */
```

### Line Heights

```css
--leading-tight: 1.25; /* Headings */
--leading-normal: 1.5; /* Body text */
--leading-relaxed: 1.75; /* Long-form content */
```

## Implementation Guide

### Step 1: Primitive Tokens

Generate these using tools like Realtime Colors.

```css
/* tokens/primitives.css */
:root {
  /* Colors */
  --blue-50 through --blue-900;
  --gray-50 through --gray-900;

  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 0.75rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Typography */
  --font-sans: system-ui, -apple-system, sans-serif;
  --text-xs through --text-3xl;

  /* Border radius */
  --radius-sm: 0.25rem;
  --radius-md: 0.375rem;
  --radius-lg: 0.5rem;
}
```

### Step 2: Semantic Mappings

Map primitives to meaningful names.

```css
/* tokens/semantic.css */
:root {
  /* Surface colors */
  --color-background: #ffffff;
  --color-surface: var(--gray-50);

  /* Text colors */
  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-600);
  --color-text-disabled: var(--gray-400);

  /* Component-specific */
  --card-bg: var(--color-background);
  --card-padding: var(--space-lg);
  --card-radius: var(--radius-lg);

  --button-padding-x: var(--space-md);
  --button-padding-y: var(--space-sm);
  --button-radius: var(--radius-md);
}
```

### Step 3: Component Templates

Zero design decisions in templates.

```css
/* Card Template */
.card {
  background: var(--card-bg);
  border: 1px solid var(--card-border);
  padding: var(--card-padding);
  border-radius: var(--card-radius);
}

/* Button Template */
.button {
  padding: var(--button-padding-y) var(--button-padding-x);
  border-radius: var(--button-radius);
  font-size: var(--button-font-size);
  transition: all 150ms ease;
}

.button-primary {
  background: var(--color-primary);
  color: var(--color-primary-text);
}

.button-primary:hover {
  background: var(--color-primary-hover);
}
```

### Step 4: Component Usage

Developers use components without design decisions.

```jsx
import { Card, Button, Input } from "@/components";

export function ContactForm() {
  return (
    <Card>
      <CardHeader>Contact Us</CardHeader>
      <CardContent>
        <Input placeholder="Your email" type="email" />
        <Button>Send Message</Button>
      </CardContent>
    </Card>
  );
}
```

## Dark Mode Support

Only change semantic tokens for theme variations:

```css
[data-theme="dark"] {
  --color-background: var(--gray-900);
  --color-surface: var(--gray-800);
  --color-text-primary: var(--gray-50);
  --color-text-secondary: var(--gray-400);
  --color-border: var(--gray-700);
}
```

## File Structure

```
design-system/
├── tokens/
│   ├── primitives.css    # Generated values
│   ├── semantic.css      # Meaningful mappings
│   └── themes.css        # Theme variations
├── templates/
│   └── components.css    # Component styles
└── index.css            # Main entry point
```

## Minimal Complete System

A complete design system needs only ~30-40 tokens:

- **10 neutral shades** (gray-50 to gray-900)
- **3-5 primary shades** (primary-400 to primary-700)
- **2 shades each** for danger, success, warning
- **4-6 font sizes** (text-sm to text-2xl)
- **3 font weights** (normal, medium, semibold)
- **Basic spacing scale** (space-xs to space-2xl)

## Common Mistakes to Avoid

```css
/* ❌ Too many colors */
--purple, --pink, --indigo, --teal, --orange...

/* ✅ Functional colors only */
--primary, --danger, --success, --warning

/* ❌ Too many font sizes */
--text-13px, --text-14px, --text-15px...

/* ✅ Clear size hierarchy */
--text-sm, --text-base, --text-lg

/* ❌ Random shade numbers */
--blue-150, --blue-250, --blue-350...

/* ✅ Standard scale */
--blue-50, --blue-100, --blue-200...
```

## Key Benefits

1. **Zero Design Decisions** - Developers just use components
2. **Single Source of Truth** - All design in CSS tokens
3. **Runtime Theming** - Change themes with data attributes
4. **No Build Complexity** - Just CSS and components
5. **Framework Agnostic** - Works with any framework

## Real-World Examples

### Status Communication

```css
.alert-danger {
  background: var(--danger-50); /* Lightest red */
  border: 1px solid var(--danger-200);
  color: var(--danger-700); /* Dark red text */
}

.badge-success {
  background: var(--success-500);
  color: white;
}
```

### Interactive States

```css
.button {
  background: var(--blue-600); /* Default */
}
.button:hover {
  background: var(--blue-700); /* Darker */
}
.button:active {
  background: var(--blue-800); /* Darkest */
}
.button:disabled {
  background: var(--blue-300); /* Lighter */
}
```

### Visual Hierarchy

```css
.page {
  background: var(--gray-50);
} /* Lightest */
.card {
  background: white;
} /* White */
.nested {
  background: var(--gray-100);
} /* Subtle */
```

## Summary

This design system creates a complete solution where:

- Colors flow from tools → semantic tokens → templates → components
- Developers never see or choose design values
- Design decisions are centralized and reusable
- No complex tooling required
- Total of ~30-40 tokens creates a complete system

# Design System Colors & Typography Guide

## 1. Why Different Shades?

### The Problem with Single Colors
```css
/* ❌ BAD: Only one shade */
:root {
  --blue: #3b82f6;
}

/* What happens when you need: */
.button { background: var(--blue); }
.button:hover { background: ???; } /* Darker blue? */
.button:active { background: ???; } /* Even darker? */
.button:disabled { background: ???; } /* Lighter blue? */
.alert-info { background: ???; } /* Very light blue? */
```

### Shades Solve Real UI Problems

#### Interactive States
```css
/* Primary button needs 3-4 shades */
.button-primary {
  background: var(--blue-600);  /* Default */
}
.button-primary:hover {
  background: var(--blue-700);  /* Darker on hover */
}
.button-primary:active {
  background: var(--blue-800);  /* Darkest when pressed */
}
.button-primary:disabled {
  background: var(--blue-300);  /* Lighter when disabled */
}
```

#### Background Layers
```css
/* Creating visual hierarchy */
.page { background: var(--gray-50); }   /* Lightest */
.card { background: white; }            /* White */
.nested-card { background: var(--gray-100); } /* Slightly darker */
```

#### Text Hierarchy
```css
.heading { color: var(--gray-900); }     /* Darkest - most important */
.body { color: var(--gray-700); }        /* Standard text */
.caption { color: var(--gray-500); }     /* De-emphasized */
.placeholder { color: var(--gray-400); } /* Least important */
```

#### Borders & Dividers
```css
.card { border: 1px solid var(--gray-200); }      /* Subtle */
.divider { border-top: 1px solid var(--gray-300); } /* More visible */
.input:focus { border-color: var(--blue-500); }    /* Emphasis */
```

### When to Use Which Shade

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
.button-primary { background: var(--blue-600); }
.link { color: var(--blue-600); }

/* 700-800: Hover states, emphasis */
.button:hover { background: var(--blue-700); }
.heading { color: var(--gray-800); }

/* 900: Text on light backgrounds */
.text-primary { color: var(--gray-900); }
```

## 2. Essential Color Types for Design Systems

### Core UI Colors (Required)

#### 1. **Neutral/Gray** (Most Important!)
```css
:root {
  /* Used for text, borders, backgrounds */
  --gray-50: #f9fafb;   /* Background layers */
  --gray-100: #f3f4f6;  /* Hover backgrounds */
  --gray-200: #e5e7eb;  /* Borders */
  --gray-300: #d1d5db;  /* Disabled borders */
  --gray-400: #9ca3af;  /* Placeholder text */
  --gray-500: #6b7280;  /* Subdued text */
  --gray-600: #4b5563;  /* Secondary text */
  --gray-700: #374151;  /* Body text */
  --gray-800: #1f2937;  /* Headings */
  --gray-900: #111827;  /* Primary text */
}
```

#### 2. **Primary** (Brand Color)
```css
:root {
  /* Main interactive color */
  --primary-500: #3b82f6;  /* Links, buttons */
  --primary-600: #2563eb;  /* Default buttons */
  --primary-700: #1d4ed8;  /* Hover state */
}
```

#### 3. **Semantic Status Colors**
```css
:root {
  /* Communication colors */
  --danger-500: #ef4444;   /* Errors, destructive actions */
  --success-500: #10b981;  /* Success, positive feedback */
  --warning-500: #f59e0b;  /* Warnings, caution */
  --info-500: #3b82f6;     /* Information (often = primary) */
}
```

### Optional But Common

#### 4. **Secondary** (Depends on Brand)
```css
:root {
  /* Only if your brand needs it */
  --secondary-500: #8b5cf6; /* Secondary actions */
}
```

#### 5. **Accent** (Use Sparingly)
```css
:root {
  /* For special emphasis only */
  --accent-500: #f59e0b; /* Highlights, badges */
}
```

### Special Purpose Colors

```css
:root {
  /* Background colors */
  --background: #ffffff;       /* Main background */
  --surface: var(--gray-50);   /* Card backgrounds */
  
  /* Text colors (derived from grays) */
  --text-primary: var(--gray-900);
  --text-secondary: var(--gray-600);
  --text-disabled: var(--gray-400);
  
  /* Border colors */
  --border: var(--gray-200);
  --border-hover: var(--gray-300);
  
  /* Focus states */
  --focus-ring: var(--primary-500);
}
```

## 3. Typography System

### Font Families (2-3 Maximum)
```css
:root {
  /* Primary font for all UI */
  --font-sans: system-ui, -apple-system, 'Segoe UI', sans-serif;
  
  /* Optional: For code/data */
  --font-mono: 'SF Mono', Monaco, monospace;
  
  /* Optional: For special headings */
  --font-display: var(--font-sans); /* Or custom display font */
}
```

### Font Sizes (T-Shirt Sizing)
```css
:root {
  /* Limit to 6-8 sizes */
  --text-xs: 0.75rem;    /* 12px - Tiny labels */
  --text-sm: 0.875rem;   /* 14px - Buttons, captions */
  --text-base: 1rem;     /* 16px - Body text */
  --text-lg: 1.125rem;   /* 18px - Large body */
  --text-xl: 1.25rem;    /* 20px - Section headings */
  --text-2xl: 1.5rem;    /* 24px - Page headings */
  --text-3xl: 1.875rem;  /* 30px - Hero headings */
}
```

### Font Weights (3-4 Maximum)
```css
:root {
  --font-normal: 400;    /* Body text */
  --font-medium: 500;    /* Buttons, emphasis */
  --font-semibold: 600;  /* Headings */
  --font-bold: 700;      /* Special emphasis */
}
```

### Line Heights
```css
:root {
  --leading-tight: 1.25;   /* Headings */
  --leading-normal: 1.5;   /* Body text */
  --leading-relaxed: 1.75; /* Long-form content */
}
```

### Complete Typography Tokens
```css
:root {
  /* Pre-composed text styles */
  --text-body: var(--text-base)/var(--leading-normal) var(--font-sans);
  --text-heading: var(--font-semibold) var(--text-xl)/var(--leading-tight) var(--font-sans);
  --text-caption: var(--text-sm)/var(--leading-normal) var(--font-sans);
}
```

## Minimal Complete Design System

```css
:root {
  /* 1. Neutrals (10 shades) - REQUIRED */
  --gray-50 through --gray-900;
  
  /* 2. Primary (3-5 shades) - REQUIRED */
  --primary-400 through --primary-700;
  
  /* 3. Semantic (1-2 shades each) - REQUIRED */
  --danger-500, --danger-600;
  --success-500, --success-600;
  --warning-500, --warning-600;
  
  /* 4. Typography - REQUIRED */
  --font-sans;
  --text-sm, --text-base, --text-lg, --text-xl;
  --font-normal, --font-medium, --font-semibold;
  
  /* That's it! About 25-30 tokens total */
}
```

## Real-World Example Usage

```css
/* Card component using the system */
.card {
  background: white;                    /* Main surface */
  border: 1px solid var(--gray-200);   /* Subtle border */
  padding: var(--space-lg);
  
  /* Typography */
  font: var(--text-body);
  color: var(--text-primary);
}

.card-title {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--gray-900);              /* Darkest for emphasis */
  margin-bottom: var(--space-sm);
}

.card-description {
  color: var(--text-secondary);        /* Lighter for less emphasis */
}

/* Status examples */
.alert-danger {
  background: var(--danger-50);        /* Lightest red */
  border: 1px solid var(--danger-200);
  color: var(--danger-700);            /* Dark red text */
}

.badge-success {
  background: var(--success-500);      /* Medium green */
  color: white;
}
```

## Common Mistakes to Avoid

```css
/* ❌ Too many colors */
--purple, --pink, --indigo, --teal, --orange...

/* ✅ Stick to functional colors */
--primary, --danger, --success, --warning

/* ❌ Too many font sizes */
--text-13px, --text-14px, --text-15px, --text-16px...

/* ✅ Clear size hierarchy */
--text-sm, --text-base, --text-lg, --text-xl

/* ❌ Random shade numbers */
--blue-150, --blue-250, --blue-350...

/* ✅ Standard scale */
--blue-50, --blue-100, --blue-200...
```

## Summary

**Essential Colors:**
1. **Neutrals** (10 shades) - For everything
2. **Primary** (3-5 shades) - Brand & actions
3. **Status** (danger, success, warning) - Communication
4. **Black & White** - Absolutes

**Essential Typography:**
1. **1 Font Family** - Sans-serif for everything
2. **4-6 Font Sizes** - Clear hierarchy
3. **3 Font Weights** - Normal, medium, semibold
4. **2-3 Line Heights** - Tight, normal, relaxed

Total: ~30-40 design tokens for a complete system!
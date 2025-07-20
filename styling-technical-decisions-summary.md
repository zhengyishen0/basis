# Technical Decisions Summary

## Architecture: CUBE CSS

### C - Composition (Layout Primitives)
- **Purpose**: Handle ALL spacing between elements
- **Implementation**: `.stack`, `.cluster`, `.auto-grid`, `.sidebar`
- **Benefit**: Components don't need margin/padding classes
- **Example**: `<div class="card stack">` automatically spaces children
- **Why not @container**: CUBE Composition handles layout better - components stay simple

### U - Utilities (Semantic Tokens)
- **Purpose**: Provide semantic modifiers, NOT primitive values
- **Implementation**: `.size-lg`, `.color-primary`, `.variant-outline`
- **NOT**: `.px-4`, `.mt-2`, `.bg-blue-500` (no Tailwind primitives)
- **Benefit**: True decoupling - size doesn't know about color

### B - Blocks (Components)
- **Purpose**: Base component structure
- **Implementation**: `.btn`, `.card`, `.nav`
- **Philosophy**: Minimal base styles, enhanced by utilities

### E - Exceptions (States)
- **Purpose**: Handle special states
- **Implementation**: `.is-loading`, `.is-disabled`, `[aria-current="page"]`
- **Note**: Data attributes for state, classes for styling

## Core Technology Choices

### 1. **CSS Variables + light-dark()**
```css
:root {
  color-scheme: light dark;
  --color-primary: light-dark(#3b82f6, #60a5fa);
}
```
- **Benefit**: Automatic dark mode with zero JavaScript
- **Support**: Chrome 123+, Safari 17.5+, Firefox 120+

### 2. **Utility Classes (Not Data Attributes)**
```html
<!-- YES -->
<button class="btn size-lg color-primary variant-outline">

<!-- NO -->
<button data-button data-size="lg" data-color="primary">
```
- **Reason**: Cleaner, more familiar, better IDE support
- **Exception**: Use data attributes for JavaScript hooks and state

### 3. **No Build Complexity**
- **No** CSS-in-JS
- **No** CSS Modules  
- **No** Complex bundling
- **Just** CSS + semantic classes

### 4. **Co-located Component Styles**
```
components/
  ui/
    Button.astro
    button.css          ✅ CSS next to component
    Card.astro
    card.css            ✅ Together!
    
styles/
  global.css            # Only global styles
  tokens.css            # Design tokens
  composition.css       # CUBE composition
```
- **Component styles**: Next to components for better DX
- **Global styles**: In styles folder (tokens, composition, utilities)

## What We're NOT Using

### ❌ **Avoided Complexity**
- **BEM naming**: `.button__icon--large` (too verbose)
- **Tailwind primitives**: `px-4 mt-2` (not semantic)
- **Data attributes for styling**: Too verbose for modifiers
- **Alpine.js/JavaScript for UI**: :has() and :hover replace most needs
- **@container everywhere**: CUBE Composition is better

### ❌ **JavaScript for Basic Interactions**
```javascript
// OLD: Alpine.js for dropdowns
x-data="{ open: false }" 
@mouseenter="open = true"

// NEW: Pure CSS
.dropdown:hover .content { opacity: 1; }
```

### ❌ **Container Queries for Layout**
```css
/* OLD: Complex responsive component */
@container (min-width: 400px) { .card { ... } }

/* NEW: Let parent handle layout */
.sidebar .card { /* vertical */ }
.main-grid .card { /* horizontal */ }
```

## Complete Button Component Example

### Step 1: Design Tokens (global.css)
```css
:root {
  color-scheme: light dark;
  
  /* Color tokens with automatic dark mode */
  --color-primary: light-dark(#3b82f6, #60a5fa);
  --color-danger: light-dark(#dc2626, #ef4444);
  --color-surface: light-dark(#ffffff, #0a0a0a);
  
  /* Semantic sizing */
  --btn-padding-sm: 0.375rem 0.75rem;
  --btn-padding-md: 0.5rem 1rem;
  --btn-padding-lg: 0.75rem 1.5rem;
  
  /* Spacing scale */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
}
```

### Step 2: Button Component (Button.astro)
```astro
---
export interface Props {
  variant?: 'solid' | 'outline' | 'ghost';
  color?: 'primary' | 'danger' | 'neutral';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  class?: string;
}

const { 
  variant = 'solid',
  color = 'primary',
  size = 'md',
  href,
  class: className = ""
} = Astro.props;

// Clean class composition - no complex logic!
const classes = [
  'btn',
  `color-${color}`,
  `size-${size}`,
  variant !== 'solid' && `variant-${variant}`,
  className
].filter(Boolean).join(' ');

const Tag = href ? 'a' : 'button';
---

<Tag 
  href={href}
  class={classes}
>
  <slot name="icon-start" />
  <slot />
  <slot name="icon-end" />
</Tag>
```

### Step 3: Button CSS (button.css)
```css
/* Base button (B - Block) */
.btn {
  /* Structure */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  
  /* Base styling */
  font-weight: 500;
  border-radius: 0.375rem;
  border: 2px solid transparent;
  cursor: pointer;
  text-decoration: none;
  transition: all 150ms;
  
  /* CSS Variables (modified by utilities) */
  padding: var(--btn-padding, var(--btn-padding-md));
  background: var(--btn-bg, var(--color-primary));
  color: var(--btn-color, var(--color-surface));
  
  /* Nested styles */
  &:hover {
    opacity: 0.9;
  }
  
  &:focus-visible {
    outline: 2px solid var(--btn-bg);
    outline-offset: 2px;
  }
  
  /* Smart content detection with :has() */
  &:has(svg:only-child) {
    /* Icon-only button */
    aspect-ratio: 1;
    padding: var(--space-sm);
  }
  
  &:has([slot="icon-start"]) {
    padding-inline-start: var(--space-sm);
  }
}

/* Size utilities (U - Utilities) */
.size-sm { --btn-padding: var(--btn-padding-sm); }
.size-md { --btn-padding: var(--btn-padding-md); }
.size-lg { --btn-padding: var(--btn-padding-lg); }

/* Color utilities */
.color-primary {
  --btn-bg: var(--color-primary);
  --btn-color: var(--color-surface);
}

.color-danger {
  --btn-bg: var(--color-danger);
  --btn-color: var(--color-surface);
}

/* Variant utilities */
.variant-outline {
  --btn-bg: transparent;
  --btn-color: var(--btn-bg-base, var(--color-primary));
  --btn-border: currentColor;
}

.variant-ghost {
  --btn-bg: transparent;
  --btn-color: var(--btn-bg-base, var(--color-primary));
  
  &:hover {
    background: light-dark(
      rgba(0, 0, 0, 0.05),
      rgba(255, 255, 255, 0.05)
    );
  }
}

/* Store base color for variants */
.color-primary { --btn-bg-base: var(--color-primary); }
.color-danger { --btn-bg-base: var(--color-danger); }

/* States (E - Exceptions) */
.btn:disabled,
.btn.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Smart button groups with :has() */
.cluster:has(.btn + .btn) {
  gap: 0;
  
  & .btn:not(:first-child) {
    border-start-start-radius: 0;
    border-end-start-radius: 0;
  }
  
  & .btn:not(:last-child) {
    border-start-end-radius: 0;
    border-end-end-radius: 0;
    border-inline-end: 0;
  }
}
```

### Step 4: Usage Examples
```html
<!-- Simple button -->
<Button>Click me</Button>

<!-- With props -->
<Button size="lg" color="danger" variant="outline">
  Delete
</Button>

<!-- With icons (auto-detects and adjusts) -->
<Button>
  <Icon slot="icon-start" name="plus" />
  Add Item
</Button>

<!-- Icon-only (automatically square) -->
<Button>
  <Icon name="settings" />
</Button>

<!-- Button group (auto-styled by parent) -->
<div class="cluster">
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</div>

<!-- Link button -->
<Button href="/docs" variant="ghost">
  Documentation
</Button>
```

### What This Gives You:
1. **Zero JavaScript** for theming or interactions
2. **15 CSS rules** instead of 72+ combinations
3. **Smart adaptation** via :has()
4. **Automatic dark mode** via light-dark()
5. **Clean HTML output**: `<button class="btn size-lg color-danger">`

## Future CSS Features We're Using

### ✅ **Core Features** (Actively Using)

#### 1. **CSS Variables** *(100% support)*
```css
--btn-padding: 1rem 2rem;
background: var(--btn-bg);
```
**Why**: Foundation for theming and decoupling

#### 2. **light-dark() Function** *(2024+)*
```css
color: light-dark(black, white);
/* Automatically switches based on user preference */
```
**Why**: Zero-JavaScript dark mode

#### 3. **CSS Nesting** *(2023+)*
```css
.card {
  padding: 1rem;
  
  & .title {
    font-size: 2rem;
  }
}
```
**Why**: Cleaner, more maintainable CSS

#### 4. **:has() Selector** *(2022+)* - GAME CHANGER!
```css
/* Form validation without JavaScript */
.form:has(:invalid) {
  & .error-message { display: block; }
  & .submit-btn { opacity: 0.5; pointer-events: none; }
}

/* Navigation dropdown detection */
.nav-item:has(.dropdown:hover) {
  & .chevron { transform: rotate(180deg); }
}

/* Smart button sizing */
.btn:has(svg:only-child) {
  aspect-ratio: 1; /* Square icon button */
}
```
**Why**: Eliminates entire categories of JavaScript

### 🚫 **Features We're NOT Using**

#### 5. **Container Queries** - Rarely Needed!
```css
/* ❌ Don't use for normal components */
.card { container-type: inline-size; }

/* ✅ CUBE Composition is better */
.sidebar .card { /* vertical layout */ }
.main .card { /* horizontal layout */ }
```
**Why not**: CUBE Composition handles layout better - parent controls layout, components stay simple

#### 6. **Cascade Layers** - Not Needed
```css
/* ❌ Our architecture doesn't need this */
@layer components, utilities;
```
**Why not**: CUBE already provides clear specificity structure

## Complete Component Examples

### Navigation Dropdown - Zero JavaScript!
```css
/* Pure CSS dropdown - replaces Alpine.js */
.nav-dropdown {
  position: relative;
  
  & .dropdown-content {
    position: absolute;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-10px);
    transition: all 200ms;
    transition-delay: 150ms; /* Delay on hide */
  }
  
  /* Show on hover - no JavaScript needed! */
  &:hover .dropdown-content,
  &:focus-within .dropdown-content {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    transition-delay: 0ms; /* Instant show */
  }
  
  /* Rotate chevron with pure CSS */
  &:hover .chevron {
    transform: rotate(180deg);
  }
}
```

### Form Validation with :has()
```css
/* Automatic validation - no JavaScript! */
.form-group {
  /* Normal state */
  border: 2px solid var(--color-border);
  
  /* Invalid input detection */
  &:has(input:invalid:not(:placeholder-shown)) {
    border-color: var(--color-danger);
    background: var(--color-danger-soft);
    
    & .error-message {
      display: block; /* Auto-show error */
    }
  }
  
  /* Valid input detection */
  &:has(input:valid:not(:placeholder-shown)) {
    & .success-icon {
      display: block; /* Auto-show checkmark */
    }
  }
}

/* Form-level validation */
.form:has(input:invalid) {
  & button[type="submit"] {
    opacity: 0.5;
    pointer-events: none; /* Auto-disable */
  }
}
```

### Button Component (Complete)
```astro
---
// Button.astro
const { variant = 'solid', color = 'primary', size = 'md' } = Astro.props;
const classes = ['btn', `color-${color}`, `size-${size}`, variant !== 'solid' && `variant-${variant}`].filter(Boolean).join(' ');
---

<button class={classes}>
  <slot />
</button>
```

```css
/* button.css - Co-located with component */
.btn {
  /* Base styles */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
  padding: var(--btn-padding);
  background: var(--btn-bg);
  color: var(--btn-color);
  
  /* Smart icon detection with :has() */
  &:has(svg:only-child) {
    aspect-ratio: 1;
    padding: var(--space-sm);
  }
}

/* Independent modifiers */
.size-lg { --btn-padding: var(--space-lg); }
.color-primary { --btn-bg: var(--color-primary); }
.variant-outline { 
  --btn-bg: transparent;
  --btn-border: currentColor;
}
```

## JavaScript Migration Guide

### What CSS Now Handles:
- ✅ **Dropdowns**: `:hover` and `transition-delay`
- ✅ **Form validation**: `:has()` with `:invalid/:valid`
- ✅ **Toggle states**: Checkbox hack or `:target`
- ✅ **Parent selection**: `:has()` for conditional styling
- ✅ **Active detection**: `:has()` with `[aria-current]`

### Keep JavaScript Only For:
- ❌ Complex state management (shopping carts)
- ❌ API calls and data fetching
- ❌ Complex animations/gestures
- ❌ Third-party integrations

## The Result

- **Zero JavaScript** for dropdowns, form validation, and most UI interactions
- **150+ lines of Alpine.js eliminated** per component
- **Smart components** that adapt to their content via :has()
- **No combinatorial explosion** (O(m+n) not O(m×n))
- **Clean HTML**: `<button class="btn size-lg color-primary">`
- **Automatic dark mode** that respects user preference
- **True decoupling** via CSS variables
- **Better performance** - no JavaScript execution for UI

## Philosophy

> "Let CSS do what CSS does best"

- Platform features over JavaScript frameworks
- Semantic tokens over primitive utilities
- Composition over component-specific spacing
- Parent controls layout, not @container
- CSS handles state, not JavaScript
- :has() for parent selection (game changer!)
- Co-locate styles with components
- Simple over clever
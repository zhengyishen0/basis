# Design System Refactoring Prompt

I need help refactoring my CSS design system from a utility-based approach (similar to Tailwind) to a TRUE design system that makes design decisions.

## Current State

I have a CSS design system with:

- Primitive tokens (colors, spacing, typography)
- Semantic tokens (mapping primitives to meanings)
- Component classes that are basically utilities with variants like:
  - `.button-sm`, `.button-md`, `.button-lg`, `.button-xl`
  - `.button-solid-blue`, `.button-solid-red`, `.button-solid-green`
  - `.badge-soft-yellow`, `.badge-outline-purple`
  - Multiple variants for EVERY component

## Goal

Transform this into a TRUE design system where:

1. Each component has ONE default style
2. Only meaningful variants exist (primary action vs destructive action)
3. Developers cannot make design decisions
4. Design changes happen in ONE place

## Refactoring Rules

### 1. Component CSS Structure

```css
/* BEFORE (utility-like) */
.button-sm {
}
.button-md {
}
.button-lg {
}
.button-solid-blue {
}
.button-solid-red {
}

/* AFTER (true design system) */
.button {
  /* ONE default size - the correct size for our design */
  padding: 0.75rem 1.5rem;
  font-size: 1rem;

  /* ONE default style */
  background: var(--color-primary);
  color: var(--color-primary-text);
}

/* Only semantic variants */
.button[data-variant="danger"] {
  background: var(--color-danger);
}

/* Size only if TRULY needed */
.button[data-context="compact"] {
  padding: 0.5rem 1rem;
}
```

### 2. Astro Component Pattern

```astro
---
// AFTER: Limited, meaningful props only
export interface Props {
  variant?: 'default' | 'danger';  // NOT 'blue' | 'red' | 'green'
  context?: 'default' | 'compact'; // Only if needed
}

const { variant = 'default', context = 'default' } = Astro.props;
---

<button
  class="button"
  data-variant={variant !== 'default' ? variant : null}
  data-context={context !== 'default' ? context : null}
>
  <slot />
</button>
```

### 3. Decision Hierarchy

For each component, ask:

1. **What is THE correct style for this component?** (Make it default)
2. **What SEMANTIC variations exist?** (danger, disabled, NOT colors)
3. **What CONTEXTUAL needs exist?** (navigation vs form, NOT arbitrary sizes)

### 4. Specific Refactoring Tasks

#### Buttons

- Remove ALL color variants (no button-blue, button-red)
- Remove size utilities (no sm, md, lg, xl)
- Keep only: default, danger action, disabled state
- Size should be contextual (form buttons vs navigation buttons)

#### Cards

- ONE card style for the entire app
- Remove padding variants
- Remove shadow variants
- If needed, only semantic variants like "elevated" for modals

#### Badges

- ONE size that works everywhere
- Only semantic variants: info, warning, error, success
- Remove ALL color variants

#### Form Inputs

- ONE input style
- Remove size variants
- Only states: default, error, disabled

#### Typography

- Remove utility classes like text-sm, text-lg
- Use semantic HTML: h1, h2, p, small
- Style HTML elements directly

### 5. Example Transformations

```css
/* REMOVE this utility approach */
.card-padding-sm {
  padding: 1rem;
}
.card-padding-md {
  padding: 1.5rem;
}
.card-padding-lg {
  padding: 2rem;
}

/* REPLACE with ONE decision */
.card {
  padding: 1.5rem; /* THE correct padding for cards */
}
```

```astro
<!-- REMOVE this -->
<div class="card card-padding-lg card-shadow-xl card-bordered">

<!-- REPLACE with -->
<Card>
```

### 6. Token Refactoring

Keep primitive tokens but remove component-level tokens:

```css
/* KEEP these (primitives) */
--space-4: 1rem;
--space-6: 1.5rem;

/* REMOVE these (component utilities) */
--button-padding-sm: var(--space-3);
--button-padding-md: var(--space-4);
--button-padding-lg: var(--space-6);

/* INSTEAD, make the decision in component */
.button {
  padding: var(--space-4) var(--space-6); /* THE button padding */
}
```

### 7. Questions to Ask for Each Component

1. Why does this component need variants?
2. Are these variants semantic (meaningful) or aesthetic (arbitrary)?
3. Can we achieve variation through context instead of props?
4. What is the ONE correct default style?

### 8. Red Flags to Remove

- Color names in class names (except semantic like 'danger')
- Size utilities (sm, md, lg, xl)
- Multiple ways to achieve the same visual result
- Props that let developers make design decisions

## Expected Output

For each component file, provide:

1. The refactored CSS with ONE default style
2. The refactored Astro component with limited props
3. Explanation of what decisions were made and why
4. What variants were kept and why they're semantic, not aesthetic

Remember: A true design system makes decisions. Developers should only communicate intent (what the component does), not appearance (how it looks).

## Project Context

- Using Astro + Alpine.js
- Building a web application with a design system
- Design philosophy: Minimalist black and white aesthetic
- Target: Developers should have NO design choices

## Current Pain Points

- Too many utility classes to maintain
- Developers can mix and match creating inconsistency
- Changing design requires updating many classes
- Feels like rebuilding Tailwind manually

## Success Criteria

- One source of truth per component
- Design changes require editing ONE place
- Developers can only specify intent, not appearance
- Consistent design enforced by the system, not discipline

## Additional Guidelines

### Component Naming

- Use semantic names that describe purpose, not appearance
- `primary-action` not `blue-button`
- `data-table` not `striped-table`
- `form-input` not `rounded-input`

### Variant Guidelines

Only include variants that are:

1. **Semantically different** (e.g., destructive vs constructive actions)
2. **Contextually required** (e.g., nav-button vs form-button)
3. **State-based** (e.g., disabled, loading, error)

Never include variants for:

- Colors (unless semantic like danger/success)
- Sizes (unless contextually required)
- Aesthetic preferences (rounded vs square)
- Arbitrary spacing

### Implementation Strategy

1. Start with the most used components (Button, Card, Input)
2. Define THE default style that works in 90% of cases
3. Add variants ONLY when semantically necessary
4. Use CSS data attributes over classes for variants
5. Let Astro components enforce the constraints

### Testing the Refactor

After refactoring each component, verify:

- Can a developer make it look "wrong"?
- Is there only ONE way to use the component?
- Do all instances look consistent?
- Can design be changed in ONE place?

If any answer is "no", the component needs more constraints.

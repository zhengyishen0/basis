---
title: Alpine.js Integration Guide
description: Complete guide to using Alpine.js in Basis
---

# Alpine.js Integration Guide

This guide covers everything you need to know about using Alpine.js in Basis.

## Setup & Configuration

Alpine.js is included via ES6 modules with all major plugins. The setup is in `src/lib/alpine.js`:

```javascript
// Alpine.js Plugins
@alpinejs/mask         // Input masking and formatting
@alpinejs/intersect    // Intersection observer functionality
@alpinejs/persist      // Data persistence across page loads
@alpinejs/focus        // Focus management utilities
@alpinejs/collapse     // Smooth collapse/expand animations
@alpinejs/anchor       // Anchor positioning
@alpinejs/morph        // DOM morphing for smooth updates
@alpinejs/sort         // Sortable lists and drag-and-drop
@alpinejs/resize       // Element resize detection

// Alpine.js Core
alpinejs@3.14.9
```

## Basic Alpine.js Usage

### Simple Counter Component

```astro
<div x-data="{ count: 0 }" class="counter-container">
  <button x-on:click="count--">-</button>
  <span x-text="count"></span>
  <button x-on:click="count++">+</button>
</div>
```

### Form with Validation

```astro
<div x-data="{ email: '', valid: false }" class="form-container">
  <input
    x-model="email"
    x-on:input="valid = email.includes('@')"
    type="email"
    placeholder="Enter email"
    class="text-input"
  />
  <button
    x-show="valid"
    class="button button-solid-blue"
  >
    Submit
  </button>
</div>
```

## Using Alpine.js Plugins

### @alpinejs/mask - Input Formatting

```astro
<input x-mask="(999) 999-9999" placeholder="Phone number" />
<input x-mask="99/99/9999" placeholder="MM/DD/YYYY" />
<input x-mask="$999,999.99" placeholder="Price" />
```

### @alpinejs/persist - Data Persistence

```astro
<div x-data="{ theme: $persist('light') }">
  <button x-on:click="theme = theme === 'light' ? 'dark' : 'light'">
    Toggle Theme: <span x-text="theme"></span>
  </button>
</div>
```

### @alpinejs/intersect - Scroll Animations

```astro
<div x-intersect="$el.classList.add('animate-fadeIn')">
  Content that animates in when scrolled into view
</div>
```

### @alpinejs/collapse - Smooth Animations

```astro
<div x-data="{ open: false }">
  <button x-on:click="open = !open">Toggle</button>
  <div x-show="open" x-collapse>
    <p>This content will smoothly collapse/expand</p>
  </div>
</div>
```

### @alpinejs/focus - Focus Management

```astro
<div x-data="{ open: false }" x-on:keydown.escape="open = false">
  <button x-on:click="open = true">Open Dialog</button>
  <div x-show="open" x-trap="open">
    <input x-ref="firstInput" />
    <button x-on:click="open = false">Close</button>
  </div>
</div>
```

### @alpinejs/sort - Drag and Drop

```astro
<ul x-data x-sort>
  <li x-sort:item>Item 1</li>
  <li x-sort:item>Item 2</li>
  <li x-sort:item>Item 3</li>
</ul>
```

## State Management with Alpine.store()

Basis uses Alpine.store() for global state management. Here's how to create and use stores:

### Creating a Store

```javascript
// src/lib/myStore.js
import Alpine from "alpinejs";

Alpine.store("myStore", {
  // State
  items: [],
  loading: false,

  // Actions
  async fetchItems() {
    this.loading = true;
    try {
      const response = await fetch("/api/items");
      this.items = await response.json();
    } finally {
      this.loading = false;
    }
  },

  addItem(item) {
    this.items.push(item);
  },
});
```

### Using a Store in Components

```astro
<div x-data="$store.myStore" x-init="fetchItems()">
  <div x-show="loading">Loading...</div>

  <template x-for="item in items" :key="item.id">
    <div x-text="item.name"></div>
  </template>

  <button @click="addItem({ name: 'New Item' })">
    Add Item
  </button>
</div>
```

## Best Practices

### 1. Component Organization

- Keep Alpine.js logic simple and focused
- Use stores for shared state
- Extract complex logic into separate JavaScript files

### 2. Performance

- Use `x-cloak` to prevent flash of unstyled content:

```astro
<style>
  [x-cloak] { display: none !important; }
</style>

<div x-data="{ open: false }" x-cloak>
  <!-- Content hidden until Alpine loads -->
</div>
```

### 3. Accessibility

- Use Alpine's focus management for keyboard navigation
- Add proper ARIA attributes
- Test with keyboard and screen readers

### 4. Error Handling

```astro
<div x-data="{
  error: null,
  async fetchData() {
    try {
      // fetch logic
    } catch (e) {
      this.error = e.message;
    }
  }
}">
  <div x-show="error" class="alert alert-error" x-text="error"></div>
</div>
```

### 5. Debugging

- Use `x-init` with console.log for debugging:

```astro
<div x-data="{ count: 0 }" x-init="console.log('Component initialized', $data)">
  <!-- Component content -->
</div>
```

## Testing Alpine.js Components

Test your Alpine.js components at these routes:

- Basic functionality: `/test/quick-test`
- Advanced interactions: `/test/advanced-test`
- Individual component tests: `/test/[component-name]`

## Common Patterns

### Toggle Visibility

```astro
<div x-data="{ show: false }">
  <button @click="show = !show">Toggle</button>
  <div x-show="show" x-transition>Content</div>
</div>
```

### Dynamic Classes

```astro
<div x-data="{ active: false }">
  <button
    @click="active = !active"
    :class="{ 'button-active': active }"
  >
    Click me
  </button>
</div>
```

### Two-way Binding

```astro
<div x-data="{ message: '' }">
  <input x-model="message" />
  <p>You typed: <span x-text="message"></span></p>
</div>
```

### Conditional Rendering

```astro
<div x-data="{ type: 'info' }">
  <template x-if="type === 'info'">
    <div class="alert alert-info">Info message</div>
  </template>
  <template x-if="type === 'error'">
    <div class="alert alert-error">Error message</div>
  </template>
</div>
```

## Integration with Basis

Alpine.js works seamlessly with:

- **Astro Components**: Use Alpine in any .astro file
- **HTMX**: Combine for powerful interactions
- **Supabase**: Reactive UI with real-time data
- **Custom UI Components**: All UI components support Alpine.js

For component-specific Alpine.js usage, see the [Components Guide](/docs/components-guide).

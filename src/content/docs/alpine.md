---
title: 'Alpine Integration'
description: 'Alpine.js integration and component customization'
category: 'documentation'
order: 4
---

## Get started with Alpine.js

Components work with all Alpine.js directives:

```astro
---
import Button from '@/components/ui/button/Button.astro';
---

<div x-data="{ loading: false, count: 0 }">
  <Button
    x-on:click="loading = true; setTimeout(() => { count++; loading = false; }, 1000)"
    x-bind:disabled="loading"
    variant="default"
  >
    <span x-show="!loading" x-text="`Clicked ${count} times`"></span>
    <span x-show="loading">Loading...</span>
  </Button>
</div>
```

## Component Variants

Use CVA variants for styling:

```astro
<!-- Style variants -->
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>

<!-- Size variants -->
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

## Dynamic Variants

Change variants with Alpine.js:

```astro
<div x-data="{ alertType: 'default' }">
  <select x-model="alertType">
    <option value="default">Default</option>
    <option value="destructive">Error</option>
    <option value="success">Success</option>
  </select>

  <Alert x-bind:variant="alertType">Dynamic alert</Alert>
</div>
```

## Pass-through Props

Add Alpine.js directives to any component:

```astro
<Card
  x-data="{ expanded: false }"
  x-bind:class="expanded ? 'shadow-lg' : 'shadow-sm'"
  x-on:click="expanded = !expanded"
>
  <h3>Click to expand</h3>
  <div x-show="expanded" x-transition>
    <p>Conditional content!</p>
  </div>
</Card>
```

## Global State

Use Alpine.js stores for shared state:

```javascript
// src/scripts/stores.js
Alpine.store('cart', {
    items: [],
    add(product) {
        this.items.push(product);
    },
    get count() {
        return this.items.length;
    },
});
```

```astro
<div x-data>
  <Button x-on:click="$store.cart.add({ id: 1, name: 'Product' })">
    Add to Cart
  </Button>
  <Badge x-text="$store.cart.count"></Badge>
</div>
```

## Form Validation

Create reactive forms:

```astro
<form x-data="{
  email: '',
  errors: {},
  validate() {
    this.errors = {};
    if (!this.email.includes('@')) {
      this.errors.email = 'Invalid email';
    }
  }
}" x-on:submit.prevent="validate()">

  <TextInput
    x-model="email"
    placeholder="Email"
    x-bind:class="errors.email ? 'border-destructive' : ''"
  />
  <p x-show="errors.email" x-text="errors.email" class="text-sm text-red-500"></p>

  <Button type="submit">Submit</Button>
</form>
```

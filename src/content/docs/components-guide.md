---
title: Components Usage Guide
description: How to use UI and Marketing components in Basis
---

# Components Usage Guide

This guide covers how to use the 40+ UI components and 25+ marketing components included in Basis.

## Component Categories

### UI Components (`/src/components/ui/`)
Interactive components for building user interfaces:
- **Forms**: Button, TextInput, Textarea, Select, Checkbox, RadioGroup, Switch
- **Overlays**: Modal, SlideOver, Popover, Tooltip, Toast, FullScreenModal
- **Navigation**: Dropdown, Tabs, Breadcrumbs, Pagination, NavigationMenu
- **Data Display**: Table, Card, Badge, Progress, Rating, Accordion
- **Special**: MonacoEditor, VideoPlayer, DatePicker, Command, ImageGallery

### Marketing Components (`/src/components/marketing/`)
Pre-built sections for landing pages:
- **Heroes**: HeroCentered, HeroSideBySide, HeaderWithNav, HeaderDark
- **Features**: FeatureGrid, FeatureSideBySide, ContentFeatures
- **Social Proof**: TestimonialGrid, TestimonialSideBySide, LogoGrid
- **Pricing**: PricingCards, PricingSimple
- **Content**: BlogGrid, FAQColumns, TeamGrid
- **Forms**: LoginForm, SignupForm
- **Layout**: FooterSimple, FooterWithSocial, Navigation

## Using Components

### Basic Import and Usage

```astro
---
// Import components you need
import { Button, Modal, Card } from '@/components/ui';
import { HeroCentered, FeatureGrid } from '@/components/marketing';
---

<!-- Use them in your template -->
<HeroCentered
  title="Welcome to Basis"
  description="Build fast, interactive web apps"
  primaryButtonText="Get Started"
  primaryButtonHref="/docs"
/>

<Button variant="solid" color="blue" size="md">
  Click me
</Button>
```

### Component Props

Most components accept props for customization:

```astro
<Button
  variant="solid"     // solid, outline, ghost
  color="blue"        // blue, green, red, yellow, gray
  size="md"           // sm, md, lg
  disabled={false}
  class="custom-class"
>
  Button Text
</Button>
```

## UI Component Examples

### Forms

#### TextInput with Alpine.js
```astro
<div x-data="{ value: '' }">
  <TextInput
    placeholder="Enter your name"
    x-model="value"
    required
  />
  <p>You entered: <span x-text="value"></span></p>
</div>
```

#### Select Component
```astro
<Select
  options={[
    { value: 'us', label: 'United States' },
    { value: 'ca', label: 'Canada' },
    { value: 'uk', label: 'United Kingdom' }
  ]}
  placeholder="Choose a country"
/>
```

### Overlays

#### Modal with Alpine.js
```astro
<div x-data="{ open: false }">
  <Button @click="open = true">Open Modal</Button>
  
  <Modal
    title="Confirm Action"
    description="Are you sure you want to proceed?"
    x-show="open"
    @close="open = false"
  >
    <div slot="footer">
      <Button @click="open = false" variant="outline">Cancel</Button>
      <Button @click="handleConfirm(); open = false">Confirm</Button>
    </div>
  </Modal>
</div>
```

#### Toast Notifications
```astro
<div x-data="{ showToast: false }">
  <Button @click="showToast = true; setTimeout(() => showToast = false, 3000)">
    Show Toast
  </Button>
  
  <Toast
    x-show="showToast"
    x-transition
    variant="success"
    title="Success!"
    description="Your changes have been saved."
  />
</div>
```

### Data Display

#### Table Component
```astro
<Table
  headers={['Name', 'Email', 'Role']}
  rows={[
    ['John Doe', 'john@example.com', 'Admin'],
    ['Jane Smith', 'jane@example.com', 'User']
  ]}
  striped={true}
  hoverable={true}
/>
```

#### Accordion
```astro
<Accordion
  items={[
    {
      title: 'What is Basis?',
      content: 'Basis is a foundation for modern web development using fundamental tools...'
    },
    {
      title: 'How do I get started?',
      content: 'Clone the repository and run npm install...'
    }
  ]}
  allowMultiple={true}
/>
```

### Special Components

#### MonacoEditor
```astro
<!-- Basic JavaScript Editor -->
<MonacoEditor
  id="code-editor"
  language="javascript"
  theme="vs-dark"
  height="400px"
  value="console.log('Hello World');"
/>

<!-- Python Editor with Custom Configuration -->
<MonacoEditor
  language="python"
  theme="vs-light"
  height="300px"
  fontSize={16}
  minimap={false}
  wordWrap="on"
  readOnly={false}
  placeholder="# Enter your Python code here..."
/>

<!-- Form Integration -->
<form>
  <MonacoEditor
    name="userCode"
    language="typescript"
    height="500px"
    @monaco-change="handleCodeChange($event)"
  />
</form>
```

**MonacoEditor Features:**
- 15+ Programming Languages: JavaScript, TypeScript, Python, Rust, Go, Java, C#, HTML, CSS, JSON, YAML, SQL, and more
- 3 Built-in Themes: Dark (`vs-dark`), Light (`vs-light`), High Contrast (`hc-black`)
- IntelliSense & Code Completion
- Syntax Highlighting & Error Detection
- Customizable Options
- Alpine.js Integration
- Form Compatible

## Marketing Component Examples

### Hero Sections

#### HeroSideBySide
```astro
<HeroSideBySide
  title="Build Amazing Web Apps"
  description="Create fast, interactive applications with our modern stack"
  primaryButtonText="Start Building"
  primaryButtonHref="/docs"
  secondaryButtonText="View Demo"
  secondaryButtonHref="/demo"
  imageSrc="/hero-image.png"
  imageAlt="App Screenshot"
/>
```

#### HeaderWithNav
```astro
<HeaderWithNav
  logo="Your Brand"
  navItems={[
    { text: "Home", href: "/", active: true },
    { text: "Features", href: "/features" },
    { text: "Pricing", href: "/pricing" },
    { text: "Docs", href: "/docs" }
  ]}
  heroTitle="Start Crafting Your Next Great Idea"
  heroDescription="Simplifying the creation of landing pages..."
  primaryButtonText="Get Started"
  primaryButtonHref="#start"
/>
```

### Feature Sections

#### FeatureGrid
```astro
<FeatureGrid
  title="Why Choose Basis?"
  features={[
    {
      icon: "🚀",
      title: "Lightning Fast",
      description: "Static site generation with dynamic islands"
    },
    {
      icon: "🎨",
      title: "Beautiful UI",
      description: "40+ pre-built components ready to use"
    },
    {
      icon: "📱",
      title: "Responsive",
      description: "Mobile-first design that works everywhere"
    }
  ]}
/>
```

### Social Proof

#### TestimonialGrid
```astro
<TestimonialGrid
  testimonials={[
    {
      quote: "This stack has transformed how we build web apps.",
      author: "Jane Doe",
      role: "CTO at TechCorp",
      avatar: "/avatars/jane.jpg"
    },
    {
      quote: "The best developer experience I've had in years.",
      author: "John Smith",
      role: "Lead Developer",
      avatar: "/avatars/john.jpg"
    }
  ]}
/>
```

## Component Variants and Styling

### Design System Integration

All components use our CSS custom properties design system:

```astro
<!-- Components automatically use design tokens -->
<Button variant="solid" color="blue">
  <!-- Uses var(--color-blue-500) for background -->
  <!-- Uses var(--color-white) for text -->
</Button>

<!-- Override with custom classes -->
<Card class="custom-card">
  <style>
    .custom-card {
      --card-bg: var(--color-gray-50);
      --card-border: var(--color-gray-200);
    }
  </style>
</Card>
```

### Common Variants

#### Button Variants
- **solid**: Filled background
- **outline**: Border only
- **ghost**: No border, subtle hover

#### Color Options
- blue, green, red, yellow, gray

#### Size Options
- **sm**: Small size
- **md**: Medium size (default)
- **lg**: Large size

## Best Practices

### 1. Component Composition
```astro
---
// Create composite components
import { Card, Button, Badge } from '@/components/ui';
---

<Card>
  <div slot="header">
    <h3>Product Name</h3>
    <Badge color="green">New</Badge>
  </div>
  
  <p>Product description...</p>
  
  <div slot="footer">
    <Button variant="solid" color="blue">Buy Now</Button>
  </div>
</Card>
```

### 2. Responsive Design
All components are mobile-responsive by default. Use Astro's built-in responsive utilities:

```astro
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <Card>Content 1</Card>
  <Card>Content 2</Card>
  <Card>Content 3</Card>
</div>
```

### 3. Performance
- Components are optimized for minimal JavaScript
- Use Alpine.js only where interactivity is needed
- Leverage Astro's partial hydration

### 4. Accessibility
- All components include proper ARIA attributes
- Keyboard navigation is supported
- Focus management is built-in

## Testing Components

Visit the design system showcase to see all components in action:
- Design System: `/design-system`
- Component Tests: `/test/[component-name]`

## Creating Custom Components

Follow the existing component patterns:

```astro
---
// MyComponent.astro
export interface Props {
  title: string;
  variant?: 'primary' | 'secondary';
  class?: string;
}

const { title, variant = 'primary', class: className } = Astro.props;
---

<div class={`my-component my-component-${variant} ${className || ''}`}>
  <h3>{title}</h3>
  <slot />
</div>

<style>
  .my-component {
    padding: var(--spacing-4);
    border-radius: var(--radius-md);
  }
  
  .my-component-primary {
    background: var(--color-blue-500);
    color: var(--color-white);
  }
  
  .my-component-secondary {
    background: var(--color-gray-100);
    color: var(--color-gray-900);
  }
</style>
```

For more details on the design system, see the [Design System Documentation](/docs/design-system).
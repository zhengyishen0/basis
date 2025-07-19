---
title: Components Usage Guide
description: How to use UI and Marketing components in Basis
---

# Components Usage Guide

This guide covers how to use the 40+ UI components and 25+ marketing components included in Basis.

## Component Categories

### UI Components (`/src/components/ui/`)
Interactive components for building user interfaces, organized by functional categories:

#### Core Components (`/src/components/ui/core/`)
Essential building blocks for layouts and basic interactions:
- **Button** - Interactive buttons with variants
- **Card** - Content containers with header/body/footer
- **Row** - Horizontal layout component with flexbox options
- **List** - Vertical list container with Alpine.js template support
- **Divider** - Horizontal and vertical dividers

#### Form Components (`/src/components/ui/forms/`)
All form-related inputs and controls:
- **TextInput** - Text input fields with variants
- **Textarea** - Multi-line text areas with auto-resize
- **Checkbox** - Form checkboxes with custom styling
- **Switch** - Toggle controls
- **Select** - Searchable dropdown selects
- **RadioGroup** - Single-select option groups
- **DatePicker** - Interactive calendar date selection
- **RangeSlider** - Configurable range input sliders

#### Navigation Components (`/src/components/ui/navigation/`)
Navigation and wayfinding components:
- **Navbar** - Application navigation bar
- **NavigationMenu** - Advanced navigation with dropdowns
- **Breadcrumbs** - Navigation breadcrumb trails
- **Pagination** - Page navigation controls
- **MenuBar** - Application-style menu bars

#### Overlay Components (`/src/components/ui/overlays/`)
Components that float above content:
- **Modal** - Overlay dialogs
- **FullScreenModal** - Full screen overlay modals
- **Dropdown** - Toggleable menus
- **Popover** - Positioned popup content
- **Tooltip** - Hover information tooltips
- **HoverCard** - Tooltip-like cards with delay
- **SlideOver** - Side panel modals
- **ContextMenu** - Right-click context menus

#### Feedback Components (`/src/components/ui/feedback/`)
User feedback and state indicators:
- **Loading** - Loading state indicators
- **Error** - Error message displays
- **Empty** - Empty state messages
- **Alert** - Notification messages with variants
- **Toast** - Temporary notifications
- **Banner** - Top/bottom page announcements
- **Progress** - Progress bars with animations

#### Content Components (`/src/components/ui/content/`)
Content display and organization:
- **Table** - Data tables with responsive wrapper
- **Accordion** - Collapsible content sections
- **Tabs** - Tabbed content interfaces
- **Quotes** - Testimonial and citation blocks
- **ImageGallery** - Image gallery with lightbox
- **VideoPlayer** - Custom video player with controls

#### Interactive Components (`/src/components/ui/interactive/`)
Interactive widgets and tools:
- **Command** - Command palette interface
- **CopyToClipboard** - Copy text functionality
- **Rating** - Star rating components
- **MonacoEditor** - Code editor integration

#### Effects Components (`/src/components/ui/effects/`)
Visual effects and animations:
- **Marquee** - Scrolling text/content
- **TextAnimation** - Character-by-character text effects (GSAP)
- **TypingEffect** - Typewriter text animations
- **RetroGrid** - Animated grid backgrounds
- **Badge** - Status indicators and labels

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

### Component Import Structure

Components are organized by functional categories for better organization and discoverability:

```astro
---
// Import from specific categories
import { Button, Card, Row, List } from '@/components/ui/core';
import { TextInput, Checkbox, Select } from '@/components/ui/forms';
import { Navbar } from '@/components/ui/navigation';
import { Modal, Dropdown } from '@/components/ui/overlays';
import { Loading, Error, Empty } from '@/components/ui/feedback';
import { Table, Accordion } from '@/components/ui/content';
import { Rating, Command } from '@/components/ui/interactive';
import { Badge, Marquee } from '@/components/ui/effects';

// Marketing components (unchanged)
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

### Alpine.js Integration

All UI components support Alpine.js prop passing for seamless reactive behavior:

```astro
<!-- Core Components with Alpine.js -->
<Button 
  @click="handleClick()"
  :disabled="isLoading"
  :class="{ 'opacity-50': isLoading }"
  variant="solid"
>
  Submit
</Button>

<Card x-show="isVisible" x-transition>
  Dynamic content  <!-- Default slot goes to body -->
</Card>

<Row x-show="showFilters" justify="between">
  <Button @click="filter('all')">All</Button>
  <Button @click="filter('active')">Active</Button>
</Row>

<!-- Form Components with Alpine.js -->
<TextInput 
  x-model="searchQuery"
  @input="handleSearch()"
  placeholder="Search..."
/>

<Checkbox 
  :checked="isSelected"
  @change="toggleSelection($event.target.checked)"
/>

<!-- Feedback Components with Alpine.js -->
<Loading x-show="isLoading">
  Processing your request...
</Loading>

<Error x-show="hasError" x-text="errorMessage" />

<Empty x-show="items.length === 0 && !isLoading">
  <span>No items found</span>
</Empty>
```

**Components with Internal Alpine.js State** (use their own Alpine.js internally):
- **Navigation**: NavigationMenu, Pagination, MenuBar
- **Overlays**: All overlay components (Modal, Dropdown, Popover, etc.)
- **Content**: Accordion, Tabs, ImageGallery, VideoPlayer
- **Interactive**: All interactive components
- **Feedback**: Toast
- **Effects**: TypingEffect
- **Forms**: DatePicker

**Components that Pass Alpine.js Props** (accept Alpine.js directives as props):
- **Core**: All core components
- **Forms**: Most form components (except DatePicker)
- **Feedback**: Most feedback components (except Toast)
- **Effects**: Most effects components (except TypingEffect)
- **Navigation**: Navbar, Breadcrumbs
- **Content**: Table, Quotes

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

Components support both explicit slots and default content for cleaner syntax:

```astro
---
// Create composite components
import { Card, Button, Badge } from '@/components/ui/core';
import { Badge } from '@/components/ui/effects';
---

<!-- Clean syntax using default slot -->
<Card>
  <div slot="header">
    <h3>Product Name</h3>
    <Badge color="green">New</Badge>
  </div>
  
  <!-- Content goes to body by default -->
  <p>Product description goes here automatically...</p>
  <p>No need for slot="body"!</p>
  
  <div slot="footer">
    <Button variant="solid" color="blue">Buy Now</Button>
  </div>
</Card>

<!-- Simple cards are even cleaner -->
<Card>
  <h3>Simple Card</h3>
  <p>Just content, no explicit slots needed.</p>
</Card>

<!-- Modal example -->
<Modal>
  <h2 slot="header">Confirm Action</h2>
  
  <!-- Default content goes to body -->
  <p>Are you sure you want to delete this item?</p>
  
  <div slot="footer">
    <Button variant="outline">Cancel</Button>
    <Button variant="solid" color="red">Delete</Button>
  </div>
</Modal>
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
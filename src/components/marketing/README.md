# Pine Marketing Components

A complete collection of **26 marketing-focused Astro components** converted from Pine UI templates, optimized for the Basis stack (Astro + HTMX + Alpine.js).

## 📦 Available Components (26 Total)

### Hero Components (4)

- **HeroCentered** - Centered hero with large text and optional image
- **HeroSideBySide** - Side-by-side layout with text and image
- **HeaderDark** - Dark themed header with gradient and newsletter signup
- **HeaderWithNav** - Complete header with navigation and hero content

### Blog Components (3)

- **BlogGrid** - Responsive grid layout for blog posts
- **BlogHero** - Featured blog post hero section
- **BlogOverlayCards** - Striking blog cards with background images

### Content Components (2)

- **ContentFeatures** - Alternating feature sections with benefits
- **ContentHero** - Large typography hero with positioned image

### Feature Components (2)

- **FeatureGrid** - Responsive grid for showcasing features with icons
- **FeatureSideBySide** - Side-by-side layout with bullet points

### Testimonial Components (2)

- **TestimonialGrid** - Clean 3-column testimonial layout
- **TestimonialSideBySide** - Split layout with promotional content

### Pricing Components (2)

- **PricingCards** - Comprehensive pricing with detailed features
- **PricingSimple** - Clean, minimal pricing display

### FAQ Components (2)

- **FAQCards** - Simple FAQ with individual card layouts
- **FAQColumns** - Two-column FAQ layout

### Form Components (2)

- **LoginForm** - Split-screen login with promotional content
- **SignupForm** - Full-width signup with validation

### Footer Components (2)

- **FooterWithSocial** - Comprehensive footer with social media
- **FooterSimple** - Minimal horizontal footer layout

### Team Components (1)

- **TeamGrid** - Team member grid with multiple layouts

### Integration Components (2)

- **IntegrationLogos** - Grid for showcasing app integrations
- **LogoGrid** - Company/partner logo grid

### Navigation Components (1)

- **Navigation** - Interactive navigation header with Alpine.js

### Title Components (1)

- **TitleSections** - Hero title sections with gradient highlights

## 🎯 Quick Reference

### Hero Components

#### HeroSideBySide

A flexible hero section with side-by-side layout featuring text content on the left and an image on the right.

**Features:**

- Responsive design (stacks on mobile)
- Customizable primary colors (indigo, purple, blue, green, red, yellow)
- Flexible button configuration
- Image slot for custom images
- Full TypeScript support

**Usage:**

```astro
---
import { HeroSideBySide } from '@/components/pine-marketing';
---

<HeroSideBySide
  title="Beautiful Pages to"
  titleHighlight="Tell Your Story!"
  description="It's never been easier to build beautiful websites that convey your message and tell your story."
  primaryButtonText="Try It Free"
  primaryButtonHref="#trial"
  secondaryButtonText="Learn More"
  secondaryButtonHref="#features"
  primaryColor="indigo"
  imageUrl="https://example.com/hero-image.jpeg"
  imageAlt="Hero image description"
/>
```

#### HeroCentered

A centered hero section with large text, description, call-to-action buttons, and an optional image below.

**Features:**

- Fully centered text alignment
- Customizable primary color themes
- Optional image section
- Responsive typography
- Flexible button configuration

**Usage:**

```astro
---
import { HeroCentered } from '@/components/pine-marketing';
---

<HeroCentered
  title="Level Up Your"
  titleHighlight="Landing Pages"
  description="Award winning pages that will take your game to the next level!"
  primaryButtonText="Try It Free"
  primaryButtonHref="#trial"
  primaryColor="purple"
  imageUrl="https://example.com/hero-image.png"
  imageAlt="Product screenshot"
/>
```

### Header Components

#### HeaderWithNav

A complete header section with navigation, logo, and hero content. Features a mobile-responsive navigation menu with Alpine.js interactivity.

**Features:**

- Responsive navigation with mobile hamburger menu
- Alpine.js powered mobile menu toggle
- Customizable logo and branding
- Call-to-action buttons in navigation
- Hero content section below navigation
- Search icon integration

**Usage:**

```astro
---
import { HeaderWithNav } from '@/components/pine-marketing';
---

<HeaderWithNav
  logo="Your Brand"
  logoHref="/"
  navItems={[
    { text: "Home", href: "/", active: true },
    { text: "Features", href: "/features" },
    { text: "Blog", href: "/blog" },
    { text: "Contact", href: "/contact" }
  ]}
  heroTitle="Start Crafting Your Next Great Idea"
  heroDescription="Simplifying the creation of landing pages, blog pages, application pages and so much more!"
  primaryButtonText="Purchase Now"
  primaryButtonHref="#purchase"
/>
```

#### HeaderDark

A dark-themed header with gradient background, navigation, and newsletter signup. Features an elegant navigation with hover effects and email subscription form.

**Features:**

- Dark gradient background (gray-900 to black)
- Alpine.js powered mobile menu
- Animated navigation hover effects
- Newsletter signup form with email input
- Modern glassmorphism effects
- Customizable branding

**Usage:**

```astro
---
import { HeaderDark } from '@/components/pine-marketing';
---

<HeaderDark
  logo="Your Brand"
  logoHref="/"
  navItems={[
    { text: "Home", href: "/", active: true },
    { text: "Features", href: "/features" },
    { text: "Blog", href: "/blog" },
    { text: "Contact", href: "/contact" }
  ]}
  heroTitle="Simplify the way you design websites"
  heroDescription="If you are ready to change the way you design websites, then you'll want to use our block builder to make it fun and easy!"
/>
```

## Color Themes

All components support the following primary colors:

- `indigo` (default for some components)
- `purple` (default for some components)
- `blue`
- `green`
- `red`
- `yellow`

## Alpine.js Integration

These components require Alpine.js for interactive functionality:

1. Make sure Alpine.js is installed and configured in your Astro project
2. The components use `x-data`, `x-show`, and `@click` directives for mobile menu functionality
3. The `x-cloak` directive is used to prevent FOUC (Flash of Unstyled Content)

## Customization

### Slots

- **HeroSideBySide**: Use the `image` slot to provide custom image content
- **HeroCentered**: Use the `image` slot to provide custom image content

### Props

All components accept comprehensive props for customization:

- Colors and themes
- Text content
- Button configurations
- Navigation items
- Background options
- Container sizing

### Styling

Components use Pine UI design system classes and can be further customized by:

- Overriding CSS classes via props
- Using Pine UI utility classes
- Adding custom CSS for advanced styling

## TypeScript Support

All components include full TypeScript interfaces:

- `HeroSideBySideProps`
- `HeroCenteredProps`
- `HeaderWithNavProps`
- `HeaderDarkProps`
- `NavItem` interface for navigation items

## Browser Support

These components work in all modern browsers and include:

- Progressive enhancement for JavaScript features
- Responsive design for all screen sizes
- Accessible markup and keyboard navigation
- Optimized for performance and SEO

# Pine UI Component Development Guide - Compressed

## **Overview**

**Principle:** Create high-quality Astro components based on Pine UI with Alpine.js integration and flexible styling.

## **Development Process**

**Steps Must Follow:**

1. Research component from Pine UI (https://devdojo.com/pines/docs/{component-name}) and shadcn (https://ui.shadcn.com/docs/components//{component-name})
2. Get Pine UI for design reference & Get Shadcn UI for component implementation patterns → Get user choice
3. Review current components (@components/ui/{component-name} or {component-name}.astro) and identify problems → Discuss priorities
4. Propose solutions (the interface and the structure of the sub-components) → Get approval on approach
5. Plan exact changes → Get explicit green light
6. Execute with check-ins → Validate → Adjust
7. Build demo page → Only build one demo component to verify the core functionality works

## **Key Principles**

### **Astro Principles:**

- Use true slots following shadcn style
- Use @path imports from astro config
- Pass Alpine props through with `{...alpineProps}`
- One basic example per demo page

### **Alpine Principles:**

- Use x-for over server-side .map()
- Pass data as props, not JSON.stringify()
- Alpine state = behavior only, props = data
- Expose Alpine directives for parent override

### **Styling Principles:**

**CN vs CVA Guidelines:**

**Use CVA When:**
- UI components with 2+ independent variants (Button, Badge, Card)
- Complex variant combinations need TypeScript safety
- Component used extensively across codebase
- Structured variant system provides clarity

**Use cn() with conditionals When:**
- Simple utility components (Divider, Spacer)
- Dynamic values that can't be predefined (`my-${spacing}`)
- One-off styling logic is more readable
- Conditional classes are straightforward

**Standard Patterns:**
- **Complex UI**: `class={cn(variants({ variant, size }), className)}`
- **Simple Utility**: `class={cn('base', condition && 'extra', `dynamic-${value}`, className)}`

**Never:** Manual string concatenation without cn() conflict resolution
**Always:** Provide className prop for user overrides

### **Icon Principles:**

- Use Lucide icons only
- Import specific icons, don't bundle entire library

## **Universal Design System**

### **Layout System Principles:**

**Content-Driven Components (List, Grid, Inline):**
- Only have `gap` property for spacing between items
- Size determined by internal elements
- Have sensible default constraints (easily overridable with Tailwind)
- Handle dynamic/data-driven content
- Universal overflow behaviors:
  - **List**: `auto` (vertical scroll), `fixed` (clip), `expand` (grow) + default `max-h-screen`
  - **Grid**: `auto` (both scroll), `fixed` (clip), `expand` (grow)  
  - **Inline**: `auto` (horizontal scroll), `fixed` (clip), `expand` (grow), `wrap` (wrap to rows) + default `max-w-full`

**Layout-Driven Components (Column, Row):**
- Only have `justify` and `align` properties  
- No gap or padding
- Take up available space from parent container
- Handle static layout positioning
- Universal overflow behaviors:
  - **Row**: `auto` (scroll), `fixed` (clip), `expand` (grow), `wrap` (flex wrap)
  - **Column**: `auto` (scroll), `fixed` (clip), `expand` (grow)


**UI Components (Card, Button, Badge, etc.):**
- Have `padding` and `margin` properties (default to none/0)
- Default to fixed size
- Universal overflow options: `auto` (scroll), `fixed` (clip, default), `expand` (grow)

### **Universal Overflow System:**

**Four consistent overflow options across all components:**

- **`auto`**: Smart scrolling - container keeps size, content scrolls when needed (`overflow-auto`)
- **`fixed`**: Clipped content - container keeps size, content gets cut off (`overflow-hidden`)  
- **`expand`**: Container grows - container expands to fit all content naturally (no constraints)
- **`wrap`**: Flex wrapping - content wraps to new lines (Row/Inline only, `flex-wrap`)

**Default overflow by component type:**
- Content Components (List, Grid, Inline): `auto`
- Layout Components (Row, Column): `expand`  
- UI Components (Card, Button): `fixed`
- Dynamic Items (ListItem, GridItem): `expand`

### **Spacing Principles:**

- Gap for content-driven components only
- Padding/margin for UI components only
- Layout-driven components have no spacing properties

### **Theme Principles:**

- Universal color tokens in tailwind.config.js
- CVA variants: default, secondary, destructive, outline
- All components auto-use same color palette
- VariantProps for TypeScript support

## **Component Development Template**

**Steps:**

1. Research: Find Pine UI component examples → Present to user
2. Analysis: Review current implementation issues → Discuss priorities
3. Design: Propose component interface and approach → Get approval
4. Plan: List specific changes to be made → Get green light
5. Implement: Code with regular check-ins → Validate and adjust
6. Test: Build demo page → Verify all functionality works
7. Refine: Gather feedback → Make improvements → Document patterns

## **Reference Patterns**

### **Flexible Styling Pattern:**

```astro
export interface Props {
  items: Array<any>;
  className?: string
  [key: string]: any; // Alpine pass-through
}
```

### **Alpine Props Pass-through:**

```astro
<div
  x-data={xDataValue}
  items={items}
  {...alpineProps}
  class={cn("defaults", containerClass)}
>
```

### **Icon System:**

```astro
import { ChevronDown, Plus } from 'lucide-astro';
<div class={cn("w-6 h-6 flex items-center justify-center", iconClass)}>
```

### **CVA Variant System:**

```astro
const componentVariants = cva("base-classes", {
  variants: {
    variant: {
      default: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-destructive-foreground",
      outline: "border border-input bg-background"
    }
  }
});
```

## **Universal Factory System**

### **Factory Functions:**

**Content-Driven Components:**
```astro
import { createContentComponent } from '@/lib/component-variants'
const variants = createContentComponent('base-classes', { custom: {...} })
```

**Layout-Driven Components:**
```astro
import { createLayoutComponent } from '@/lib/component-variants'
const variants = createLayoutComponent('base-classes', { custom: {...} })
```

**UI Components:**
```astro  
import { createUIComponent } from '@/lib/component-variants'
const variants = createUIComponent('base-classes', { variant: {...} })
```

### **Universal Props:**

**Content-Driven:** `gap` + component-specific overflow options
- **List**: `gap`, `overflow` (scroll/extend) + default `max-h-screen`
- **Grid**: `gap`, `overflow` (scroll/extend) 
- **Inline**: `gap`, `overflow` (scroll/extend/wrap) + default `max-w-full`

**Layout-Driven:** `justify`, `align` + component-specific overflow options
- **Row**: `justify`, `align`, `overflow` (shrink/wrap)
- **Column**: `justify`, `align`, `overflow` (shrink/extend)

**UI:** `size`, `padding`, `margin`, `elevation`, `overflow` (hidden/extend/horizontal/vertical)

### **Factory Benefits:**

- Enforced consistency across all components
- Single source of truth for spacing/sizing
- Type safety with VariantProps
- Reduced boilerplate vs manual CVA

### **Implementation Examples:**

**Content Component:**
```astro
// List example
const listVariants = createContentComponent('flex flex-col', {
    overflow: {
        scroll: universalVariants.overflow.scrollY, // Vertical scroll
        extend: universalVariants.overflow.extend,  // Content spills out
    }
});

export interface Props extends ContentComponentProps {
    overflow?: 'scroll' | 'extend';
}
const { gap, overflow, class: className, ...alpineProps } = Astro.props
<div class={cn(listVariants({ gap, overflow }), className)} {...alpineProps}>
```

**Layout Component:**
```astro
// Row example  
const rowVariants = createLayoutComponent('flex flex-row', {
    justify: {
        ...universalVariants.justify,
        grid: 'grid grid-cols-[1fr_auto_1fr] [&>:nth-child(1)]:justify-self-start [&>:nth-child(2)]:justify-self-center [&>:nth-child(3)]:justify-self-end',
    },
    overflow: {
        shrink: universalVariants.overflow.shrink,  // Default flex shrink
        wrap: universalVariants.overflow.wrap,      // Wrap to new rows
        scroll: universalVariants.overflow.scrollX, // Horizontal scroll
    }
});

export interface Props extends LayoutComponentProps {
    justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'grid';
    overflow?: 'shrink' | 'wrap' | 'scroll';
}
const { justify, align, overflow, class: className, ...alpineProps } = Astro.props
<div class={cn(rowVariants({ justify, align, overflow }), className)} {...alpineProps}>
```

**UI Component:**
```astro
export interface Props extends UIComponentProps, VariantProps<typeof variants> {
  customProp?: string
}
const { size, padding, margin, elevation, overflow, customProp, class: className, ...alpineProps } = Astro.props
<div class={cn(variants({ size, padding, margin, elevation, overflow, customProp }), className)} {...alpineProps}>
```

## **Component Status**

**✅ New Layout System Compliant:** 
- Content-Driven: List (max-h-screen), Grid, Inline (max-w-full)
- Layout-Driven: Row (shrink/wrap), Column (shrink/extend)
- UI Components: Card, CardHeader, CardContent, CardFooter, Button, Badge, Alert, Navbar (moved to display)

**⚠️ Needs Migration:** TextInput, Modal, Table, Command, and remaining UI components
**❌ Critical:** Marketing components using inline margins instead of layout wrappers

**Key Improvements Made:**
- Clear role separation: Dynamic content vs Static layout
- Default constraints prevent common overflow issues  
- Navbar moved to display (UI component with padding/elevation)
- Tailwind override strategy for customization

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

- CVA + tailwind-merge for conflict resolution
- cn() utility for all dynamic classes

### **Icon Principles:**

- Use Lucide icons only
- Import specific icons, don't bundle entire library

## **Universal Design System**

### **Spacing Principles:**

- Gap for layout components (Row, Column, Grid)
- Padding for UI components (Button, Card, Input)
- Margin left for developer utility classes

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

**Layout Components:**
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

**Layout:** `gap`, `padding`, `justify`, `align`  
**UI:** `size`, `padding`, `elevation`

### **Factory Benefits:**

- Enforced consistency across all components
- Single source of truth for spacing/sizing
- Type safety with VariantProps
- Reduced boilerplate vs manual CVA

### **Implementation:**

```astro
export interface Props extends LayoutComponentProps, VariantProps<typeof variants> {
  customProp?: string
}
const { gap, padding, justify, align, customProp, class: className, ...rest } = Astro.props
<div class={cn(variants({ gap, padding, justify, align, customProp }), className)} {...rest}>
```

## **Component Status**

**✅ Compliant:** Row, Column, List, Grid, Page, Section, Button, Badge, Accordion  
**⚠️ Needs Migration:** Card, Alert, TextInput, Modal  
**❌ Critical:** Components using hardcoded colors vs theme tokens

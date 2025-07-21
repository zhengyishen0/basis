# Pine UI Component Development Guide

## Overview
This guide outlines our process for creating high-quality Astro components based on Pine UI examples, with proper Alpine.js integration and flexible styling.

## Key Steps (Complete Process)

### 1. **Collaboration First** 🎯 (MOST CRITICAL)
- **Research & Present**: Show Pine UI examples → Get your choice of which example to use
- **Discuss Issues**: Identify current component problems → Get your priorities  
- **Propose Solutions**: Present implementation options → Get your approval on approach
- **Plan Changes**: Report exactly what I'll change → Get explicit green light
- **Execute with Check-ins**: Code → Validate with you → Adjust based on feedback

### 2. **Technical Research**
- Fetch original Pine UI component examples from devdojo.com
- Compare with current implementation to identify issues
- Understand Alpine.js patterns and state management
- Identify gaps and overcomplications in existing code

### 3. **Infrastructure Setup**
- Ensure class merging tools are installed (CVA + clsx + tailwind-merge)
- Create/update utility functions (`cn()` in `src/lib/utils.ts`)
- Handle build/import issues and CSS conflicts
- Set up Lucide icons if not already available

### 4. **Component Design & Interface**
- Design flexible TypeScript interfaces with proper props
- Plan styling prop architecture (container, item, button, content levels)
- Consider Alpine.js integration patterns and data flow
- **Deep thinking required** - Component structure needs careful architectural consideration

### 5. **Implementation Standards**
- Convert to Alpine.js x-for patterns (not server-side .map())
- Implement comprehensive class merging strategy
- Create proper icon systems using Lucide icons
- Handle animations and state transitions
- Expose Alpine.js directives (x-data pass-through)

### 6. **Testing & Refinement**
- Build comprehensive demo pages showing all variations
- Fix technical issues iteratively (SVG formats, sizing, etc.)
- Adjust based on user feedback and real usage

## Key Considerations & Lessons Learned

### **Astro-Specific Patterns & Requirements**
- **Use True Slots**: Follow shadcn style with proper slot composition (always check shadcn components first for inspiration and guidance)
- **Use @path imports**: Import components using Astro's @path syntax from astro config
- **Component Organization**: Keep all components in folders with index.ts files containing component comments (never put comments in component files themselves)
- **Demo Pages**: Only show one basic example per demo page
- **Pass Alpine Props Through**: Enable x-data, @click, :class pass-through to parent components
- **Server vs Client Rendering**: Understand what runs where

### **Alpine.js Integration Patterns**
- **Use x-for over server-side .map()**: Better reactivity and performance for dynamic content
- **Pass data as props, not JSON.stringify()**: Use `items={data}` prop, Alpine accesses directly via `items`
- **Template literals in x-data**: Handle dynamic Alpine state properly with escaping
- **Expose Alpine directives**: Allow parent components to override Alpine behavior via `{...alpineProps}`
- **State management**: Keep Alpine state simple and predictable - only behavior, not data
- **Separation of concerns**: x-data for behavior/methods, props for actual data

### **Class Merging Strategy**
- **CVA + tailwind-merge**: Essential for conflict resolution (p-8 overrides p-5, text-red-500 appends)
- **Granular styling props**: containerClass, itemClass, buttonClass, contentClass, iconClass
- **Sensible defaults**: Provide Pine UI styling as fallbacks, user can override
- **cn() utility everywhere**: Apply to all dynamic class situations

### **Icon & Animation Systems**
- **Use Lucide icons**: Standard, well-maintained icon library for consistency
- **Import specific icons**: Don't bundle entire library, import only what's needed
- **Consistent container sizing**: Use shared container with centered content approach
- **Proper animation patterns**: Understand rotation, opacity, scale, and transition timing
- **Size hierarchy**: Container → Icon → Visual balance considerations

### **Technical Debugging Patterns**
- **CSS import conflicts**: Comment out unused CSS imports that cause build errors
- **HTML entity escaping**: Use &#123; for curly braces in documentation examples
- **SVG rendering issues**: Check viewBox, stroke, fill properties, and coordinate formats
- **Container sizing**: Parent container constrains child element sizing - size containers appropriately
- **Alpine.js errors**: Check for proper x-data syntax and template literal escaping

## Implementation Standards & Rules

### **Before Any Code Changes**
1. **ALWAYS consult first** - Present findings and options, get user approval
2. **Report change plans** - List exactly what files and functionality will be modified  
3. **Ask for preferences** - When multiple approaches exist, let user choose
4. **Get explicit approval** - Don't proceed without clear green light from user

### **Component Architecture Requirements**
1. **Deep thinking required** - Component structure and interface design needs careful consideration
2. **Consider Astro limitations** - Work within framework constraints, don't fight them
3. **Plan Alpine.js integration** - How will client-side reactivity work with server rendering?
4. **Design for flexibility** - Expose the right styling and behavior props without overwhelming users
5. **Maintain Pine UI fidelity** - Stay true to original design while adding Astro-specific improvements

### **Code Implementation Standards**
1. **Follow shadcn patterns** - Always check shadcn components first for inspiration and guidance on slot composition
2. **Use @path imports** - Import all components using Astro's @path syntax (e.g., `import { cn } from '@/lib/utils'`)
3. **Component organization** - Keep components in folders with index.ts containing comments, never in component files
4. **Alpine x-for over Astro .map()** - Better for dynamic content that needs reactivity
5. **True slot composition** - Use proper slot patterns following shadcn style
6. **Class merging everywhere** - Use cn() utility for all dynamic class combinations
7. **Pass-through Alpine props** - Enable x-data, @click, :class, and other Alpine directive pass-through
8. **Proper TypeScript interfaces** - Document all props clearly with good examples
9. **Lucide icons only** - Use consistent icon library, don't mix sources
10. **Demo simplicity** - Only show one basic example per demo page

### **Quality Assurance Process**
1. **Build demo pages** - Test all variations, edge cases, and styling combinations
2. **Handle technical issues systematically** - SVG formats, CSS conflicts, container sizing
3. **Iterative refinement** - Get user feedback → adjust → validate → repeat
4. **Document thoroughly** - Usage examples, prop explanations, common patterns
5. **Test Alpine.js integration** - Ensure client-side reactivity works as expected

## Common Patterns & Solutions

### **Flexible Styling Pattern**
```astro
---
import { cn } from '@/lib/utils';

export interface Props {
  // Core functionality
  items: Array<{ title: string; content: string }>;
  
  // Styling flexibility
  containerClass?: string;
  itemClass?: string;
  buttonClass?: string;
  contentClass?: string;
  iconClass?: string;
  
  // Behavior options
  iconType?: 'chevron' | 'plus';
}
---

<div class={cn("default-container-classes", containerClass)}>
  <template x-for="(item, index) in items" :key="index">
    <div :class={`"${cn('default-item-classes', itemClass)}"`}>
      <!-- Component content -->
    </div>
  </template>
</div>
```

### **Alpine.js Props Pass-through Pattern**
```astro
---
export interface Props {
  // Specific props
  items: Array<any>;
  // Alpine.js pass-through - any Alpine directive can be passed
  [key: string]: any;
}

const {
  items,
  containerClass,
  // ... other specific props
  ...alpineProps
} = Astro.props;

// Default Alpine.js data (no need for JSON.stringify - data passed as props)
const defaultXData = `{ 
  activeAccordion: '', 
  setActiveAccordion(id) { 
    this.activeAccordion = (this.activeAccordion == id) ? '' : id 
  } 
}`;
const xDataValue = alpineProps['x-data'] || defaultXData;
---

<div 
  x-data={xDataValue}
  items={items}
  {...alpineProps}
  class={cn("default-classes", containerClass)}
>
  <!-- Alpine.js can access items prop directly -->
  <template x-for="(item, index) in items" :key="index">
    <!-- Template content -->
  </template>
</div>
```

**Usage:**
```astro
<Component 
  items={data}
  x-data="{ custom: 'data' }"
  x-init="console.log('init')"
  @custom-event="handleEvent()"
  :class="dynamicClass"
/>
```

### **Icon System Pattern**
```astro
---
import { ChevronDown, Plus, Minus } from 'lucide-astro';
---

<!-- Consistent container with icon-specific content -->
<div class={cn("w-6 h-6 flex items-center justify-center", iconClass)}>
  {iconType === 'chevron' ? (
    <ChevronDown class="w-5 h-5" />
  ) : (
    <Plus class="w-4 h-4" />
  )}
</div>
```

## The Meta-Lesson

**Component development is architecture work** - It requires deep thinking about:
- How users will consume and customize the component
- What flexibility they need vs. complexity overhead they'll tolerate
- How the component fits in the larger design system
- What the right abstraction level is for the use cases
- How to balance Pine UI design fidelity with Astro-specific patterns
- How Alpine.js client-side reactivity integrates with server-side rendering

**Process Philosophy: Always collaborate, think deeply about architecture, then execute systematically with user validation at each step.**

## Next Steps Template

When starting a new component:

1. **Research**: Find Pine UI component examples → Present to user
2. **Analysis**: Review current implementation issues → Discuss priorities
3. **Design**: Propose component interface and approach → Get approval  
4. **Plan**: List specific changes to be made → Get green light
5. **Implement**: Code with regular check-ins → Validate and adjust
6. **Test**: Build demo page → Verify all functionality works
7. **Refine**: Gather feedback → Make improvements → Document patterns

Remember: **Collaboration and approval before coding is the most critical step.**
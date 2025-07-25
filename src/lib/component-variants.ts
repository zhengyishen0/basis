import { cva } from 'class-variance-authority';

// Re-export VariantProps for component use
export { type VariantProps } from 'class-variance-authority';

/**
 * Universal variant building blocks
 * Single source of truth for all component variants
 */
export const universalVariants = {
  // Core sizing (all components)
  size: {
    xs: "text-xs",
    sm: "text-sm", 
    md: "text-base",
    lg: "text-lg",
    xl: "text-xl"
  },
  
  // Border width system
  borderWidth: {
    none: "border-0",
    thin: "border",      // 1px
    thick: "border-2",   // 2px
    heavy: "border-4"    // 4px
  },
  
  // Spacing system for gaps (content-driven components only: list, grid, inline)
  gap: {
    none: "gap-0",
    xs: "gap-1",     // 4px
    sm: "gap-2",     // 8px
    md: "gap-4",     // 16px
    lg: "gap-6",     // 24px
    xl: "gap-8",     // 32px
    "2xl": "gap-12", // 48px
    "3xl": "gap-16"  // 64px
  },
  
  // Padding system (UI components only)
  padding: {
    none: "p-0",
    xs: "p-1",       // 4px
    sm: "p-2",       // 8px
    md: "p-4",       // 16px
    lg: "p-6",       // 24px
    xl: "p-8",       // 32px
    "2xl": "p-12",   // 48px
    "3xl": "p-16"    // 64px
  },
  
  // Margin system (UI components only, defaults to none)
  margin: {
    none: "m-0",
    xs: "m-1",       // 4px
    sm: "m-2",       // 8px
    md: "m-4",       // 16px
    lg: "m-6",       // 24px
    xl: "m-8",       // 32px
    "2xl": "m-12",   // 48px
    "3xl": "m-16"    // 64px
  },
  
  // Elevation system (UI components)
  elevation: {
    none: "shadow-none",
    flat: "shadow-flat",
    elevated: "shadow-elevated",
    floating: "shadow-floating",
    lifted: "shadow-lifted",
    high: "shadow-high"
  },

  // Layout properties (layout-driven components only: column, row)
  justify: {
    start: "justify-start",
    center: "justify-center",
    end: "justify-end",
    between: "justify-between",
    around: "justify-around",
    evenly: "justify-evenly"
  },

  align: {
    start: "items-start",
    center: "items-center", 
    end: "items-end",
    stretch: "items-stretch",
    baseline: "items-baseline"
  },

  // Direction system for cards and other directional components
  direction: {
    row: "flex-row",
    column: "flex-col",
    "row-reverse": "flex-row-reverse",
    "column-reverse": "flex-col-reverse"
  },

  // Shape system (UI components)
  shape: {
    rectangle: "rounded-none",
    rounded: "rounded-lg", 
    pill: "rounded-full"
  },

  // Layout sizing for Row and Column components
  layoutSize: {
    fit: "",              // Size to content (default behavior)
    full: "w-full h-full", // Take full available space
    width: "w-full",      // Take full width only
    height: "h-full"      // Take full height only
  },
  
  // Overflow options - simplified and consistent
  overflow: {
    // Universal options for all components
    auto: "overflow-auto",      // Content scrolls when needed
    fixed: "overflow-hidden",   // Content has fixed boundaries
    expand: "",                 // Container expands with content (no overflow constraints)
    // Special case for flex wrapping (Row, Inline only)
    wrap: "flex-wrap"
  },

  // Overlay-specific variants
  overlay: {
    // Positioning variants
    positioning: {
      center: "inset-0 items-center justify-center",
      left: "inset-y-0 left-0 items-center",
      right: "inset-y-0 right-0 items-center",
      top: "inset-x-0 top-0 justify-center",
      bottom: "inset-x-0 bottom-0 justify-center",
      fullscreen: "inset-0",
      positioned: "absolute"
    },
    
    // Backdrop variants
    backdrop: {
      dark: "bg-black/50",
      blur: "bg-black/20 backdrop-blur-sm",
      none: "bg-transparent"
    },
    
    // Theme variants
    theme: {
      default: "bg-background border-border text-foreground",
      dark: "bg-gray-900 border-gray-700 text-white",
      minimal: "bg-white border-gray-200 text-gray-900 shadow-sm"
    },
    
    // Size variants for overlays
    sizes: {
      sm: "max-w-sm",
      md: "max-w-md", 
      lg: "max-w-lg",
      xl: "max-w-xl",
      "2xl": "max-w-2xl",
      "3xl": "max-w-3xl",
      full: "max-w-full",
      auto: "w-auto"
    }
  }
} as const;

/**
 * Factory function for content-driven components (List, Grid, Inline)
 * Content-driven components only have gap and overflow behaviors
 */
export const createContentComponent = (baseClasses: string, customVariants = {}) => 
  cva(baseClasses, {
    variants: {
      gap: universalVariants.gap,
      // Overflow options will be customized per component
      ...customVariants
    },
    defaultVariants: {
      gap: "md"
    }
  });

/**
 * Factory function for layout-driven components (Row, Column)
 * Layout-driven components only have justify/align and overflow behaviors
 */
export const createLayoutComponent = (baseClasses: string, customVariants = {}) => 
  cva(baseClasses, {
    variants: {
      justify: universalVariants.justify,
      align: universalVariants.align,
      // Overflow options will be customized per component
      ...customVariants
    },
    defaultVariants: {
      justify: "start",
      align: "stretch"
    }
  });

/**
 * Factory function for UI components (Button, Badge, Card, etc.)
 * UI components have padding/margin (default none) and overflow options
 */
export const createUIComponent = (baseClasses: string, customVariants = {}) =>
  cva(baseClasses, {
    variants: {
      size: universalVariants.size,
      padding: universalVariants.padding,
      margin: universalVariants.margin,
      elevation: universalVariants.elevation,
      overflow: {
        auto: universalVariants.overflow.auto,
        fixed: universalVariants.overflow.fixed,
        expand: universalVariants.overflow.expand
      },
      ...customVariants
    },
    defaultVariants: {
      size: "md",
      padding: "none",
      margin: "none",
      elevation: "none",
      overflow: "fixed"
    }
  });

/**
 * Universal TypeScript types for consistent component interfaces
 */
export type UniversalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type UniversalSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type UniversalElevation = 'none' | 'flat' | 'elevated' | 'floating' | 'lifted' | 'high';
export type UniversalJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type RowJustify = UniversalJustify | 'grid';
export type UniversalAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';
export type UniversalDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type UniversalShape = 'rectangle' | 'rounded' | 'pill';
export type UniversalLayoutSize = 'fit' | 'full' | 'width' | 'height';
// Simplified overflow types
export type ContentOverflow = 'auto' | 'fixed' | 'expand';
export type FlexOverflow = 'auto' | 'fixed' | 'expand' | 'wrap';  // Row, Inline get wrap option
export type LayoutOverflow = 'auto' | 'fixed' | 'expand';
export type UIOverflow = 'auto' | 'fixed' | 'expand';

/**
 * Standard interface for content-driven components (List, Grid, Inline)
 */
export interface ContentComponentProps {
  gap?: UniversalSpacing;
  overflow?: ContentOverflow;
  class?: string;
  [key: string]: any; // Alpine.js pass-through
}

/**
 * Standard interface for layout-driven components (Row, Column)
 */
export interface LayoutComponentProps {
  justify?: UniversalJustify;
  align?: UniversalAlign;
  overflow?: LayoutOverflow;
  class?: string;
  [key: string]: any; // Alpine.js pass-through
}

/**
 * Standard interface for UI components  
 */
export interface UIComponentProps {
  size?: UniversalSize;
  padding?: UniversalSpacing;
  margin?: UniversalSpacing;
  elevation?: UniversalElevation;
  overflow?: UIOverflow;
  class?: string;
  [key: string]: any; // Alpine.js pass-through
}

/**
 * Factory function for overlay components (Dialog, Popup)
 * Overlay components have positioning, backdrop, and theme variants
 */
export const createOverlayComponent = (baseClasses: string, customVariants = {}) =>
  cva(baseClasses, {
    variants: {
      variant: universalVariants.overlay.positioning,
      backdrop: universalVariants.overlay.backdrop,
      theme: universalVariants.overlay.theme,
      size: universalVariants.overlay.sizes,
      ...customVariants
    },
    defaultVariants: {
      variant: "center",
      backdrop: "dark", 
      theme: "default",
      size: "md"
    }
  });

/**
 * Standard interface for overlay components
 */
export interface OverlayComponentProps {
  variant?: 'center' | 'left' | 'right' | 'top' | 'bottom' | 'fullscreen' | 'positioned';
  backdrop?: 'dark' | 'blur' | 'none';
  theme?: 'default' | 'dark' | 'minimal';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full' | 'auto';
  class?: string;
  [key: string]: any; // Alpine.js pass-through
}
import { cva, type VariantProps } from 'class-variance-authority';

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
  
  // Overflow options
  overflow: {
    // For content-driven components
    scroll: "overflow-auto",
    scrollX: "overflow-x-auto",
    scrollY: "overflow-y-auto", 
    extend: "overflow-visible",
    wrap: "flex-wrap",
    // For layout-driven components
    shrink: "",
    // For UI components
    hidden: "overflow-hidden",
    horizontal: "overflow-x-auto overflow-y-hidden",
    vertical: "overflow-y-auto overflow-x-hidden"
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
        hidden: universalVariants.overflow.hidden,
        extend: universalVariants.overflow.extend,
        horizontal: universalVariants.overflow.horizontal,
        vertical: universalVariants.overflow.vertical
      },
      ...customVariants
    },
    defaultVariants: {
      size: "md",
      padding: "none",
      margin: "none",
      elevation: "none",
      overflow: "hidden"
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
// Component-specific overflow types
export type ListOverflow = 'scroll' | 'extend';
export type GridOverflow = 'scroll' | 'extend'; 
export type InlineOverflow = 'scroll' | 'extend' | 'wrap';
export type RowOverflow = 'shrink' | 'wrap' | 'scroll';
export type ColumnOverflow = 'shrink' | 'scroll';
export type UIOverflow = 'hidden' | 'extend' | 'horizontal' | 'vertical';

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
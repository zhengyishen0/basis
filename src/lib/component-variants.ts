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
  
  // Spacing system for gaps (layout components)
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
  
  // Padding system (UI components)
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
  
  // Elevation system (UI components)
  elevation: {
    none: "shadow-none",
    flat: "shadow-flat",
    elevated: "shadow-elevated",
    floating: "shadow-floating",
    lifted: "shadow-lifted",
    high: "shadow-high"
  },

  // Common layout properties
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
  }
} as const;

/**
 * Factory function for layout components (Row, Column, Grid, List)
 * Layout components manage structure and spacing between children
 */
export const createLayoutComponent = (baseClasses: string, customVariants = {}) => 
  cva(baseClasses, {
    variants: {
      gap: universalVariants.gap,
      padding: universalVariants.padding,
      justify: universalVariants.justify,
      align: universalVariants.align,
      ...customVariants
    },
    defaultVariants: {
      gap: "md",
      padding: "none",
      justify: "start",
      align: "center"
    }
  });

/**
 * Factory function for UI components (Button, Badge, Card, etc.)
 * UI components manage content presentation and user interaction
 */
export const createUIComponent = (baseClasses: string, customVariants = {}) =>
  cva(baseClasses, {
    variants: {
      size: universalVariants.size,
      padding: universalVariants.padding,
      elevation: universalVariants.elevation,
      ...customVariants
    },
    defaultVariants: {
      size: "md",
      padding: "md",
      elevation: "none"
    }
  });

/**
 * Universal TypeScript types for consistent component interfaces
 */
export type UniversalSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type UniversalSpacing = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl';
export type UniversalElevation = 'none' | 'flat' | 'elevated' | 'floating' | 'lifted' | 'high';
export type UniversalJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
export type UniversalAlign = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/**
 * Standard interface for layout components
 */
export interface LayoutComponentProps {
  gap?: UniversalSpacing;
  padding?: UniversalSpacing;
  justify?: UniversalJustify;
  align?: UniversalAlign;
  class?: string;
  [key: string]: any; // Alpine.js pass-through
}

/**
 * Standard interface for UI components  
 */
export interface UIComponentProps {
  size?: UniversalSize;
  padding?: UniversalSpacing;
  elevation?: UniversalElevation;
  class?: string;
  [key: string]: any; // Alpine.js pass-through
}
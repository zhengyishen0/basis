import { cva } from 'class-variance-authority';

/**
 * Universal color variants for components
 * Use this for components that need color support but don't have full CVA setup
 */
export const colorVariants = cva('', {
  variants: {
    color: {
      default: 'bg-primary text-primary-foreground',
      primary: 'bg-primary text-primary-foreground', 
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      success: 'bg-success text-success-foreground',
      warning: 'bg-warning text-warning-foreground',
      info: 'bg-info text-info-foreground',
      muted: 'bg-muted text-muted-foreground',
      accent: 'bg-accent text-accent-foreground',
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

/**
 * Border color variants
 */
export const borderColorVariants = cva('', {
  variants: {
    color: {
      default: 'border-primary',
      primary: 'border-primary', 
      secondary: 'border-secondary',
      destructive: 'border-destructive',
      success: 'border-success',
      warning: 'border-warning',
      info: 'border-info',
      muted: 'border-muted',
      accent: 'border-accent',
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

/**
 * Text color variants
 */
export const textColorVariants = cva('', {
  variants: {
    color: {
      default: 'text-primary',
      primary: 'text-primary', 
      secondary: 'text-secondary',
      destructive: 'text-destructive',
      success: 'text-success',
      warning: 'text-warning',
      info: 'text-info',
      muted: 'text-muted',
      accent: 'text-accent',
      foreground: 'text-foreground',
    }
  },
  defaultVariants: {
    color: 'default'
  }
});

/**
 * Elevation variants
 */
export const elevationVariants = cva('', {
  variants: {
    elevation: {
      none: 'shadow-none',
      flat: 'shadow-flat',
      elevated: 'shadow-elevated',
      floating: 'shadow-floating',
      lifted: 'shadow-lifted',
      high: 'shadow-high'
    }
  },
  defaultVariants: {
    elevation: 'none'
  }
});

/**
 * Sizing variants for components
 */
export const sizeVariants = cva('', {
  variants: {
    size: {
      xs: 'text-xs h-6',
      sm: 'text-sm h-8', 
      md: 'text-sm h-10',
      lg: 'text-base h-12',
      xl: 'text-lg h-14'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

/**
 * Padding variants by size
 */
export const paddingBySize = cva('', {
  variants: {
    size: {
      xs: 'px-2 py-1',
      sm: 'px-3 py-1.5',
      md: 'px-4 py-2',
      lg: 'px-6 py-3',
      xl: 'px-8 py-4'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

/**
 * Icon sizing by component size
 */
export const iconSizeByComponent = cva('', {
  variants: {
    size: {
      xs: 'w-3 h-3',
      sm: 'w-4 h-4',
      md: 'w-5 h-5', 
      lg: 'w-6 h-6',
      xl: 'w-7 h-7'
    }
  },
  defaultVariants: {
    size: 'md'
  }
});

/**
 * Common types
 */
export type ColorVariant = 'default' | 'primary' | 'secondary' | 'destructive' | 'success' | 'warning' | 'info' | 'muted' | 'accent';
export type ElevationVariant = 'none' | 'flat' | 'elevated' | 'floating' | 'lifted' | 'high';
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
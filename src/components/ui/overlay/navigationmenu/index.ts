// NavigationMenu - Re-exports leveraging existing popup infrastructure
export { default as NavigationMenu } from './NavigationMenu.astro';
export { default as NavigationMenuList } from './NavigationMenuList.astro';
export { default as NavigationMenuItem } from './NavigationMenuItem.astro';
export { default as NavigationMenuContent } from './NavigationMenuContent.astro';
export { default as NavigationMenuLink } from './NavigationMenuLink.astro';

// Re-export from existing popup components for consistency
export { default as NavigationMenuTrigger } from '../popup/PopupTrigger.astro';

// Type exports
export type { NavigationMenuItemData } from './NavigationMenu.astro';
export type { NavigationMenuContentData } from './NavigationMenuContent.astro';
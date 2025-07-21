/**
 * Core Components - Tailwind Migration
 * 
 * This directory contains the core layout components that have been migrated from CSS to Tailwind utility classes.
 */

// Core layout components
export { default as Column } from './Column.astro';
export { default as List } from './List.astro';
export { default as Row } from './Row.astro';
export { default as Spacer } from './Spacer.astro';

// Content components
export { default as Text } from './Text.astro';
export { default as Switch } from './Switch.astro';

// Utility components
export { default as Divider } from './Divider.astro';
export { default as Empty } from './Empty.astro';
export { default as Error } from './Error.astro';
export { default as Grid } from './Grid.astro';
export { default as Loading } from './Loading.astro';
export { default as Page } from './Page.astro';
export { default as Section } from './Section.astro';

/**
 * Row Component
 * 
 * Unified horizontal layout component - replaces both the old Row and ListItem components, plus can handle navbar scenarios.
 * 
 * Props:
 * - justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly' | 'grid'
 * - align: 'start' | 'center' | 'end' | 'stretch' | 'baseline'
 * - gap: '1' | '2' | '3' | '4' | '6' | '8'
 * - wrap: boolean
 * - padding: '2' | '3' | '4' | '6' | '8'
 * - interactive: boolean (hover states)
 * - bordered: boolean (bottom border)
 * - sticky: boolean (sticky positioning)
 * 
 * Key Feature: Grid Centering
 * When justify="grid", the Row uses CSS Grid (grid-cols-[auto_1fr_auto]) to perfectly center the middle child. 
 * Requires exactly 3 children:
 * 
 * Example - Navbar with perfectly centered title:
 * <Row justify="grid" sticky padding="4" class="bg-white border-b">
 *   <Button>← Back</Button>           // Left column
 *   <Text as="h1">App Title</Text>    // Center column (auto-centered)
 *   <Button>Menu</Button>             // Right column
 * </Row>
 * 
 * Example - If no right content, use Spacer component as spacer:
 * <Row justify="grid">
 *   <Button>← Back</Button>
 *   <Text as="h1">App Title</Text>
 *   <Spacer />                        // Semantic spacer for grid
 * </Row>
 * 
 * Usage Examples:
 * 
 * Regular flexbox layouts:
 * <Row justify="between" gap="4">
 *   <Button>Cancel</Button>
 *   <Button>Save</Button>
 * </Row>
 * 
 * Interactive list items:
 * <Row interactive bordered padding="3" align="center" gap="3">
 *   <Checkbox />
 *   <Text class="flex-1 min-w-0">Task description</Text>
 *   <Button size="sm">Delete</Button>
 * </Row>
 * 
 * Filter bars:
 * <Row justify="between" wrap>
 *   <Row gap="2">
 *     <Button size="sm">All</Button>
 *     <Button size="sm">Active</Button>
 *   </Row>
 *   <Text>Signed in as: John</Text>
 * </Row>
 */

/**
 * Column Component
 * 
 * Vertical layout component with Tailwind-based styling.
 * 
 * Props:
 * - align: 'start' | 'center' | 'end' | 'stretch' (items alignment)
 * - justify: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
 * - gap: '1' | '2' | '3' | '4' | '6' | '8'
 * - height: 'auto' | 'full' | 'screen' | 'fit'
 * - width: 'auto' | 'full' | 'fit'
 * - padding: '2' | '3' | '4' | '6' | '8'
 * 
 * Usage Examples:
 * 
 * Basic vertical stacking:
 * <Column gap="4">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </Column>
 * 
 * Centered content:
 * <Column align="center" justify="center" height="screen">
 *   <div>Perfectly centered content</div>
 * </Column>
 * 
 * Sidebar layout:
 * <Column width="fit" padding="6" gap="6">
 *   <Button>Menu Item 1</Button>
 *   <Button>Menu Item 2</Button>
 * </Column>
 */

/**
 * List Component
 * 
 * Scrollable container for list items with built-in Alpine.js support.
 * 
 * Props:
 * - gap: '1' | '2' | '3' | '4' | '6' (spacing between items)
 * - maxHeight: 'none' | '32' | '48' | '64' | '96' | 'screen'
 * - padding: '2' | '3' | '4' | '6' (inner padding)
 * - divided: boolean (divider lines between items)
 * 
 * Key Features:
 * - Auto-scrolling: Built-in overflow-y-auto with proper flex behavior
 * - Height constraints: Use maxHeight to limit height and enable scrolling
 * - Alpine.js integration: Automatic template handling for x-for directives
 * - Dividers: Use divided prop for separator lines between items
 * 
 * Usage Examples:
 * 
 * Basic scrollable list:
 * <List gap="2" maxHeight="48">
 *   <Row>Item 1</Row>
 *   <Row>Item 2</Row>
 * </List>
 * 
 * Divided list with padding:
 * <List divided padding="4" gap="0">
 *   <Row padding="3">Item 1</Row>
 *   <Row padding="3">Item 2</Row>
 * </List>
 * 
 * Alpine.js dynamic list:
 * <List x-for="item in items" x-key="item.id" gap="1">
 *   <Row interactive bordered padding="4">
 *     <span x-text="item.name"></span>
 *   </Row>
 * </List>
 */

/**
 * Text Component
 * 
 * Enhanced text component with size, weight, and state variants for consistent typography.
 * 
 * Props:
 * - state: 'active' | 'completed' | 'pending' | 'disabled'
 * - as: 'span' | 'div' | 'p' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'strong' | 'em' | 'small'
 * - size: 'xs' | 'sm' | 'base' | 'lg' | 'xl'
 * - weight: 'normal' | 'medium' | 'semibold' | 'bold'
 * 
 * Usage Examples:
 * 
 * Basic text with states:
 * <Text state="active">Active task</Text>
 * <Text state="completed">Completed task with line-through</Text>
 * <Text state="pending">Pending task in italics</Text>
 * <Text state="disabled">Disabled grayed out text</Text>
 * 
 * Different elements and sizes:
 * <Text as="h2" size="xl" weight="bold">Page Title</Text>
 * <Text as="p" size="sm">Small paragraph text</Text>
 * <Text as="strong" weight="semibold">Important text</Text>
 */

/**
 * Switch Component
 * 
 * Conditional rendering component using Alpine.js x-show for true/false states.
 * 
 * Props:
 * - condition: string (Alpine.js expression to evaluate)
 * 
 * Usage Examples:
 * 
 * Basic conditional rendering:
 * <Switch condition="isLoggedIn">
 *   <div slot="true">Welcome back!</div>
 *   <div slot="false">Please log in</div>
 * </Switch>
 * 
 * Complex conditions:
 * <Switch condition="user.role === 'admin' && user.isActive">
 *   <AdminPanel slot="true" />
 *   <AccessDenied slot="false" />
 * </Switch>
 */

/**
 * Spacer Component
 * 
 * Semantic spacer component for layout balance, especially useful in grid layouts.
 * Uses flex: 1 and min-width: 0 for flexible spacing.
 * 
 * Usage Examples:
 * 
 * Grid layout spacer:
 * <Row justify="grid">
 *   <Button>Left</Button>
 *   <Text>Center</Text>
 *   <Spacer />
 * </Row>
 */

/**
 * Migration Notes
 * 
 * What Was Replaced:
 * - Old Row component: Enhanced with grid centering and styling props
 * - ListItem component: Completely replaced by Row with appropriate props
 * - Navbar scenarios: Now handled by Row with justify="grid"
 * - Space component: Renamed to Spacer for better semantic meaning
 * 
 * Key Benefits:
 * 1. Unified API: One Row component handles all horizontal layout needs
 * 2. Perfect centering: justify="grid" solves navbar centering elegantly
 * 3. Better performance: Atomic Tailwind classes instead of custom CSS
 * 4. Maintainability: All styling visible in component props
 * 5. Flexibility: Easy to customize with additional Tailwind classes
 * 
 * Removed Files:
 * - src/styles/components/row.css
 * - src/styles/components/column.css
 * - src/styles/components/list.css
 * - src/styles/components/list-item.css
 * - src/styles/components/navbar.css
 * - src/components/ui/core/ListItem.astro
 */
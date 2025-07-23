/**
 * Layout Components Index & Documentation
 * 
 * Complete layout system with clear role separation and consistent APIs.
 * Each component has a focused responsibility for optimal composition.
 */

// ═══════════════════════════════════════════════════════════════════════════════════
// CORE LAYOUT COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════════

// Content-Driven Components (Dynamic content + overflow handling)
export { default as List } from './List.astro';
export { default as Grid } from './Grid.astro';  
export { default as Inline } from './Inline.astro';

// Layout-Driven Components (Static positioning + space distribution)
export { default as Row } from './Row.astro';
export { default as Column } from './Column.astro';

// Supporting Layout Components
export { default as GridItem } from './GridItem.astro';
export { default as ListItem } from './ListItem.astro';
export { default as Page } from './Page.astro';
export { default as Section } from './Section.astro';
export { default as Divider } from './Divider.astro';
export { default as Spacer } from './Spacer.astro';
export { default as Conditional } from './Conditional.astro';

// ═══════════════════════════════════════════════════════════════════════════════════
// LAYOUT COMPONENT BEHAVIOR REFERENCE
// ═══════════════════════════════════════════════════════════════════════════════════

/**
 * ## Quick Reference Table
 * 
 * | Component | Type        | Gap | Justify | Align | Overflow Options           |
 * |-----------|-------------|-----|---------|-------|----------------------------|
 * | **List**  | Content     | ✅  | ❌ Fixed| ❌ Fixed| `scroll`, `extend`        |
 * | **Grid**  | Content     | ✅  | ❌ Fixed| ❌ Fixed| `scroll`, `extend`        |
 * | **Inline**| Content     | ✅  | ❌ Fixed| ❌ Fixed| `scroll`, `extend`, `wrap`|
 * | **Row**   | Layout      | ❌  | ✅ Full | ✅ Full | `shrink`, `wrap`          |
 * | **Column**| Layout      | ❌  | ✅ Full | ✅ Full | `shrink`, `extend`        |
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * DETAILED COMPONENT SPECIFICATIONS
 * ═══════════════════════════════════════════════════════════════════════════════════
 */

/**
 * ## Content-Driven Components (Only have `gap` + `overflow`)
 * Handle dynamic/data-driven content with sensible default constraints
 * 
 * ### List
 * - **CSS**: `flex flex-col items-stretch max-h-screen`  
 * - **Purpose**: Vertical lists of dynamic items
 * - **Default Gap**: `xs` (4px)
 * - **Justify**: CSS default (items stack naturally)
 * - **Align**: `stretch` (items take full width)  
 * - **Overflow**: `scroll` (vertical scroll), `extend` (spill out)
 * - **Use Cases**: Navigation lists, item lists, menu items
 * 
 * @example
 * ```astro
 * <List gap="sm" overflow="scroll" class="max-h-64">
 *   <div>Item 1</div>
 *   <div>Item 2</div>
 * </List>
 * ```
 */

/**
 * ### Grid
 * - **CSS**: `grid` + responsive columns
 * - **Purpose**: Responsive grid layouts for dynamic content
 * - **Default Gap**: `md` (16px)
 * - **Justify**: CSS Grid default
 * - **Align**: CSS Grid default
 * - **Overflow**: `scroll` (both directions), `extend` (spill out)
 * - **Columns**: `auto`, `1-12` (responsive breakpoints)
 * - **Use Cases**: Card grids, image galleries, feature lists
 * 
 * @example
 * ```astro
 * <Grid columns="3" gap="lg" overflow="scroll">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 * </Grid>
 * ```
 */

/**
 * ### Inline  
 * - **CSS**: `flex flex-row items-center justify-start max-w-full`
 * - **Purpose**: Horizontal inline content (tags, badges, buttons)
 * - **Default Gap**: `md` (16px)  
 * - **Justify**: `start` (pack to left)
 * - **Align**: `center` (center vertically)
 * - **Overflow**: `scroll` (horizontal), `extend`, `wrap` (new rows)
 * - **Use Cases**: Tag lists, button groups, breadcrumbs
 * 
 * @example
 * ```astro
 * <Inline gap="sm" overflow="wrap">
 *   <Badge>Tag 1</Badge>
 *   <Badge>Tag 2</Badge>
 * </Inline>
 * ```
 */

/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * LAYOUT-DRIVEN COMPONENTS (Have `justify` + `align` + `overflow`)
 * Handle static layout positioning and space distribution
 * ═══════════════════════════════════════════════════════════════════════════════════
 */

/**
 * ### Row
 * - **CSS**: `flex flex-row w-fit` (shrinks to content width)
 * - **Purpose**: Horizontal static layout positioning
 * - **Justify Options**: `start`, `center`, `end`, `between`, `around`, `evenly`
 * - **Align Options**: `start`, `center`, `end`, `stretch`, `baseline`  
 * - **Overflow**: `shrink` (default flex), `wrap` (new rows)
 * - **Use Cases**: Button groups, form controls, static headers
 * 
 * @example
 * ```astro
 * <Row justify="between" align="center" overflow="wrap">
 *   <Button>Left</Button>
 *   <Button>Right</Button>
 * </Row>
 * ```
 */

/**
 * ### Column
 * - **CSS**: `flex flex-col h-full` (takes full container height)
 * - **Purpose**: Vertical static layout positioning  
 * - **Justify Options**: `start`, `center`, `end`, `between`, `around`, `evenly`
 * - **Align Options**: `start`, `center`, `end`, `stretch`, `baseline`
 * - **Overflow**: `shrink` (default flex), `extend` (content extends beyond)
 * - **Use Cases**: Form layouts, card content, static sections
 * 
 * @example
 * ```astro
 * <Column justify="center" align="stretch" overflow="extend">
 *   <Button>Item 1</Button>
 *   <Button>Item 2</Button>
 * </Column>
 * ```
 */


/**
 * ═══════════════════════════════════════════════════════════════════════════════════
 * DESIGN PRINCIPLES & USAGE PATTERNS
 * ═══════════════════════════════════════════════════════════════════════════════════
 */

/**
 * ## Core Design Principles
 * 
 * ### 1. Role Separation
 * - **Content-Driven**: Handle dynamic/data-driven content + scrolling
 * - **Layout-Driven**: Handle static positioning + space distribution
 * - **Specialized**: Handle specific common patterns
 * 
 * ### 2. Default Constraints
 * - **List**: `max-h-screen` prevents infinite height
 * - **Inline**: `max-w-full` prevents horizontal overflow
 * - **Override**: Use Tailwind classes to customize
 * 
 * ### 3. Logical Overflow
 * - **Content Components**: Direction-aware scroll + extend/wrap
 * - **Layout Components**: Flex behavior (shrink/wrap/extend)
 * - **No scroll in layout**: Use content components for scrolling
 * 
 * ### 4. Tailwind Override Strategy
 * ```astro
 * <!-- System provides defaults -->
 * <List class="max-h-64">           <!-- Override default max-h-screen -->
 * <Inline class="justify-between">  <!-- Override default justify-start -->
 * <Row justify="center" class="justify-start">  <!-- Class wins -->
 * ```
 */

/**
 * ## Common Composition Patterns
 * 
 * ### App Layout
 * ```astro
 * <Page>
 *   <Navbar>
 *     <template slot="left"><Logo /></template>
 *     App Name  
 *     <template slot="right"><UserMenu /></template>
 *   </Navbar>
 *   
 *   <Row class="flex-1">
 *     <Column class="w-64">
 *       <List>
 *         <NavItem>Home</NavItem>
 *         <NavItem>Settings</NavItem>
 *       </List>
 *     </Column>
 *     
 *     <Column class="flex-1">
 *       <Grid columns="3">
 *         <Card>Content 1</Card>
 *         <Card>Content 2</Card>
 *       </Grid>
 *     </Column>
 *   </Row>
 * </Page>
 * ```
 * 
 * ### Form Layout  
 * ```astro
 * <Column gap="lg" class="max-w-md">
 *   <Input label="Name" />
 *   <Input label="Email" />
 *   
 *   <Row justify="between">
 *     <Button variant="outline">Cancel</Button>
 *     <Button>Submit</Button>
 *   </Row>
 * </Column>
 * ```
 * 
 * ### Dynamic Content
 * ```astro
 * <List gap="sm" overflow="scroll" class="max-h-96">
 *   {items.map(item => (
 *     <Row justify="between" class="p-2 border-b">
 *       <span>{item.name}</span>
 *       <Inline gap="xs">
 *         <Badge>{item.status}</Badge>
 *         <Button size="sm">Edit</Button>
 *       </Inline>
 *     </Row>
 *   ))}
 * </List>
 * ```
 */

/**
 * ## Mental Model Summary
 * 
 * - **List/Grid/Inline**: "I have dynamic content that might overflow"
 * - **Row/Column**: "I need to position these static elements"  
 * 
 * Choose based on whether your content is:
 * - **Dynamic** (data-driven, might scroll) → Content components
 * - **Static** (fixed elements, positioning) → Layout components  
 * 
 * Note: Navbar has moved to `@/components/ui/display` as it's more of a UI component with padding/elevation.
 */

// ═══════════════════════════════════════════════════════════════════════════════════
// REFACTORING SUMMARY
// ═══════════════════════════════════════════════════════════════════════════════════

/**
 * ## Layout Component Refactoring Summary
 * 
 * | Component     | Changes Made | Padding | Gap | Justify/Align | Overflow | Approach |
 * |---------------|--------------|---------|-----|---------------|----------|----------|
 * | **GridItem**  | Hardcoded padding, removed gap | ✅ `p-4` | ❌ None | ✅ Full | ✅ `shrink`, `extend` | createLayoutComponent |
 * | **ListItem**  | Hardcoded padding, removed gap | ✅ `p-2` | ❌ None | ✅ Full | ✅ `shrink`, `extend` | createLayoutComponent |
 * | **Page**      | Removed gap, removed unused padding prop | ❌ None | ❌ None | ✅ Full | ✅ `shrink`, `extend` | createLayoutComponent |
 * | **Section**   | Hardcoded padding, removed gap | ✅ `p-8` | ❌ None | ✅ Full | ✅ `shrink`, `extend` | createLayoutComponent |
 * | **Spacer**    | Simplified - removed variants | ❌ None | ❌ None | ❌ None | ❌ None | cn() with `flex-1 min-w-0` |
 * | **Divider**   | Converted from CVA to cn() | ❌ None | ❌ None | ❌ None | ❌ None | cn() with conditional classes |
 * | **Conditional** | Converted from CVA to cn() | ❌ None | ❌ None | ❌ None | ❌ None | cn() logic wrapper |
 * 
 * ### Key Design Decisions:
 * 
 * #### Padding Strategy:
 * - **Content containers get padding**: GridItem (`p-4`), ListItem (`p-2`), Section (`p-8`)
 * - **Layout containers get none**: Page (user controls via child containers)
 * - **Utilities get none**: Spacer, Divider, Conditional
 * 
 * #### Gap vs Layout Separation:
 * - **Content components** (List, Grid, Inline): Have gap, no justify/align
 * - **Layout components** (Row, Column, GridItem, ListItem, Page, Section): No gap, full justify/align
 * 
 * #### Simplification:
 * - **Spacer**: Single behavior `flex-1 min-w-0` works in all containers
 * - **Divider**: Pure cn() approach with conditional classes
 * - **Conditional**: Minimal wrapper for Alpine.js logic
 * 
 * #### CVA vs CN:
 * - **Layout components**: Keep createLayoutComponent for consistency with universal variants
 * - **Utility components**: Use pure cn() for simplicity
 */

// ═══════════════════════════════════════════════════════════════════════════════════
// TYPE EXPORTS
// ═══════════════════════════════════════════════════════════════════════════════════

export type {
  ListOverflow,
  GridOverflow,
  InlineOverflow,
  RowOverflow,
  ColumnOverflow,
  UniversalJustify,
  UniversalAlign,
  UniversalSpacing
} from '@/lib/component-variants';
/**
 * Accordion Components
 * Shadcn-style composable accordion with Alpine.js integration
 */

export { default as Accordion } from './Accordion.astro';
export { default as AccordionItem } from './AccordionItem.astro';
export { default as AccordionTrigger } from './AccordionTrigger.astro';
export { default as AccordionContent } from './AccordionContent.astro';

/**
 * Usage Examples:
 * 
 * // Static Accordion
 * <Accordion>
 *   <AccordionItem>
 *     <AccordionTrigger>What is Pines?</AccordionTrigger>
 *     <AccordionContent>
 *       Pines is a UI library built for AlpineJS and TailwindCSS.
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * 
 * // Dynamic Accordion with x-for (like List component)
 * <Accordion 
 *   x-data="{ items: faqData }"
 *   x-for="item in items"
 *   x-key="item.id"
 * >
 *   <AccordionItem>
 *     <AccordionTrigger text="item.question" />
 *     <AccordionContent text="item.answer" />
 *   </AccordionItem>
 * </Accordion>
 * 
 * // With Custom Styling (Shadcn-style)
 * <Accordion className="max-w-2xl">
 *   <AccordionItem className="border-blue-200 shadow-lg">
 *     <AccordionTrigger 
 *       iconType="plus"
 *       className="text-blue-900 hover:bg-blue-50"
 *     >
 *       Question
 *     </AccordionTrigger>
 *     <AccordionContent className="p-6 text-gray-600">
 *       Answer
 *     </AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 * 
 * // With Custom Icon
 * <AccordionTrigger>
 *   Question
 *   <MyCustomIcon slot="icon" />
 * </AccordionTrigger>
 */

/**
 * Component Props:
 * 
 * Accordion:
 * - className?: string - Tailwind classes for container
 * - [key: string]: any - All Alpine.js props pass-through
 * - Supports x-for, x-data, x-init, @events, etc.
 * 
 * AccordionItem:
 * - value?: string - Unique identifier
 * - className?: string - Tailwind classes for item wrapper
 * - [key: string]: any - Alpine.js props pass-through
 * 
 * AccordionTrigger:
 * - iconType?: 'chevron' | 'plus' - Default icon type
 * - className?: string - Tailwind classes for button
 * - text?: string - Alpine.js expression for x-text (e.g., "item.question")
 * - slot="icon" - Custom icon slot
 * - [key: string]: any - Alpine.js props pass-through
 * 
 * AccordionContent:
 * - className?: string - Tailwind classes for content
 * - text?: string - Alpine.js expression for x-text (e.g., "item.answer")
 * - [key: string]: any - Alpine.js props pass-through
 */

/**
 * Features:
 * - Automatic x-for template wrapping (follows List component pattern)
 * - Shadcn-style single className prop per component
 * - Lucide icons (ChevronDown, Plus, Minus) with smooth animations
 * - Custom icon slot support
 * - Alpine.js state management with accordion behavior
 * - Complete Alpine.js props pass-through
 * - CVA + tailwind-merge for intelligent class merging
 * - TypeScript interfaces for all components
 * - Composable architecture for maximum flexibility
 */
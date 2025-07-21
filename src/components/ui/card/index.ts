/**
 * Card Components
 * Universal variant system with image slot support and Alpine.js integration
 */

export { default as Card } from './Card.astro';
export { default as CardHeader } from './CardHeader.astro';
export { default as CardContent } from './CardContent.astro';
export { default as CardFooter } from './CardFooter.astro';

/**
 * Usage Examples:
 * 
 * // Basic Card
 * <Card variant="default">
 *   <CardHeader>
 *     <h3 class="text-2xl font-semibold">Product Title</h3>
 *     <p class="text-sm text-muted-foreground">Product description</p>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Main content goes here...</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Add to Cart</Button>
 *   </CardFooter>
 * </Card>
 * 
 * // Card with Image on Top (Pine UI Style)  
 * import Image from '@/components/ui/Image.astro';
 * 
 * <Card variant="shadow" imagePosition="top">
 *   <Image slot="image" src="product.jpg" aspectRatio="16/9" alt="Product image" />
 *   <CardHeader>
 *     <h3 class="text-xl font-semibold">Product Name</h3>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Product description here</p>
 *   </CardContent>
 *   <CardFooter>
 *     <Button>Buy Now</Button>
 *   </CardFooter>
 * </Card>
 * 
 * // Card with Image on Left
 * <Card variant="outline" imagePosition="left">
 *   <Image slot="image" src="avatar.jpg" aspectRatio="1/1" className="w-32" />
 *   <CardHeader>
 *     <h3 class="text-lg font-semibold">Profile</h3>
 *   </CardHeader>
 *   <CardContent>
 *     <p>Profile information</p>
 *   </CardContent>
 * </Card>
 * 
 * // Profile Card with Overlapping Avatar (Pine UI Style)
 * <Card variant="shadow" imagePosition="top">
 *   <Image 
 *     slot="image"
 *     src="background.jpg" 
 *     aspectRatio="16/9" 
 *     overlay="bg-gradient-to-t from-black/20"
 *   />
 *   <CardContent className="text-center">
 *     <!-- Overlapping avatar with negative margin -->
 *     <div class="flex justify-center -mt-10 mb-4">
 *       <div class="w-20 h-20 p-1 bg-white rounded-full">
 *         <img src="avatar.jpg" class="w-full h-full rounded-full" />
 *       </div>
 *     </div>
 *     <h3 class="text-lg font-semibold">Adam Wathan</h3>
 *     <p class="text-sm text-muted-foreground">@adamwathan</p>
 *   </CardContent>
 * </Card>
 */

/**
 * Component Props:
 * 
 * Card:
 * - variant?: 'default' | 'outline' | 'shadow' | 'elevated' | 'ghost' | 'muted'
 * - imagePosition?: 'none' | 'top' | 'left' | 'right' | 'bottom' - Image layout
 * - className?: string - Additional Tailwind classes (use for height: h-64, h-80, etc.)
 * - [key: string]: any - Alpine.js props pass-through
 * 
 * CardHeader:
 * - className?: string - Additional Tailwind classes
 * - [key: string]: any - Alpine.js props pass-through
 * 
 * CardContent:
 * - className?: string - Additional Tailwind classes  
 * - [key: string]: any - Alpine.js props pass-through
 * 
 * CardFooter:
 * - className?: string - Additional Tailwind classes
 * - [key: string]: any - Alpine.js props pass-through
 */

/**
 * Universal Variants:
 * - default: Basic card with border
 * - outline: Enhanced border (2px)
 * - shadow: Card with medium shadow
 * - elevated: Card with large shadow
 * - ghost: Transparent card
 * - muted: Card with muted background
 * 
 * Layout System:
 * - Card: Flex container with configurable direction based on imagePosition
 * - Image slot: For Image component or any image content using slot="image"
 * - Content wrapper: Auto flex-col wrapper for header/content/footer
 * - CardHeader: p-6 with flex flex-col gap-y-1.5 (supports overlapping)
 * - CardContent: p-6 flex-1 (expands to fill space, supports overlapping)
 * - CardFooter: p-6 pt-0 with flex items-center (supports overlapping)
 * 
 * Image Position Options (with universal overlapping):
 * - none: Standard vertical card layout (no overlapping)
 * - top: Image above, first element in header/content/footer overlaps upward
 * - left: Image on left, first element in header/content/footer overlaps leftward  
 * - right: Image on right, first element in header/content/footer overlaps rightward
 * - bottom: Image below, first element in header/content/footer overlaps downward
 * 
 * Height Control (via className):
 * Use standard Tailwind height classes for precise control:
 * - className="h-64" (256px height)
 * - className="h-80" (320px height)  
 * - className="h-96" (384px height)
 * - className="h-full" (full height)
 * - className="min-h-0" (minimum height)
 * 
 * Features:
 * - Universal variant system (reusable across components)
 * - Flexible image layouts with slot system (Pine UI compatible)
 * - Image as standalone component (import from @/components/ui/Image.astro)
 * - Automatic overlapping support for all image positions (Pine UI style)
 * - Smart directional overlapping (top: -mt-16, left: -ml-16, right: -mr-16, bottom: -mb-16)
 * - Clean architecture with slot-based composition
 * - Height control via Tailwind className (more flexible than props)
 * - Full Alpine.js pass-through support
 * - Theme system integration with CSS custom properties
 * - CVA + tailwind-merge for intelligent class handling
 */
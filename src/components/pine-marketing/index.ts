/**
 * Pine Marketing Components
 * 
 * A collection of marketing-focused Astro components converted from Pine UI templates.
 * These components are optimized for the AHA stack (Astro + HTMX + Alpine.js).
 * 
 * Components:
 * - HeroSideBySide: Hero section with side-by-side text and image layout
 * - HeroCentered: Centered hero section with optional image below
 * - HeaderWithNav: Complete header with navigation and hero content
 * - HeaderDark: Dark-themed header with gradient background and newsletter signup
 * - FeatureGrid: Responsive grid of feature cards with icons
 * - FeatureSideBySide: Side-by-side feature layout with bullet points and image
 * - TestimonialSideBySide: Side-by-side testimonial layout with promotional content
 * - TestimonialGrid: Horizontal 3-column testimonial grid layout
 * - PricingCards: Comprehensive pricing section with detailed feature lists
 * - PricingSimple: Clean minimal pricing section with basic plan information
 * - FAQCards: Simple FAQ section with individual card layouts
 * - FAQColumns: Two-column FAQ layout for comprehensive question displays
 * - LoginForm: Marketing-focused login form with promotional content
 * - SignupForm: Comprehensive signup form with validation and social login options
 * - FooterWithSocial: Comprehensive footer with navigation links and social media icons
 * - FooterSimple: Minimal horizontal footer with logo, copyright, and social links
 * - BlogHero: Featured blog post hero section with large image and content
 * - BlogGrid: Responsive grid layout for blog posts with category badges
 * - BlogOverlayCards: Visually striking blog cards with background overlays
 * - ContentHero: Large typography hero section with positioned side image
 * - ContentFeatures: Alternating side-by-side feature sections with benefits
 * - TeamGrid: Flexible team member grid with circular or card layouts
 * - IntegrationLogos: App integration logos grid with optional extended view
 * - LogoGrid: Company/partner logo grid with SVG or image support
 * - TitleSections: Hero title sections with gradient highlights and multiple variants
 * - Navigation: Interactive navigation header with Alpine.js hover effects
 */

// Hero Components
export { default as HeroSideBySide } from './HeroSideBySide.astro';
export { default as HeroCentered } from './HeroCentered.astro';

// Header Components
export { default as HeaderWithNav } from './HeaderWithNav.astro';
export { default as HeaderDark } from './HeaderDark.astro';

// Feature Components
export { default as FeatureGrid } from './FeatureGrid.astro';
export { default as FeatureSideBySide } from './FeatureSideBySide.astro';

// Testimonial Components
export { default as TestimonialSideBySide } from './TestimonialSideBySide.astro';
export { default as TestimonialGrid } from './TestimonialGrid.astro';

// Pricing Components
export { default as PricingCards } from './PricingCards.astro';
export { default as PricingSimple } from './PricingSimple.astro';

// FAQ Components
export { default as FAQCards } from './FAQCards.astro';
export { default as FAQColumns } from './FAQColumns.astro';

// Form Components
export { default as LoginForm } from './LoginForm.astro';
export { default as SignupForm } from './SignupForm.astro';

// Footer Components
export { default as FooterWithSocial } from './FooterWithSocial.astro';
export { default as FooterSimple } from './FooterSimple.astro';

// Blog Components
export { default as BlogHero } from './BlogHero.astro';
export { default as BlogGrid } from './BlogGrid.astro';
export { default as BlogOverlayCards } from './BlogOverlayCards.astro';

// Content Components
export { default as ContentHero } from './ContentHero.astro';
export { default as ContentFeatures } from './ContentFeatures.astro';

// Team Components
export { default as TeamGrid } from './TeamGrid.astro';

// Integration Components
export { default as IntegrationLogos } from './IntegrationLogos.astro';

// Logo Components
export { default as LogoGrid } from './LogoGrid.astro';

// Title/Hero Components
export { default as TitleSections } from './TitleSections.astro';

// Navigation Components
export { default as Navigation } from './Navigation.astro';

// Type definitions for better TypeScript support
export type { Props as HeroSideBySideProps } from './HeroSideBySide.astro';
export type { Props as HeroCenteredProps } from './HeroCentered.astro';
export type { Props as HeaderWithNavProps, NavItem } from './HeaderWithNav.astro';
export type { Props as HeaderDarkProps, NavItem as DarkNavItem } from './HeaderDark.astro';
export type { Props as FeatureGridProps, Feature } from './FeatureGrid.astro';
export type { Props as FeatureSideBySideProps, Benefit } from './FeatureSideBySide.astro';
export type { Props as TestimonialSideBySideProps, Testimonial } from './TestimonialSideBySide.astro';
export type { Props as TestimonialGridProps, Testimonial as GridTestimonial } from './TestimonialGrid.astro';
export type { Props as PricingCardsProps, PricingPlan } from './PricingCards.astro';
export type { Props as PricingSimpleProps, SimplePricingPlan } from './PricingSimple.astro';
export type { Props as FAQCardsProps, FAQItem } from './FAQCards.astro';
export type { Props as FAQColumnsProps, FAQColumnItem } from './FAQColumns.astro';
export type { Props as LoginFormProps } from './LoginForm.astro';
export type { Props as SignupFormProps } from './SignupForm.astro';
export type { Props as FooterWithSocialProps, NavItem, SocialLink } from './FooterWithSocial.astro';
export type { Props as FooterSimpleProps, SocialLink as SimpleSocialLink } from './FooterSimple.astro';

// Blog Component Types
export type { Props as BlogHeroProps } from './BlogHero.astro';
export type { Props as BlogGridProps, BlogPost } from './BlogGrid.astro';
export type { Props as BlogOverlayCardsProps, OverlayCard, SmallCard } from './BlogOverlayCards.astro';

// Content Component Types
export type { Props as ContentHeroProps } from './ContentHero.astro';
export type { Props as ContentFeaturesProps, Feature, Benefit } from './ContentFeatures.astro';

// Team Component Types
export type { Props as TeamGridProps, TeamMember, SocialLink } from './TeamGrid.astro';

// Integration Component Types
export type { Props as IntegrationLogosProps, Integration } from './IntegrationLogos.astro';

// Logo Component Types
export type { Props as LogoGridProps, Logo } from './LogoGrid.astro';

// Title/Hero Component Types
export type { Props as TitleSectionsProps } from './TitleSections.astro';

// Navigation Component Types
export type { Props as NavigationProps, NavItem, CTAButton } from './Navigation.astro';
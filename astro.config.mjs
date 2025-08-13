// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import mdx from '@astrojs/mdx';

// Dynamic configuration for GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';

// https://astro.build/config
export default defineConfig({
    // Dynamic site configuration - using custom domain
    site: isGitHubPages
        ? 'https://basis.zhengyishen.com'
        : 'http://localhost:4321',
    base: undefined, // No base path needed for custom domain

    // Static output for GitHub Pages - API routes will be ignored in build
    output: 'static', //  'server' | 'static'

    // Enable client-side hydration for Alpine.js and Tailwind CSS
    integrations: [
        mdx(),
        tailwind(),
        icon({
            include: {
                lucide: ['*'], // Include all lucide icons (they're still tree-shaken)
            },
        }),
    ],
});

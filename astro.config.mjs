// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages configuration
  site: 'https://aha-stack-starter.github.io',
  // base: '/aha_stack_starter', // Commented out for local development
  
  // Static output for GitHub Pages - API routes will be ignored in build
  output: 'static',  //  'server' for local development
  
  // Enable client-side hydration for Alpine.js
  integrations: [],
  vite: {
    plugins: [tailwind()],
    // Ensure HTMX and Alpine.js are available globally
    define: {
      global: 'globalThis',
    }
  }
});

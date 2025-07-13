// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // GitHub Pages configuration
  site: 'https://shenzhengyi.github.io',
  base: '/aha_starter',
  
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

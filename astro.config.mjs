// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
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

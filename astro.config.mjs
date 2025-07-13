// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Enable client-side hydration for Alpine.js
  integrations: [],
  vite: {
    // Ensure HTMX and Alpine.js are available globally
    define: {
      global: 'globalThis',
    }
  }
});

// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@tailwindcss/vite';

// Dynamic configuration for GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === 'true';
const githubRepo = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'aha-stack-starter';
const githubUser = process.env.GITHUB_REPOSITORY?.split('/')[0] || 'zhengyishen0';

// https://astro.build/config
export default defineConfig({
  // Dynamic site configuration
  site: isGitHubPages 
    ? `https://${githubUser}.github.io/${githubRepo}`
    : 'http://localhost:4321',
  base: isGitHubPages ? `/${githubRepo}` : undefined,
  
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

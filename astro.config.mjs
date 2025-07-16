// @ts-check
import { defineConfig } from "astro/config";
import tailwind from "@tailwindcss/vite";

// Dynamic configuration for GitHub Pages
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";
const githubRepo =
  process.env.GITHUB_REPOSITORY?.split("/")[1] || "your-repo-name";
const githubUser =
  process.env.GITHUB_REPOSITORY?.split("/")[0] || "your-username";

// https://astro.build/config
export default defineConfig({
  // Dynamic site configuration
  site: isGitHubPages
    ? `https://${githubUser}.github.io/${githubRepo}`
    : "http://localhost:4321",
  base: isGitHubPages ? `/${githubRepo}` : undefined,

  // Static output for GitHub Pages - API routes will be ignored in build
  output: "static", //  'server' | 'static'

  // Enable client-side hydration for Alpine.js
  integrations: [],
  vite: {
    plugins: [tailwind()],
  },
});

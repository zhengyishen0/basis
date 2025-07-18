---
title: "Basis - Build on Fundamentals"
description: "A methodology for modern web development using basic tools and clear boundaries"
features:
  - name: "Design"
    title: "Real-time Color System"
    description: "Token hierarchy from primitives to themes. Change colors in one place, see updates everywhere."
  - name: "Components"
    title: "Semantic HTML Blocks"
    description: "65+ pre-built components using HTML + CSS + minimal Alpine.js. No framework lock-in."
  - name: "Data"
    title: "Pre-built CRUD & Auth"
    description: "Alpine stores with Supabase integration. Backend logic without backend complexity."
  - name: "Content"
    title: "Markdown-Driven Pages"
    description: "Write content in Markdown with frontmatter. Components handle the presentation."
  - name: "Pages"
    title: "Composable Page Building"
    description: "Stack components like LEGO blocks. Each page is just HTML composition with zero JavaScript overhead."
  - name: "Deploy"
    title: "Zero Configuration"
    description: "Push to GitHub, deploy automatically. No build configs, no CI/CD setup, it just works."
quickstart:
  - file: "content/"
    icon: "✏️"
    description: "All your content, copy, and blogs"
  - file: "lib/todoStore.js"
    icon: "💾" 
    description: "Rename & add your custom logic"
  - file: "styles/.../colors.css"
    icon: "🎨"
    description: "Brand colors & page styles"
  - file: "pages/"
    icon: "📄"
    description: "Build your actual website here"
---

# Basis: A Foundation for Modern Web Development

Build web applications using fundamental tools with clear architectural boundaries. No framework magic, no hidden complexity - just clean separation of concerns.

## The Philosophy

Every part of your application has a single responsibility and clear boundaries:

- **Design** → CSS custom properties with semantic tokens
- **Components** → Self-contained HTML + CSS + Alpine.js
- **Pages** → Simple composition of components
- **Data** → Alpine stores with Supabase
- **Backend** → Supabase handles everything
- **Content** → Markdown with structured frontmatter

## Why Basis?

Unlike traditional frameworks that add layers of abstraction, Basis uses the web platform's fundamental tools. Each layer can change independently without affecting others. You get the power of modern development with the simplicity of basic tools.

## What's Included

- **65+ Production Components** - UI elements and marketing sections ready to use
- **Complete Design System** - Primitive and semantic tokens, no Tailwind needed
- **Full-Stack Features** - Authentication, real-time data, and CRUD operations
- **Zero Configuration** - Works out of the box with GitHub Pages deployment

## Get Started in 60 Seconds

1. Clone the repository
2. Run `npm install && npm run dev`
3. Edit the 4 essential files shown above
4. Deploy with `git push`

That's it. No complex setup, no configuration hell, just start building.
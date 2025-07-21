My tech stack is:

- Astro: for the fullstack and using dynamic island architecture to hydrate only interactive components
- Supabase: for backend-as-a-service with real-time database and authentication
- Alpine.js: for frontend reactivity using ES6 modules and Alpine.store() pattern
- Custom UI: complete component library for Alpine.js with variants, colors, and sizes
- Markdown Content: Use Astro Content Collections with frontmatter to store landing page content in MD files - put structured data (hero, features, testimonials) in frontmatter and long-form content in markdown body, then render with getEntry() and <Content /> components.
- Github Actions: Host static pages on Github Pages

# Component Development Reminder

**ALWAYS READ**: Component development guide at `/src/components/ui/COMPONENT_GUIDE.md`

**Component Locations**:

- UI Components Index: `/src/components/ui/`

**Universal Theme System**:

- All components use CVA + shadcn variants (default, secondary, destructive, outline)
- Theme colors defined in `tailwind.config.js`
- Use `cn()` utility from `@/lib/utils` for class merging
- Enable Alpine.js pass-through with `{...alpineProps}`

# Testing Reminder

Always test code myself before claiming it works. Use techniques like:

- x-init="init()" to test Alpine.js initialization automatically
- console.log() to debug variable values
- Create test pages to verify component functionality
- Check browser console for errors
- Test Alpine.store() state changes

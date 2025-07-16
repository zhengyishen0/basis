My tech stack is:
- Astro: for the fullstack and using dynamic island architecture to hydrate only interactive components
- Supabase: for backend-as-a-service with real-time database and authentication
- Alpine.js: for frontend reactivity using ES6 modules and Alpine.store() pattern
- Pine UI: complete component library for Alpine.js with variants, colors, and sizes
- Tailwind CSS: utility-first CSS framework for rapid UI development
- Markdown Content: Use Astro Content Collections with frontmatter to store landing page content in MD files - put structured data (hero, features, testimonials) in frontmatter and long-form content in markdown body, then render with getEntry() and <Content /> components.
- Github Actions: Host static pages on Github Pages

# Testing Reminder
Always test code myself before claiming it works. Use techniques like:
- x-init="init()" to test Alpine.js initialization automatically
- console.log() to debug variable values
- Create test pages to verify component functionality
- Check browser console for errors
- Test Alpine.store() state changes
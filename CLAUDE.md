My tech stack is:
- Astro: for the fullstack and using dynamic island to glue all the components together
- HTMX: for AJAX and backend communication
- Alpine: for frontend reactibility
- Pine: UI library for Alpine
- Tailwind CSS: Use Tailwind CSS for reusable UI elements like <Button size="lg" variant="primary">
- Markdown Content: Use Astro Content Collections with frontmatter to store landing page content in MD files - put structured data (hero, features, testimonials) in frontmatter and long-form content in markdown body, then render with getEntry() and <Content /> components.
- Github Actions: Host static pages on Github Pages

# Testing Reminder
Always test code myself before claiming it works. Use techniques like:
- hx-trigger="load" to test HTMX requests automatically
- console.log() to debug variable values
- Create test pages/endpoints to verify functionality
- Check server logs for errors
My tech stack is:
- Astro: for the fullstack and using dynamic island to glue all the components together
- HTMX: for AJAX and backend communication
- Alpine: for frontend reactibility
- Pine: UI library for Alpine
- Tailwind CSS: Use Tailwind CSS for reusable UI elements like <Button size="lg" variant="primary">
- Markdown Content: Use Astro Content Collections with frontmatter to store landing page content in MD files - put structured data (hero, features, testimonials) in frontmatter and long-form content in markdown body, then render with getEntry() and <Content /> components.
- Github Actions: Host static pages on Github Pages

To-DOs:
- [ ] convert anthropic website using Pine components while keeping all the visual design as it is
- [x] display all the marketing template on the website
- [ ] replace the marketing template using the componets in the Pine. start with a copy of existing pine-marketing components and update the copy
- [x] add proper guidance on how to use alpine with plugins, and htmx in the readme file
My tech stack is:
- Astro: for the fullstack and using dynamic island to glue all the components together
- HTMX: for AJAX and backend communication
- Alpine: for frontend reactibility
- Pine: UI library for Alpine
- Tailwind CSS: Use Tailwind CSS with global utilities in CSS files (@apply for base styles like .btn-base) and Astro components for reusable UI elements like <Button size="lg" variant="primary">
- Markdown Content: Use Astro Content Collections with frontmatter to store landing page content in MD files - put structured data (hero, features, testimonials) in frontmatter and long-form content in markdown body, then render with getEntry() and <Content /> components.
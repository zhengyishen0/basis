# Basis

🚀 A foundation for modern web development built on fundamental tools and clear architectural boundaries. Powered by **Astro**, **Alpine.js**, and **Supabase** with 65+ pre-built components.

## 🌟 Live Demo

**[View Live Demo →](https://zhengyishen0.github.io/basis)**

![Basis Screenshot](./public/screen-shot.png)

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/zhengyishen0/basis.git
cd basis

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

## 💡 Philosophy: Simplicity Through Separation

This starter embodies a fundamental approach to web development - using basic, foundational tools instead of multi-layered abstraction frameworks. Each part of your application has a clear boundary and single responsibility:

- **Design** → Real-time color system with clear token hierarchy (primitive → semantic → component → theme)
- **Components** → Semantic HTML + CSS classes + Alpine.js with minimal JavaScript
- **Pages** → Simple composition of component blocks
- **Data** → Alpine stores with pre-built CRUD operations via Supabase
- **Backend** → Supabase for database, auth, and serverless functions
- **Content** → Markdown with frontmatter for structured content

**The beauty**: Each layer can change independently without affecting the others. No framework lock-in, no magic, just clear boundaries and web standards.

## ✨ What's Included

- **🎨 65+ Components** - UI components, marketing sections, and special components like MonacoEditor
- **🎯 Design System** - CSS custom properties, semantic tokens, light/dark themes
- **⚡ Zero Config** - Works out of the box with GitHub Pages deployment
- **📱 Fully Responsive** - Mobile-first design that works everywhere
- **🔄 Real-time Ready** - Supabase integration for backend features
- **🚀 Lightning Fast** - Static site generation with dynamic islands

## 🛠️ Tech Stack

| Technology    | Purpose                                         | Documentation                                   |
| ------------- | ----------------------------------------------- | ----------------------------------------------- |
| **Astro**     | Static site generator with islands architecture | [Astro Docs](https://astro.build)               |
| **Alpine.js** | Lightweight reactive framework                  | [Alpine Guide](/docs/alpine-guide)              |
| **Supabase**  | Backend as a Service                            | [Integration Guide](/docs/supabase-integration) |

## 📁 Project Structure

```text
/
├── src/
│   ├── components/
│   │   ├── ui/          # 40+ UI components
│   │   └── marketing/   # 25+ marketing sections
│   ├── content/
│   │   ├── docs/        # Documentation
│   │   └── pages/       # Markdown content
│   ├── layouts/         # Astro layouts
│   ├── lib/             # Alpine stores & Supabase client
│   ├── pages/           # Routes & pages
│   └── styles/
│       └── design-system/  # CSS custom properties
├── public/              # Static assets
└── package.json
```

## 🎯 Quick Customization Guide

Thanks to our separation of concerns, you only need to modify a few files to customize Basis:

### Essential Files to Update:

```text
src/
├── content/              # ✏️ All your content (copy, blogs, docs)
├── lib/
│   └── todoStore.js     # 💾 Rename & add your custom logic
├── styles/
│   └── design-system/
│       └── primitives/
│           └── colors.css # 🎨 Brand colors & design tokens
└── pages/               # 📄 Build your actual pages here

.env                     # 🔑 Your Supabase credentials
```

### What to Change:

1. **Content** → Edit files in `/src/content/` for all your copy and blog posts
2. **Business Logic** → Rename `todoStore.js` and add your custom stores/logic
3. **Design** → Update colors in `primitives/colors.css` and page-specific CSS
4. **Pages** → Build your site by creating/editing files in `/src/pages/`
5. **Credentials** → Add Supabase URL and key to `.env` file

That's it! No need to touch components, layouts, or most other files unless you want to.

## 🚀 Commands

| Command           | Action                               |
| ----------------- | ------------------------------------ |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build for production                 |
| `npm run preview` | Preview production build             |

## 📚 Documentation

- **[Alpine.js Guide](/docs/alpine-guide)** - Learn Alpine.js integration, plugins, and state management
- **[Components Guide](/docs/components-guide)** - How to use UI and marketing components
- **[Supabase CLI Setup](/docs/supabase-setup)** - Database migrations and CLI configuration
- **[Supabase Integration](/docs/supabase-integration)** - Authentication and real-time features
- **[Design System](/docs/design-system)** - Customize themes and design tokens

## 🌐 Deployment

### GitHub Pages (Automatic)

1. Push your code to GitHub
2. Go to Settings → Pages → Source: **GitHub Actions**
3. Your site deploys automatically on every push to `main`

The project auto-detects your GitHub username and repository name - no configuration needed!

## 🎯 Key Features

### Component Highlights

- **MonacoEditor** - VS Code editor with 15+ languages
- **Design System Page** - Interactive component showcase at `/design-system`
- **Supabase Todo App** - Full-stack example at `/supabase-todo`
- **Marketing Components** - Heroes, pricing, testimonials, and more
- **Form Components** - Inputs, selects, date pickers with validation

### Developer Experience

- ES6 module imports (no CDN dependencies)
- Alpine.store for state management
- CSS custom properties for theming
- Semantic HTML with ARIA attributes
- TypeScript support included

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Astro + Alpine.js + Supabase

# Astro Alpine Starter

🚀 Modern full-stack starter template powered by **Astro** and **Alpine.js** with Supabase integration, featuring a complete design system and 65+ pre-built components.

## 🌟 Live Demo

**[View Live Demo →](https://zhengyishen0.github.io/aha-stack-starter)**

![Astro Alpine Starter Screenshot](./public/screen-shot.png)

## ⚡ Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/astro-alpine-starter.git
cd astro-alpine-starter

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

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
| **Custom UI** | CSS Design System                               | [Components Guide](/docs/components-guide)      |

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
- Alpine.store() for state management
- CSS custom properties for theming
- Semantic HTML with ARIA attributes
- TypeScript support included

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using Astro + Alpine.js

# AHA Stack Starter Kit

🚀 A modern web development starter template combining **Astro**, **HTMX**, and **Alpine.js** for fast, interactive web applications.

## 🌟 Live Demo

**Demo:** `https://zhengyishen0.github.io/aha-stack-starter`

> Replace with your actual GitHub Pages URL after deployment

## ✨ What's Included

- ✅ **40+ Pine UI Components** - Complete component library
- ✅ **GitHub Actions CI/CD** - Automatic deployment to GitHub Pages
- ✅ **Comprehensive Test Suite** - Individual test pages for all components
- ✅ **Dynamic Configuration** - Works with any GitHub username/repo
- ✅ **Mobile Responsive** - All components work on mobile devices
- ✅ **Zero Config Deployment** - Just push to deploy

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
/
├── public/
│   └── favicon.svg
├── src
│   ├── assets
│   │   └── astro.svg
│   ├── components
│   │   └── Welcome.astro
│   ├── layouts
│   │   └── Layout.astro
│   └── pages
│       └── index.astro
└── package.json
```

To learn more about the folder structure of an Astro project, refer to [our guide on project structure](https://docs.astro.build/en/basics/project-structure/).

## 🎨 Pine UI Components

This project includes a comprehensive collection of UI components from Pine UI, converted and optimized for the AHA stack (Astro + HTMX + Alpine.js):

### Pine Marketing Components:
- **HeroSideBySide**: Side-by-side hero layout with text and image
- **HeroCentered**: Centered hero section with optional image below  
- **HeaderWithNav**: Complete header with navigation and hero content
- **HeaderDark**: Dark-themed header with gradient background and newsletter signup

### Pine Interactive Components:
- **MonacoEditor**: Full-featured code editor with syntax highlighting, IntelliSense, and 15+ language support
- **Button**: Customizable buttons with multiple variants and colors
- **Modal**: Responsive modal dialogs with Alpine.js integration
- **Dropdown**: Interactive dropdown menus with keyboard navigation
- **Tabs**: Tabbed interface components
- **Accordion**: Collapsible content sections
- **And 35+ more components** - see `/src/components/pine/` for the complete collection

### Usage Examples:

#### Pine Marketing Components:
```astro
---
import { HeroSideBySide, HeaderWithNav } from '@/components/pine-marketing';
---

<HeaderWithNav
  logo="Your Brand"
  navItems={[
    { text: "Home", href: "/", active: true },
    { text: "Features", href: "/features" }
  ]}
  heroTitle="Start Crafting Your Next Great Idea"
  heroDescription="Simplifying the creation of landing pages..."
  primaryButtonText="Get Started"
  primaryButtonHref="#start"
/>
```

#### MonacoEditor Component:
```astro
---
import { MonacoEditor } from '@/components/pine';
---

<!-- Basic JavaScript Editor -->
<MonacoEditor 
  id="code-editor"
  language="javascript"
  theme="vs-dark"
  height="400px"
  value="console.log('Hello World');"
/>

<!-- Python Editor with Custom Configuration -->
<MonacoEditor 
  language="python"
  theme="vs-light"
  height="300px"
  fontSize={16}
  minimap={false}
  wordWrap="on"
  readOnly={false}
  placeholder="# Enter your Python code here..."
/>

<!-- Form Integration -->
<form>
  <MonacoEditor 
    name="userCode"
    language="typescript"
    height="500px"
    @monaco-change="handleCodeChange($event)"
  />
</form>
```

#### Key MonacoEditor Features:
- **15+ Programming Languages**: JavaScript, TypeScript, Python, Rust, Go, Java, C#, HTML, CSS, JSON, YAML, SQL, and more
- **3 Built-in Themes**: Dark (`vs-dark`), Light (`vs-light`), High Contrast (`hc-black`)
- **IntelliSense & Code Completion**: Full VS Code-like editing experience
- **Syntax Highlighting & Error Detection**: Real-time validation and error highlighting
- **Customizable Options**: Font size, line numbers, minimap, word wrap, read-only mode
- **Alpine.js Integration**: Reactive data binding and event handling
- **Form Compatible**: Works seamlessly with form submissions
- **CDN Loading**: No build dependencies, loads Monaco from CDN
- **Auto-resize**: Responsive layout support

Test the MonacoEditor component at: `/test/monacoeditor`

For detailed documentation and examples, see `/src/components/pine-marketing/README.md`.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 🚀 GitHub Pages Deployment

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Instructions:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "Add GitHub Pages deployment"
   git push origin main
   ```

2. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Navigate to **Settings** → **Pages**
   - Under "Source", select **GitHub Actions**

3. **Automatic Deployment**:
   - The workflow will automatically trigger on pushes to the `main` branch
   - Your site will be available at: `https://your-username.github.io/your-repo-name`

### Manual Deployment:
### Configuration Notes:
- The project automatically detects your GitHub username and repository name
- No manual configuration needed for deployment
- Works with any repository name or GitHub account
- The configuration is in `.github/workflows/deploy.yml`

## 🔧 Working with Alpine.js and HTMX

### Alpine.js Setup & Plugin Usage

Alpine.js is included via CDN with all major plugins pre-loaded. The plugins are loaded in the correct order in `src/layouts/Layout.astro`:

```javascript
// Alpine.js Plugins (loaded before core)
@alpinejs/mask         // Input masking and formatting
@alpinejs/intersect    // Intersection observer functionality  
@alpinejs/persist      // Data persistence across page loads
@alpinejs/focus        // Focus management utilities
@alpinejs/collapse     // Smooth collapse/expand animations
@alpinejs/anchor       // Anchor positioning
@alpinejs/morph        // DOM morphing for smooth updates
@alpinejs/sort         // Sortable lists and drag-and-drop
@alpinejs/resize       // Element resize detection

// Alpine.js Core (loaded last)
alpinejs@3.14.9
```

#### Basic Alpine.js Usage

```astro
<!-- Simple counter component -->
<div x-data="{ count: 0 }" class="p-4">
  <button x-on:click="count--">-</button>
  <span x-text="count"></span>
  <button x-on:click="count++">+</button>
</div>

<!-- Form with validation -->
<div x-data="{ email: '', valid: false }" class="space-y-4">
  <input 
    x-model="email"
    x-on:input="valid = email.includes('@')"
    type="email" 
    placeholder="Enter email"
    class="w-full px-3 py-2 border rounded"
  />
  <button 
    x-show="valid"
    class="px-4 py-2 bg-blue-500 text-white rounded"
  >
    Submit
  </button>
</div>
```

#### Using Alpine.js Plugins

```astro
<!-- @alpinejs/mask - Input formatting -->
<input x-mask="(999) 999-9999" placeholder="Phone number" />
<input x-mask="99/99/9999" placeholder="MM/DD/YYYY" />

<!-- @alpinejs/persist - Data persistence -->
<div x-data="{ theme: $persist('light') }">
  <button x-on:click="theme = theme === 'light' ? 'dark' : 'light'">
    Toggle Theme: <span x-text="theme"></span>
  </button>
</div>

<!-- @alpinejs/intersect - Scroll animations -->
<div x-intersect="$el.classList.add('animate-fadeIn')">
  Content that animates in when scrolled into view
</div>

<!-- @alpinejs/collapse - Smooth animations -->
<div x-data="{ open: false }">
  <button x-on:click="open = !open">Toggle</button>
  <div x-show="open" x-collapse>
    <p>This content will smoothly collapse/expand</p>
  </div>
</div>

<!-- @alpinejs/focus - Focus management -->
<div x-data="{ open: false }" x-on:keydown.escape="open = false">
  <button x-on:click="open = true">Open Dialog</button>
  <div x-show="open" x-trap="open">
    <input x-ref="firstInput" />
    <button x-on:click="open = false">Close</button>
  </div>
</div>
```

### HTMX Integration

HTMX is loaded via CDN (version 2.0.6) and provides seamless AJAX functionality:

#### Basic HTMX Usage

```astro
<!-- Simple form submission -->
<form hx-post="/api/submit" hx-target="#result">
  <input name="data" type="text" />
  <button type="submit">Submit</button>
</form>
<div id="result"><!-- Response will appear here --></div>

<!-- Load content on page load -->
<div hx-get="/api/data" hx-trigger="load" hx-target="this">
  Loading...
</div>

<!-- Auto-refresh content -->
<div hx-get="/api/status" hx-trigger="every 30s">
  Status will update every 30 seconds
</div>
```

#### Advanced HTMX Patterns

```astro
<!-- Infinite scroll -->
<div hx-get="/api/more" 
     hx-trigger="revealed" 
     hx-target="this" 
     hx-swap="outerHTML">
  <div>Last item...</div>
</div>

<!-- Search with debouncing -->
<input type="search" 
       name="q"
       hx-get="/api/search" 
       hx-trigger="input changed delay:300ms" 
       hx-target="#search-results" />

<!-- Modal loading -->
<button hx-get="/api/modal-content" 
        hx-target="#modal-body" 
        hx-trigger="click">
  Open Modal
</button>
```

### Combining Alpine.js + HTMX

The real power comes from combining both libraries:

```astro
<!-- HTMX loads data, Alpine.js manages UI state -->
<div x-data="{ loading: false, items: [] }">
  <button 
    x-on:click="loading = true"
    hx-get="/api/items"
    hx-target="#items"
    hx-on:htmx:after-request="loading = false">
    <span x-show="!loading">Load Items</span>
    <span x-show="loading">Loading...</span>
  </button>
  
  <div id="items" x-show="!loading">
    <!-- HTMX will populate this -->
  </div>
</div>

<!-- Form with Alpine.js validation + HTMX submission -->
<div x-data="{ 
  form: { email: '', password: '' },
  errors: {},
  submitted: false 
}">
  <form hx-post="/api/login" 
        hx-target="#response"
        hx-on:htmx:response-error="errors = JSON.parse($event.detail.xhr.response)">
    
    <input x-model="form.email" 
           type="email" 
           name="email"
           x-bind:class="errors.email ? 'border-red-500' : 'border-gray-300'" />
    <p x-show="errors.email" x-text="errors.email" class="text-red-500"></p>
    
    <input x-model="form.password" 
           type="password" 
           name="password" />
    
    <button type="submit" 
            x-bind:disabled="!form.email || !form.password">
      Login
    </button>
  </form>
  
  <div id="response"></div>
</div>
```

### Best Practices

1. **State Management**: Use Alpine.js for client-side state, HTMX for server communication
2. **Performance**: Leverage Alpine.js's `x-cloak` directive to prevent flash of unstyled content
3. **Accessibility**: Use Alpine.js focus management plugins for keyboard navigation
4. **Error Handling**: Combine HTMX error events with Alpine.js for user-friendly error states
5. **Progressive Enhancement**: Start with working HTML forms, then enhance with HTMX + Alpine.js

### Testing Components

Test your components at `/test/` routes:
- Basic Alpine.js: `/test/quick-test`
- Advanced interactions: `/test/advanced-test`
- Individual component tests: `/test/[component-name]`

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

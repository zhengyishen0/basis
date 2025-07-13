# AHA Stack Starter Kit: 

demo: https://zhengyishen0.github.io/aha-stack-starter/

## To-Dos:
- [x] fix the alpine components
- [x] the htmx todo list
- [x] github actions
- [x] install all the alpine plugins
- [x] create comprehensive test suite for all Pine components
- [x] fix all component issues (ImageGallery, CopyToClipboard, MonacoEditor, Popover, etc.)
- [x] test Github Actions for Github Pages
- [ ] convert ahtropic website to alpine components
- [ ] convert all the marketing template using alpine basic elements

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
   - Your site will be available at: `https://yourusername.github.io/aha_starter`

### Manual Deployment:
You can also trigger deployment manually by going to the **Actions** tab in your repository and clicking "Run workflow" on the "Deploy to GitHub Pages" workflow.

The deployment configuration is in `.github/workflows/deploy.yml` and includes:
- Node.js setup and dependency installation
- Astro build process
- Automatic deployment to GitHub Pages

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).

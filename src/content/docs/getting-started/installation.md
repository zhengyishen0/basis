---
title: Installation
description: Get started with Basis Stack in minutes
order: 1
---

## Prerequisites

Before you begin, make sure you have the following installed:

- Node.js 18 or higher
- npm or yarn package manager
- Git

## Installation Steps

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/basis-stack.git
cd basis-stack
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Configuration

Copy the example environment file and configure your variables:

```bash
cp .env.example .env
```

Edit `.env` with your configuration:

```env
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Start Development Server

```bash
npm run dev
# or
yarn dev
```

Your application will be available at `http://localhost:4321`

## Project Structure

```
basis-stack/
├── src/
│   ├── components/     # UI components
│   ├── layouts/        # Page layouts
│   ├── pages/          # Route pages
│   └── content/        # Markdown content
├── public/             # Static assets
└── package.json        # Dependencies
```

## Next Steps

- [Configure Supabase](/docs/getting-started/supabase-setup)
- [Explore Components](/docs/components)
- [Learn Alpine.js Integration](/docs/guides/alpine)
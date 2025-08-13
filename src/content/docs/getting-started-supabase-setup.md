---
title: Supabase Setup
description: Configure Supabase for authentication and database
order: 2
---

## Creating a Supabase Project

### 1. Sign up for Supabase

Visit [supabase.com](https://supabase.com) and create a free account.

### 2. Create a New Project

Click "New Project" and fill in:
- Project name
- Database password
- Region (choose closest to your users)

### 3. Get Your API Keys

Navigate to Settings → API to find:
- `Project URL` - Your Supabase URL
- `anon/public` key - Your public API key

## Database Setup

### Create Tables

Use the SQL editor in Supabase dashboard to create your tables:

```sql
-- Example: Users profile table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Enable Row Level Security (RLS)

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);
```

## Authentication Setup

### Configure Auth Providers

In Authentication → Providers, enable:
- Email/Password
- OAuth providers (Google, GitHub, etc.)

### Email Templates

Customize email templates in Authentication → Email Templates

## Environment Variables

Add to your `.env` file:

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Client Initialization

```javascript
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY
)
```

## Next Steps

- [User Authentication](/docs/guides/authentication)
- [Real-time Subscriptions](/docs/guides/realtime)
- [File Storage](/docs/guides/storage)
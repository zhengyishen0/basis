---
title: Supabase Integration Guide
description: Complete guide to integrating Supabase with Basis
---

# Supabase Integration Guide

This guide covers how to integrate Supabase for backend functionality, real-time features, and authentication in Basis.

## Overview

Supabase provides a complete Backend-as-a-Service (BaaS) solution with:
- **PostgreSQL Database**: Full SQL database with real-time subscriptions
- **Authentication**: Built-in auth with multiple providers
- **Real-time**: Subscribe to database changes
- **Storage**: File storage with CDN
- **Edge Functions**: Serverless functions

## Architecture

Basis uses a pure frontend approach with Supabase:

```
Frontend (Astro Page)
├── Alpine.js Store (Global State Management)
├── Supabase JS Client (Direct Database Access)
├── Authentication Handling
└── Real-time UI Updates
```

## Getting Started

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Save your project URL and anon key
3. Enable the authentication providers you want to use

### 2. Configure Supabase Client

Update `/src/lib/supabase.js`:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'YOUR_SUPABASE_URL';
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### 3. Set Up Database Schema

Example todo table with Row Level Security (RLS):

```sql
-- Create todos table
CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  task TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE todos ENABLE ROW LEVEL SECURITY;

-- Create policy: Users can only see their own todos
CREATE POLICY "Users can view own todos" ON todos
  FOR SELECT USING (auth.uid() = user_id);

-- Create policy: Users can insert their own todos
CREATE POLICY "Users can insert own todos" ON todos
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create policy: Users can update their own todos
CREATE POLICY "Users can update own todos" ON todos
  FOR UPDATE USING (auth.uid() = user_id);

-- Create policy: Users can delete their own todos
CREATE POLICY "Users can delete own todos" ON todos
  FOR DELETE USING (auth.uid() = user_id);
```

## Authentication

### Anonymous Authentication

Enable anonymous sign-ins for instant usage:

```javascript
// In your Alpine.js store
async signInAnonymously() {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) {
    console.error('Error signing in:', error);
  } else {
    this.user = data.user;
    this.isAuthenticated = true;
  }
}
```

### Email Authentication

```javascript
// Sign up with email
async signUpWithEmail(email, password) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  if (error) {
    this.error = error.message;
  } else {
    this.user = data.user;
  }
}

// Sign in with email
async signInWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    this.error = error.message;
  } else {
    this.user = data.user;
    this.isAuthenticated = true;
  }
}
```

### Social Authentication

```javascript
// Sign in with GitHub
async signInWithGitHub() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });
}

// Sign in with Google
async signInWithGoogle() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
  });
}
```

## Alpine.js Integration

### Creating a Supabase Store

Example todo store with Supabase integration:

```javascript
// /src/lib/todoStore.js
import Alpine from 'alpinejs';
import { supabase } from './supabase';

Alpine.store('todo', {
  // State
  todos: [],
  loading: false,
  error: null,
  isAuthenticated: false,
  user: null,
  filter: 'all',

  // Initialize
  async init() {
    // Check if user is already logged in
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      this.user = user;
      this.isAuthenticated = true;
      await this.fetchTodos();
    } else {
      // Sign in anonymously
      await this.signInAnonymously();
    }

    // Listen for auth changes
    supabase.auth.onAuthStateChange((event, session) => {
      this.user = session?.user || null;
      this.isAuthenticated = !!session;
      if (session) {
        this.fetchTodos();
      } else {
        this.todos = [];
      }
    });
  },

  // Authentication
  async signInAnonymously() {
    this.loading = true;
    try {
      const { data, error } = await supabase.auth.signInAnonymously();
      if (error) throw error;
      this.user = data.user;
      this.isAuthenticated = true;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  },

  // CRUD Operations
  async fetchTodos() {
    this.loading = true;
    try {
      const { data, error } = await supabase
        .from('todos')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      this.todos = data;
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  },

  async addTodo(task) {
    if (!task.trim()) return;
    
    try {
      const { data, error } = await supabase
        .from('todos')
        .insert([{ task, user_id: this.user.id }])
        .select()
        .single();
      
      if (error) throw error;
      this.todos.unshift(data);
    } catch (error) {
      this.error = error.message;
    }
  },

  async toggleTodo(id, isComplete) {
    try {
      const { error } = await supabase
        .from('todos')
        .update({ is_complete: isComplete })
        .eq('id', id);
      
      if (error) throw error;
      
      const todo = this.todos.find(t => t.id === id);
      if (todo) todo.is_complete = isComplete;
    } catch (error) {
      this.error = error.message;
    }
  },

  async deleteTodo(id) {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      this.todos = this.todos.filter(t => t.id !== id);
    } catch (error) {
      this.error = error.message;
    }
  },

  // Computed properties
  get filteredTodos() {
    switch (this.filter) {
      case 'active':
        return this.todos.filter(t => !t.is_complete);
      case 'completed':
        return this.todos.filter(t => t.is_complete);
      default:
        return this.todos;
    }
  }
});
```

### Using in Components

```astro
<!-- /src/pages/supabase-todo.astro -->
<div x-data="$store.todo" x-init="init()">
  <!-- Error handling -->
  <div x-show="error" x-text="error" class="alert alert-error"></div>

  <!-- Authentication -->
  <div x-show="!isAuthenticated" class="auth-container">
    <button @click="signInAnonymously()" :disabled="loading">
      <span x-text="loading ? 'Signing in...' : 'Sign In Anonymously'"></span>
    </button>
  </div>

  <!-- Todo Interface -->
  <div x-show="isAuthenticated" class="todo-container">
    <!-- Add Todo Form -->
    <form @submit.prevent="addTodo($refs.todoInput.value); $refs.todoInput.value = ''">
      <input 
        x-ref="todoInput" 
        type="text" 
        placeholder="What needs to be done?"
        class="text-input"
        required
      />
      <button type="submit" class="button button-solid-blue">
        Add Todo
      </button>
    </form>

    <!-- Filter Buttons -->
    <div class="filter-buttons">
      <button @click="filter = 'all'" :class="{ active: filter === 'all' }">
        All
      </button>
      <button @click="filter = 'active'" :class="{ active: filter === 'active' }">
        Active
      </button>
      <button @click="filter = 'completed'" :class="{ active: filter === 'completed' }">
        Completed
      </button>
    </div>

    <!-- Todo List -->
    <div x-show="loading">Loading todos...</div>
    
    <ul x-show="!loading" class="todo-list">
      <template x-for="todo in filteredTodos" :key="todo.id">
        <li class="todo-item">
          <input 
            type="checkbox"
            :checked="todo.is_complete"
            @change="toggleTodo(todo.id, $event.target.checked)"
          />
          <span 
            x-text="todo.task" 
            :class="{ 'line-through': todo.is_complete }"
          ></span>
          <button @click="deleteTodo(todo.id)" class="delete-button">
            Delete
          </button>
        </li>
      </template>
    </ul>

    <!-- Stats -->
    <div class="todo-stats">
      <span x-text="`${todos.filter(t => !t.is_complete).length} items left`"></span>
    </div>
  </div>
</div>
```

## Real-time Features

### Subscribing to Changes

```javascript
// Subscribe to real-time changes
const subscription = supabase
  .channel('todos')
  .on('postgres_changes', 
    { event: '*', schema: 'public', table: 'todos' },
    (payload) => {
      console.log('Change received!', payload);
      
      switch (payload.eventType) {
        case 'INSERT':
          // Add new todo to local state
          this.todos.unshift(payload.new);
          break;
        case 'UPDATE':
          // Update existing todo
          const index = this.todos.findIndex(t => t.id === payload.new.id);
          if (index !== -1) {
            this.todos[index] = payload.new;
          }
          break;
        case 'DELETE':
          // Remove deleted todo
          this.todos = this.todos.filter(t => t.id !== payload.old.id);
          break;
      }
    }
  )
  .subscribe();

// Don't forget to unsubscribe when done
subscription.unsubscribe();
```

## Storage

### Uploading Files

```javascript
async uploadAvatar(file) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${this.user.id}-${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('avatars')
    .upload(fileName, file);
  
  if (error) {
    console.error('Error uploading file:', error);
    return;
  }
  
  // Get public URL
  const { data: { publicUrl } } = supabase.storage
    .from('avatars')
    .getPublicUrl(fileName);
  
  return publicUrl;
}
```

## Best Practices

### 1. Error Handling
Always handle errors gracefully:

```javascript
try {
  const { data, error } = await supabase
    .from('table')
    .select('*');
  
  if (error) throw error;
  // Handle data
} catch (error) {
  console.error('Error:', error.message);
  // Show user-friendly error message
}
```

### 2. Loading States
Provide feedback during async operations:

```javascript
this.loading = true;
try {
  // Perform operation
} finally {
  this.loading = false;
}
```

### 3. Row Level Security
Always use RLS policies to secure your data:

```sql
-- Only authenticated users can access their data
CREATE POLICY "Authenticated users only" ON table_name
  FOR ALL USING (auth.uid() IS NOT NULL);
```

### 4. Environment Variables
Never commit credentials. Use environment variables:

```javascript
// Use Astro's import.meta.env
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
```

### 5. Optimistic Updates
Update UI immediately for better UX:

```javascript
// Optimistic update
const tempTodo = { id: Date.now(), task, is_complete: false };
this.todos.unshift(tempTodo);

// Then sync with database
const { data, error } = await supabase
  .from('todos')
  .insert([{ task }])
  .select()
  .single();

if (error) {
  // Rollback on error
  this.todos = this.todos.filter(t => t.id !== tempTodo.id);
} else {
  // Replace temp with real data
  const index = this.todos.findIndex(t => t.id === tempTodo.id);
  this.todos[index] = data;
}
```

## Testing

Basis includes a complete Supabase todo app example:
- Live Demo: `/supabase-todo`
- Source: `/src/pages/supabase-todo.astro`

This demonstrates:
- Anonymous authentication
- Real-time CRUD operations
- Alpine.js state management
- Row Level Security
- Error handling
- Loading states

## Deployment Considerations

### 1. Environment Variables
Set these in your deployment platform:
- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

### 2. CORS Configuration
Configure allowed origins in Supabase dashboard:
- Dashboard → Settings → API → CORS Allowed Origins

### 3. Security
- Use RLS policies for all tables
- Never expose service role key
- Validate data on the frontend
- Use Supabase Auth for user management

## Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Row Level Security Guide](https://supabase.com/docs/guides/auth/row-level-security)
- [Real-time Subscriptions](https://supabase.com/docs/guides/realtime)
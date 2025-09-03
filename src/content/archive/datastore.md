---
title: DataStore Plugin
description: A powerful generic data store for Supabase tables with built-in CRUD operations, filtering, and state management
---

# DataStore Plugin

The DataStore plugin provides a reusable factory function for creating data stores that work with any Supabase table or view. It handles common CRUD operations, loading states, error management, and dynamic filtering.

## Features

- 🚀 **Generic CRUD Operations** - Create, Read, Update, Delete with minimal code
- 🔍 **Dynamic Filtering** - Powerful query capabilities with multiple filter types
- 📊 **State Management** - Built-in loading and error states
- 🔐 **User Scoping** - Automatic filtering by user ID
- 🎯 **Type-Safe** - Works great with TypeScript
- ⚡ **Lightweight** - No external dependencies beyond Supabase

## Installation

The DataStore is already included in your project at `src/lib/dataStore.js`.

## Basic Usage

### Creating a Store

```javascript
import { createDataStore } from "./lib/dataStore.js";

// Create a store for your table
const productStore = createDataStore("products", {
  orderBy: "created_at",
  ascending: false,
  primaryKey: "id",
  userField: "user_id", // Optional: for user-scoped data
});
```

### Configuration Options

| Option       | Type    | Default      | Description                          |
| ------------ | ------- | ------------ | ------------------------------------ |
| `orderBy`    | string  | 'created_at' | Column to sort by                    |
| `ascending`  | boolean | false        | Sort direction                       |
| `primaryKey` | string  | 'id'         | Primary key column name              |
| `userField`  | string  | 'user_id'    | Column for user filtering (optional) |

## API Reference

### Core Methods

#### `load(userId, filters)`

Load data from the table with optional filters.

```javascript
// Basic load
await store.load(userId);

// With filters
await store.load(userId, {
  category: "electronics",
  price: { min: 100, max: 500 },
  name: { like: "%phone%" },
});
```

#### `create(userId, data)`

Create a new record.

```javascript
const newProduct = await store.create(userId, {
  name: "iPhone 15",
  price: 999,
  category: "electronics",
});
```

#### `update(userId, id, updates)`

Update an existing record.

```javascript
await store.update(userId, productId, {
  price: 899,
  on_sale: true,
});
```

#### `delete(userId, id)`

Delete a record.

```javascript
await store.delete(userId, productId);
```

#### `query(buildQuery)`

Advanced querying with full Supabase query access.

```javascript
await store.query((q) =>
  q
    .select("*, category(*)")
    .gte("price", 100)
    .order("created_at", { ascending: false })
    .limit(10),
);
```

#### `subscribe(userId, filters, callbacks)`

Subscribe to real-time changes with optional filtering.

```javascript
const unsubscribe = store.subscribe(
  userId,
  {
    status: "active",
    category: "electronics",
  },
  {
    onInsert: (newItem) => console.log("New item:", newItem),
    onUpdate: (updatedItem, oldItem) => console.log("Updated:", updatedItem),
    onDelete: (deletedItem) => console.log("Deleted:", deletedItem),
    onChange: (eventType, newRecord, oldRecord) => {
      // Handle all changes
    },
  },
);

// Later, unsubscribe
unsubscribe();
```

#### `unsubscribe()`

Stop real-time subscription.

```javascript
store.unsubscribe();
```

### State Properties

| Property         | Type        | Description               |
| ---------------- | ----------- | ------------------------- |
| `items`          | array       | The loaded data           |
| `loading`        | boolean     | Loading state             |
| `error`          | string/null | Error message if any      |
| `currentFilters` | object      | Currently applied filters |

## Filter Types

The DataStore supports various filter types:

### Exact Match

```javascript
{
  status: "active";
}
```

### Array (IN query)

```javascript
{
  category: ["electronics", "accessories"];
}
```

### Range

```javascript
{ price: { min: 100, max: 500 } }
```

### Pattern Matching

```javascript
{
    name: { like: '%phone%' },    // Case sensitive
    email: { ilike: '%@gmail%' }  // Case insensitive
}
```

## Real-World Examples

### E-commerce Product Store

```javascript
export const productStore = (() => {
  const store = createDataStore("products", {
    orderBy: "created_at",
    userField: null, // Products are public
  });

  return {
    ...store,

    // Custom methods
    async loadByCategory(category) {
      await this.load(null, { category });
    },

    async searchProducts(searchTerm, filters = {}) {
      await this.load(null, {
        ...filters,
        name: { ilike: `%${searchTerm}%` },
      });
    },

    async loadFeatured() {
      await this.query((q) => q.eq("featured", true).limit(6));
    },
  };
})();
```

### User Profile Store

```javascript
export const profileStore = createDataStore("profiles", {
  primaryKey: "user_id",
  userField: "user_id",
});

// Simple usage - automatically scoped to user
await profileStore.load(userId);
await profileStore.update(userId, userId, {
  display_name: "John Doe",
  bio: "Software Developer",
});
```

### Todo Store with Real-time Sync

```javascript
export const todoStore = (() => {
  const baseStore = createDataStore("todos", {
    orderBy: "inserted_at",
    ascending: false,
    userField: "user_id",
  });

  return {
    ...baseStore,

    currentFilter: "all",
    _unsubscribe: null,

    // Load todos and start real-time sync
    async loadTodos(userId) {
      await this.load(userId);
      this.startRealtimeSync(userId);
    },

    // Start real-time synchronization
    startRealtimeSync(userId) {
      this.stopRealtimeSync();

      this._unsubscribe = this.subscribe(
        userId,
        {},
        {
          onInsert: (newTodo) => {
            console.log("New todo added:", newTodo);
            // Todo automatically added to items array
          },
          onUpdate: (updatedTodo) => {
            console.log("Todo updated:", updatedTodo);
            // Todo automatically updated in items array
          },
          onDelete: (deletedTodo) => {
            console.log("Todo deleted:", deletedTodo);
            // Todo automatically removed from items array
          },
        },
      );
    },

    // Stop real-time sync
    stopRealtimeSync() {
      if (this._unsubscribe) {
        this._unsubscribe();
        this._unsubscribe = null;
      }
    },

    // Computed properties
    get filteredTodos() {
      switch (this.currentFilter) {
        case "active":
          return this.items.filter((t) => !t.is_complete);
        case "completed":
          return this.items.filter((t) => t.is_complete);
        default:
          return this.items;
      }
    },

    // Clean up
    cleanup() {
      this.stopRealtimeSync();
      this.items = [];
    },
  };
})();
```

### Blog Post Store with Comments

```javascript
export const postStore = (() => {
  const store = createDataStore("posts", {
    orderBy: "published_at",
    ascending: false,
  });

  return {
    ...store,

    async loadWithComments(postId) {
      await this.query((q) =>
        q
          .select(
            `
                    *,
                    author:profiles(*),
                    comments(
                        *,
                        user:profiles(*)
                    )
                `,
          )
          .eq("id", postId)
          .single(),
      );
    },

    async loadPublished() {
      await this.load(null, {
        status: "published",
        published_at: { max: new Date().toISOString() },
      });
    },
  };
})();
```

## Integration with Alpine.js

The DataStore works seamlessly with Alpine.js stores:

```javascript
// In your Alpine store file
import { createDataStore } from "./dataStore.js";

const baseStore = createDataStore("tasks", {
  orderBy: "due_date",
  ascending: true,
});

export const taskStore = {
  ...baseStore,

  // Add computed properties
  get overdueTasks() {
    const today = new Date().toISOString();
    return this.items.filter(
      (task) => !task.completed && task.due_date < today,
    );
  },

  // Override or add methods
  async toggleComplete(taskId) {
    const task = this.items.find((t) => t.id === taskId);
    if (task) {
      await this.update(userId, taskId, {
        completed: !task.completed,
        completed_at: task.completed ? null : new Date().toISOString(),
      });
    }
  },
};

// Register with Alpine
Alpine.store("tasks", taskStore);
```

## Advanced Features

### Custom Hooks

Add lifecycle hooks for custom logic:

```javascript
const store = createDataStore("orders", {
  beforeCreate(data) {
    // Add order number
    data.order_number = `ORD-${Date.now()}`;
  },

  afterCreate(order) {
    // Send notification
    notificationService.send("New order created!");
  },

  afterLoad(orders) {
    // Calculate totals
    this.totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
  },
});
```

### Pagination

```javascript
const store = createDataStore("posts");

// Add pagination methods
store.loadPage = async function (page = 1, pageSize = 10) {
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  await this.query((q) => q.range(from, to));
};
```

### Real-time Subscriptions

DataStore has built-in real-time support:

```javascript
const messageStore = createDataStore("messages");

// Subscribe to all messages for current user
const unsubscribe = messageStore.subscribe(
  userId,
  {},
  {
    onInsert: (newMessage) => {
      // Handle new message
      showNotification(`New message: ${newMessage.content}`);
    },
    onUpdate: (updatedMessage) => {
      // Handle message update
      console.log("Message updated:", updatedMessage);
    },
    onDelete: (deletedMessage) => {
      // Handle message deletion
      console.log("Message deleted:", deletedMessage);
    },
  },
);

// Subscribe with filters (only urgent messages)
const urgentUnsubscribe = messageStore.subscribe(
  userId,
  {
    priority: "urgent",
    read: false,
  },
  {
    onInsert: (urgentMessage) => {
      playSound("urgent-notification");
      showPopup(urgentMessage.content);
    },
  },
);

// Clean up on component unmount
onUnmount(() => {
  unsubscribe();
  urgentUnsubscribe();
});
```

### Real-time Filter Support

The subscribe method supports the same filter types as `load()`:

```javascript
// Exact match
{
  status: "active";
}

// Multiple values
{
  category: ["electronics", "books"];
}

// Range (Note: real-time filters are more limited than query filters)
{
  price: {
    min: 100;
  }
} // Only min OR max, not both
{
  price: {
    max: 500;
  }
}
```

## Best Practices

1. **Use Views for Complex Data** - Create database views for data that requires joins or calculations
2. **Leverage Computed Properties** - Add getters for derived data
3. **Keep Stores Focused** - One store per domain entity
4. **Handle Errors Gracefully** - Always check the `error` property
5. **Optimize Queries** - Use `select` to limit returned columns

## Troubleshooting

### Common Issues

**Items not updating after create/update:**

- Check if your table has RLS policies
- Ensure the user has proper permissions
- Verify the `select()` returns data after mutations

**Filters not working:**

- Check column names match exactly
- Ensure filter syntax is correct
- Use `query()` for complex filtering

**Performance issues:**

- Add database indexes on filtered columns
- Limit returned columns with `select`
- Implement pagination for large datasets

## TypeScript Support

```typescript
interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const productStore = createDataStore<Product>("products", {
  orderBy: "created_at",
});

// Now TypeScript knows the shape of items
productStore.items.forEach((product) => {
  console.log(product.name); // ✓ Type-safe
});
```

## Summary

The DataStore plugin provides a powerful, flexible foundation for working with Supabase data. By handling common patterns like CRUD operations, loading states, and filtering, it lets you focus on your application logic instead of boilerplate code.

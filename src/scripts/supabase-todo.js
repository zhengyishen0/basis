// Todo App State Management
window.TodoApp = {
    currentUser: null,
    todos: [],
    currentFilter: 'all',
    loading: false,
    error: null,
    
    // Get the global Supabase client
    get supabaseClient() {
        return window.App?.supabase;
    },
    
    // Initialize the app
    async init() {
        // Wait for global App to be available
        if (!window.App?.supabase) {
            setTimeout(() => this.init(), 200);
            return;
        }

        try {
            await this.checkAuthStatus();
        } catch (error) {
            this.error = 'Failed to initialize todo app: ' + error.message;
        }
    },

    // Computed properties
    get isAuthenticated() {
        return !!this.currentUser;
    },

    get filteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.is_complete);
            case 'completed':
                return this.todos.filter(t => t.is_complete);
            default:
                return this.todos;
        }
    },

    get activeCount() {
        return this.todos.filter(t => !t.is_complete).length;
    },

    get completedCount() {
        return this.todos.filter(t => t.is_complete).length;
    },

    get userDisplayId() {
        return this.currentUser ? this.currentUser.id.slice(0, 8) + '...' : '';
    }
};

// Add methods to TodoApp object
Object.assign(window.TodoApp, {
    async checkAuthStatus() {
        try {
            const { data: { user } } = await this.supabaseClient.auth.getUser();
            if (user) {
                this.currentUser = user;
                await this.loadTodos();
            }
        } catch (error) {
            console.error('Auth check failed:', error);
        }
    },

    async signInAnonymously() {
        this.loading = true;
        this.error = null;

        try {
            const { data, error } = await this.supabaseClient.auth.signInAnonymously();
            if (error) throw error;
            
            this.currentUser = data.user;
            await this.loadTodos();
            
        } catch (error) {
            this.error = 'Sign in failed: ' + error.message;
        } finally {
            this.loading = false;
        }
    },

    async signOut() {
        try {
            const { error } = await this.supabaseClient.auth.signOut();
            if (error) throw error;
            
            this.currentUser = null;
            this.todos = [];
            
        } catch (error) {
            this.error = 'Sign out failed: ' + error.message;
        }
    },

    async loadTodos() {
        if (!this.currentUser) return;
        
        this.loading = true;
        this.error = null;

        try {
            const { data, error } = await this.supabaseClient
                .from('todos')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .order('inserted_at', { ascending: false });

            if (error) throw error;
            
            this.todos = data || [];
            
        } catch (error) {
            this.error = 'Failed to load todos: ' + error.message;
        } finally {
            this.loading = false;
        }
    },

    async addTodo(text) {
        if (!text?.trim() || !this.currentUser) return;

        this.loading = true;
        this.error = null;

        try {
            const { data, error } = await this.supabaseClient
                .from('todos')
                .insert([{
                    task: text.trim(),
                    user_id: this.currentUser.id
                }])
                .select();

            // If we got data back, the insert was successful regardless of any constraint warnings
            if (data && data[0]) {
                this.todos.unshift(data[0]);
            } else if (error) {
                throw error;
            } else {
                // Fallback: reload todos to get the latest state
                await this.loadTodos();
            }
            
        } catch (error) {
            // Check if the todo was actually added despite the error
            const beforeCount = this.todos.length;
            await this.loadTodos();
            
            // If todos didn't increase, show the error
            if (this.todos.length <= beforeCount) {
                this.error = 'Failed to add todo: ' + error.message;
            }
        } finally {
            this.loading = false;
        }
    },

    async toggleTodo(todoId, completed) {
        if (!this.currentUser) return;

        try {
            const { error } = await this.supabaseClient
                .from('todos')
                .update({ is_complete: completed })
                .eq('id', todoId)
                .eq('user_id', this.currentUser.id);

            if (error) throw error;
            
            // Update local state
            const todo = this.todos.find(t => t.id == todoId);
            if (todo) {
                todo.is_complete = completed;
            }
            
        } catch (error) {
            this.error = 'Failed to update todo: ' + error.message;
        }
    },

    async deleteTodo(todoId) {
        if (!this.currentUser) return;

        try {
            const { error } = await this.supabaseClient
                .from('todos')
                .delete()
                .eq('id', todoId)
                .eq('user_id', this.currentUser.id);

            if (error) throw error;
            
            // Remove from local state
            this.todos = this.todos.filter(t => t.id != todoId);
            
        } catch (error) {
            this.error = 'Failed to delete todo: ' + error.message;
        }
    },

    setFilter(filter) {
        this.currentFilter = filter;
    }
});
import { supabase } from './supabase.js'

export const todoStore = {
    // State
    currentUser: null,
    todos: [],
    currentFilter: 'all',
    loading: false,
    error: null,
    initialized: false,

    // Computed properties
    get isAuthenticated() {
        return !!this.currentUser
    },

    get filteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(t => !t.is_complete)
            case 'completed':
                return this.todos.filter(t => t.is_complete)
            default:
                return this.todos
        }
    },

    get activeCount() {
        return this.todos.filter(t => !t.is_complete).length
    },

    get completedCount() {
        return this.todos.filter(t => t.is_complete).length
    },

    get userDisplayId() {
        return this.currentUser ? this.currentUser.id.slice(0, 8) + '...' : ''
    },

    // Actions
    async init() {
        if (this.initialized) return
        
        try {
            await this.checkAuthStatus()
            this.initialized = true
        } catch (error) {
            this.error = 'Failed to initialize todo app: ' + error.message
        }
    },

    async checkAuthStatus() {
        try {
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                this.currentUser = user
                await this.loadTodos()
            }
        } catch (error) {
            console.error('Auth check failed:', error)
        }
    },

    async signInAnonymously() {
        this.loading = true
        this.error = null

        try {
            const { data, error } = await supabase.auth.signInAnonymously()
            if (error) throw error
            
            this.currentUser = data.user
            await this.loadTodos()
            
        } catch (error) {
            this.error = 'Sign in failed: ' + error.message
        } finally {
            this.loading = false
        }
    },

    async signOut() {
        try {
            const { error } = await supabase.auth.signOut()
            if (error) throw error
            
            this.currentUser = null
            this.todos = []
            
        } catch (error) {
            this.error = 'Sign out failed: ' + error.message
        }
    },

    async loadTodos() {
        if (!this.currentUser) return
        
        this.loading = true
        this.error = null

        try {
            const { data, error } = await supabase
                .from('todos')
                .select('*')
                .eq('user_id', this.currentUser.id)
                .order('inserted_at', { ascending: false })

            if (error) throw error
            
            this.todos = data || []
            
        } catch (error) {
            this.error = 'Failed to load todos: ' + error.message
        } finally {
            this.loading = false
        }
    },

    async addTodo(text) {
        if (!text?.trim() || !this.currentUser) return

        this.loading = true
        this.error = null

        try {
            const { data, error } = await supabase
                .from('todos')
                .insert([{
                    task: text.trim(),
                    user_id: this.currentUser.id
                }])
                .select()

            if (data && data[0]) {
                this.todos.unshift(data[0])
            } else if (error) {
                throw error
            } else {
                await this.loadTodos()
            }
            
        } catch (error) {
            const beforeCount = this.todos.length
            await this.loadTodos()
            
            if (this.todos.length <= beforeCount) {
                this.error = 'Failed to add todo: ' + error.message
            }
        } finally {
            this.loading = false
        }
    },

    async toggleTodo(todoId, completed) {
        if (!this.currentUser) return

        try {
            const { error } = await supabase
                .from('todos')
                .update({ is_complete: completed })
                .eq('id', todoId)
                .eq('user_id', this.currentUser.id)

            if (error) throw error
            
            const todo = this.todos.find(t => t.id == todoId)
            if (todo) {
                todo.is_complete = completed
            }
            
        } catch (error) {
            this.error = 'Failed to update todo: ' + error.message
        }
    },

    async deleteTodo(todoId) {
        if (!this.currentUser) return

        try {
            const { error } = await supabase
                .from('todos')
                .delete()
                .eq('id', todoId)
                .eq('user_id', this.currentUser.id)

            if (error) throw error
            
            this.todos = this.todos.filter(t => t.id != todoId)
            
        } catch (error) {
            this.error = 'Failed to delete todo: ' + error.message
        }
    },

    setFilter(filter) {
        this.currentFilter = filter
    }
}
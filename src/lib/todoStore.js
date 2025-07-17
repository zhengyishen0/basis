import { createViewStore } from './genericViewStore.js'
import { authStore } from './authStore.js'

// Create base store for CRUD operations
const baseStore = createViewStore('todos', {
    orderBy: 'inserted_at',
    ascending: false,
    primaryKey: 'id',
    userField: 'user_id'
})

// Create todo store with auth integration
export const todoStore = {
    // Spread base store methods
    ...baseStore,
    
    // Todo-specific state
    currentFilter: 'all',
    
    // Override items getter to rename as todos for compatibility
    get todos() {
        return this.items
    },
    
    set todos(value) {
        this.items = value
    },
    
    // Computed properties
    get filteredTodos() {
        const todos = this.todos || []
        switch (this.currentFilter) {
            case 'active':
                return todos.filter(t => !t.is_complete)
            case 'completed':
                return todos.filter(t => t.is_complete)
            default:
                return todos
        }
    },
    
    get activeCount() {
        const todos = this.todos || []
        return todos.filter(t => !t.is_complete).length
    },
    
    get completedCount() {
        const todos = this.todos || []
        return todos.filter(t => t.is_complete).length
    },
    
    // Methods that use authStore internally
    async loadTodos() {
        if (!authStore.currentUser) return
        await baseStore.load.call(this, authStore.currentUser.id)
    },
    
    async addTodo(text) {
        if (!text?.trim() || !authStore.currentUser) return
        
        const result = await baseStore.create.call(this, authStore.currentUser.id, {
            task: text.trim()
        })
        
        // Handle the special case where create might fail silently
        if (!result && !this.error) {
            await this.loadTodos()
        }
    },
    
    async toggleTodo(todoId, completed) {
        if (!authStore.currentUser) return
        await baseStore.update.call(this, authStore.currentUser.id, todoId, { is_complete: completed })
    },
    
    async deleteTodo(todoId) {
        if (!authStore.currentUser) return
        await baseStore.delete.call(this, authStore.currentUser.id, todoId)
    },
    
    // Filter management
    setFilter(filter) {
        this.currentFilter = filter
    }
}
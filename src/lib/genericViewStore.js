import { supabase } from './supabase.js'

/**
 * Creates a generic store for any Supabase view/table
 * @param {string} viewName - The name of the Supabase view/table
 * @param {Object} config - Configuration options
 * @returns {Object} Store object with CRUD operations
 */
export function createViewStore(viewName, config = {}) {
  const defaults = {
    orderBy: 'created_at',
    ascending: false,
    userField: 'user_id',
    primaryKey: 'id'
  }
  
  const options = { ...defaults, ...config }
  
  return {
    // State
    items: [],
    loading: false,
    error: null,
    currentFilters: {},
    
    
    
    // Generic load with dynamic filters
    async load(userId, filters = {}) {
      if (!userId && options.userField) return
      
      this.loading = true
      this.error = null
      this.currentFilters = filters
      
      try {
        let query = supabase.from(viewName).select('*')
        
        // Always filter by user unless explicitly disabled
        if (options.userField && userId && !filters._skipUserFilter) {
          query = query.eq(options.userField, userId)
        }
        
        // Apply dynamic filters
        Object.entries(filters).forEach(([key, value]) => {
          if (key.startsWith('_') || value === null || value === undefined) return
          
          if (Array.isArray(value)) {
            query = query.in(key, value)
          } else if (typeof value === 'object') {
            if ('min' in value && value.min !== null) {
              query = query.gte(key, value.min)
            }
            if ('max' in value && value.max !== null) {
              query = query.lte(key, value.max)
            }
            if ('like' in value) {
              query = query.like(key, value.like)
            }
            if ('ilike' in value) {
              query = query.ilike(key, value.ilike)
            }
          } else {
            query = query.eq(key, value)
          }
        })
        
        // Apply ordering
        if (options.orderBy) {
          query = query.order(options.orderBy, { ascending: options.ascending })
        }
        
        const { data, error } = await query
        if (error) throw error
        
        this.items = data || []
        
        // Call afterLoad hook if provided
        if (options.afterLoad) {
          await options.afterLoad.call(this, this.items)
        }
        
      } catch (error) {
        this.error = `Failed to load ${viewName}: ${error.message}`
      } finally {
        this.loading = false
      }
    },
    
    // Refresh with current filters
    async refresh(userId) {
      await this.load(userId, this.currentFilters)
    },
    
    // Create item
    async create(userId, itemData) {
      if (!userId && options.userField) return
      
      this.loading = true
      this.error = null
      
      try {
        // Prepare data
        const dataToInsert = {
          ...itemData
        }
        
        if (options.userField && userId) {
          dataToInsert[options.userField] = userId
        }
        
        // Call beforeCreate hook if provided
        if (options.beforeCreate) {
          await options.beforeCreate.call(this, dataToInsert)
        }
        
        const { data, error } = await supabase
          .from(viewName)
          .insert([dataToInsert])
          .select()
          
        if (error) throw error
        
        if (data && data[0]) {
          // Add to items array based on ordering
          if (options.orderBy === 'created_at' && !options.ascending) {
            this.items.unshift(data[0])
          } else {
            this.items.push(data[0])
          }
          
          // Call afterCreate hook if provided
          if (options.afterCreate) {
            await options.afterCreate.call(this, data[0])
          }
        }
        
        return data?.[0]
        
      } catch (error) {
        this.error = `Failed to create ${viewName}: ${error.message}`
        
        // Try to refresh to ensure consistency
        await this.refresh(userId)
      } finally {
        this.loading = false
      }
    },
    
    // Update item
    async update(userId, id, updates) {
      if (!userId && options.userField) return
      
      try {
        // Call beforeUpdate hook if provided
        if (options.beforeUpdate) {
          await options.beforeUpdate.call(this, id, updates)
        }
        
        const { error } = await supabase
          .from(viewName)
          .update(updates)
          .eq(options.primaryKey, id)
          .eq(options.userField, userId)
          
        if (error) throw error
        
        // Update local state
        const index = this.items.findIndex(item => item[options.primaryKey] === id)
        if (index !== -1) {
          this.items[index] = { ...this.items[index], ...updates }
          
          // Call afterUpdate hook if provided
          if (options.afterUpdate) {
            await options.afterUpdate.call(this, this.items[index])
          }
        }
        
      } catch (error) {
        this.error = `Failed to update ${viewName}: ${error.message}`
      }
    },
    
    // Delete item
    async delete(userId, id) {
      if (!userId && options.userField) return
      
      try {
        const { error } = await supabase
          .from(viewName)
          .delete()
          .eq(options.primaryKey, id)
          .eq(options.userField, userId)
          
        if (error) throw error
        
        // Remove from local state
        this.items = this.items.filter(item => item[options.primaryKey] !== id)
        
        // Call afterDelete hook if provided
        if (options.afterDelete) {
          await options.afterDelete.call(this, id)
        }
        
      } catch (error) {
        this.error = `Failed to delete ${viewName}: ${error.message}`
      }
    },
    
    // Advanced query with full Supabase query access
    async query(buildQuery) {
      this.loading = true
      this.error = null
      
      try {
        const baseQuery = supabase.from(viewName).select('*')
        const query = buildQuery(baseQuery)
        
        const { data, error } = await query
        if (error) throw error
        
        this.items = data || []
        return data
        
      } catch (error) {
        this.error = `Query failed: ${error.message}`
      } finally {
        this.loading = false
      }
    }
  }
}
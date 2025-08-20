/**
 * Layout Store for Alpine.js
 * Manages page width toggle and mobile menu state
 */
export const layoutStore = {
    wide: false,
    mobileMenuOpen: false,
    
    /**
     * Initialize layout from localStorage
     */
    init() {
        this.wide = localStorage.getItem('layout-wide') === 'true';
        
        // Close mobile menu when screen gets larger
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 768 && this.mobileMenuOpen) {
                this.closeMobileMenu();
            }
        });
    },
    
    /**
     * Toggle between normal container and full width
     */
    toggleWidth() {
        this.wide = !this.wide;
        this.save();
    },
    
    /**
     * Toggle mobile menu overlay
     */
    toggleMobileMenu() {
        this.mobileMenuOpen = !this.mobileMenuOpen;
        
        // Prevent body scroll when mobile menu is open
        if (this.mobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    },
    
    /**
     * Close mobile menu
     */
    closeMobileMenu() {
        this.mobileMenuOpen = false;
        document.body.style.overflow = '';
    },
    
    /**
     * Set specific width mode
     * @param {boolean} wide - true for full width, false for container
     */
    setWidth(wide) {
        this.wide = Boolean(wide);
        this.save();
    },
    
    /**
     * Save layout preference to localStorage
     */
    save() {
        localStorage.setItem('layout-wide', this.wide.toString());
    },
    
    /**
     * Get container classes based on current width setting
     */
    get containerClasses() {
        return this.wide ? '' : 'container mx-auto px-4';
    }
};

/**
 * Data Loader Module
 * Handles loading and processing of road and tender data
 */

class DataLoader {
    constructor() {
        this.roads = [];
        this.isLoaded = false;
    }

    /**
     * Load road data from JSON file
     * @returns {Promise<Array>} Array of road objects
     */
    async loadRoadData() {
        try {
            const response = await fetch('data/roads.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            this.roads = data.roads || [];
            this.isLoaded = true;
            console.log(`Loaded ${this.roads.length} roads`);
            return this.roads;
        } catch (error) {
            console.error('Error loading road data:', error);
            // Return empty array if file doesn't exist yet
            this.roads = [];
            this.isLoaded = true;
            return this.roads;
        }
    }

    /**
     * Get all roads
     * @returns {Array} Array of road objects
     */
    getRoads() {
        return this.roads;
    }

    /**
     * Get road by ID
     * @param {string} id - Road ID
     * @returns {Object|null} Road object or null if not found
     */
    getRoadById(id) {
        return this.roads.find(road => road.id === id) || null;
    }

    /**
     * Get statistics about loaded roads
     * @returns {Object} Statistics object
     */
    getStats() {
        return {
            totalRoads: this.roads.length,
            totalCost: this.roads.reduce((sum, road) => {
                return sum + (parseFloat(road.tenderDetails?.cost) || 0);
            }, 0),
            contractors: [...new Set(this.roads.map(r => r.tenderDetails?.contractor))].length
        };
    }

    /**
     * Format currency in Indian Rupees
     * @param {number} amount - Amount in rupees
     * @returns {string} Formatted currency string
     */
    formatCurrency(amount) {
        const numAmount = parseFloat(amount);
        if (isNaN(numAmount)) return 'N/A';
        
        // Convert to crores/lakhs format
        if (numAmount >= 10000000) {
            return `₹${(numAmount / 10000000).toFixed(2)} Cr`;
        } else if (numAmount >= 100000) {
            return `₹${(numAmount / 100000).toFixed(2)} L`;
        } else {
            return `₹${numAmount.toLocaleString('en-IN')}`;
        }
    }

    /**
     * Format date to readable format
     * @param {string} dateString - ISO date string
     * @returns {string} Formatted date string
     */
    formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// Create global instance
const dataLoader = new DataLoader();


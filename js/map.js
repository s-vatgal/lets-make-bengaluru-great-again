/**
 * Map Initialization and Interaction
 * Handles Leaflet map setup and user interactions
 */

class BengaluruRoadMap {
    constructor() {
        this.map = null;
        this.roadLayers = [];
        this.currentHighlight = null;
        
        // Bengaluru coordinates - focused on city center
        this.centerLat = 12.9716;
        this.centerLng = 77.5946;
        this.defaultZoom = 13;
        
        this.init();
    }

    /**
     * Initialize the map and load data
     */
    async init() {
        this.setupMap();
        this.setupEventListeners();
        
        // Load road data
        await dataLoader.loadRoadData();
        this.updateStats();
        this.displayRoads();
    }

    /**
     * Setup Leaflet map with OpenStreetMap tiles
     */
    setupMap() {
        // Initialize map with enhanced options for better user experience
        this.map = L.map('map', {
            center: [this.centerLat, this.centerLng],
            zoom: this.defaultZoom,
            zoomControl: true,
            scrollWheelZoom: true,
            doubleClickZoom: true,
            boxZoom: true,
            dragging: true,
            keyboard: true,
            touchZoom: true,
            bounceAtZoomLimits: true,
            worldCopyJump: false,
            maxBounds: [
                [12.8, 77.3],  // Southwest corner - tighter bounds
                [13.2, 77.9]   // Northeast corner - tighter bounds
            ],
            maxBoundsViscosity: 1.0
        });

        // Add warm-toned map tiles with yellow-red color scheme
        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: 'abcd',
            maxZoom: 19,
            minZoom: 10,
            updateWhenZooming: true,
            keepBuffer: 2
        }).addTo(this.map);

        // Use default Leaflet zoom controls (no custom ones needed)

        // Add scale control
        L.control.scale({ 
            position: 'bottomleft',
            metric: true,
            imperial: false
        }).addTo(this.map);

        // Add attribution control
        L.control.attribution({
            position: 'bottomright',
            prefix: false
        }).addTo(this.map);

        // Add smooth zoom animations
        this.map.options.zoomAnimation = true;
        this.map.options.fadeAnimation = true;
        this.map.options.markerZoomAnimation = true;

        console.log('Map initialized successfully with enhanced controls');
    }


    /**
     * Display roads on the map
     */
    displayRoads() {
        const roads = dataLoader.getRoads();
        
        if (roads.length === 0) {
            console.log('No road data available. Please add roads to data/roads.json');
            this.showWelcomeMessage();
            return;
        }

        roads.forEach(road => {
            this.addRoadToMap(road);
        });

        console.log(`Displayed ${roads.length} roads on map`);
    }

    /**
     * Add a single road to the map
     * @param {Object} road - Road object with geometry and details
     */
    addRoadToMap(road) {
        if (!road.geometry || !road.geometry.coordinates) {
            console.warn(`Road ${road.id} has no geometry data`);
            return;
        }

        // Convert coordinates to Leaflet format [lat, lng]
        const latlngs = road.geometry.coordinates.map(coord => [coord[0], coord[1]]);

        // Create polyline with styling
        const polyline = L.polyline(latlngs, {
            color: '#2563eb',
            weight: 4,
            opacity: 0.7,
            smoothFactor: 1
        }).addTo(this.map);

        // Add hover effect
        polyline.on('mouseover', (e) => {
            e.target.setStyle({
                color: '#ef4444',
                weight: 6,
                opacity: 0.9
            });
        });

        polyline.on('mouseout', (e) => {
            if (this.currentHighlight !== e.target) {
                e.target.setStyle({
                    color: '#2563eb',
                    weight: 4,
                    opacity: 0.7
                });
            }
        });

        // Add click event to show details
        polyline.on('click', () => {
            this.showRoadDetails(road);
            this.highlightRoad(polyline);
        });

        // Add tooltip on hover
        polyline.bindTooltip(road.name, {
            permanent: false,
            direction: 'top',
            className: 'road-tooltip'
        });

        this.roadLayers.push({ road, polyline });
    }

    /**
     * Highlight selected road
     * @param {L.Polyline} polyline - Leaflet polyline to highlight
     */
    highlightRoad(polyline) {
        // Reset previous highlight
        if (this.currentHighlight) {
            this.currentHighlight.setStyle({
                color: '#2563eb',
                weight: 4,
                opacity: 0.7
            });
        }

        // Set new highlight
        polyline.setStyle({
            color: '#ef4444',
            weight: 6,
            opacity: 0.9
        });

        this.currentHighlight = polyline;

        // Pan to road
        this.map.fitBounds(polyline.getBounds(), {
            padding: [50, 50],
            maxZoom: 15
        });
    }

    /**
     * Setup search functionality for areas in Bengaluru
     */
    setupSearch() {
        const searchInput = document.getElementById('search-input');
        const searchBtn = document.getElementById('search-btn');

        console.log('Setting up search functionality with Nominatim API...');
        console.log('Search input:', searchInput);
        console.log('Search button:', searchBtn);

        /**
         * Search for areas using free Nominatim API
         * @param {string} query - Search query
         * @returns {Promise<Object|null>} Search result with coordinates and name
         */
        const searchArea = async (query) => {
            try {
                console.log('Searching Nominatim for:', query);
                
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?` +
                    `q=${encodeURIComponent(query)}, Bengaluru, India&` +
                    `format=json&limit=5&addressdetails=1&countrycodes=in`
                );
                
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                
                const results = await response.json();
                console.log('Nominatim results:', results);
                
                if (results.length > 0) {
                    const result = results[0];
                    return {
                        name: result.display_name,
                        coordinates: [parseFloat(result.lat), parseFloat(result.lon)]
                    };
                }
                return null;
            } catch (error) {
                console.error('Search error:', error);
                return null;
            }
        };

        const performSearch = async () => {
            const query = searchInput.value.trim();
            console.log('Performing search for:', query);
            
            if (!query) {
                alert('Please enter an area name to search');
                return;
            }

            // Show loading state
            searchBtn.textContent = 'Searching...';
            searchBtn.disabled = true;

            try {
                const result = await searchArea(query);
                
                if (result) {
                    console.log('Found location:', result);
                    this.map.setView(result.coordinates, 15);
                    this.addSearchMarker(result.coordinates, result.name);
                    searchInput.value = '';
                } else {
                    console.log('No results found for:', query);
                    alert(`Area "${query}" not found. Try searching for a different area name.`);
                }
            } catch (error) {
                console.error('Search failed:', error);
                alert('Search failed. Please try again.');
            } finally {
                // Reset button state
                searchBtn.textContent = 'Search';
                searchBtn.disabled = false;
            }
        };

        // Search button click
        if (searchBtn) {
            searchBtn.addEventListener('click', performSearch);
            console.log('Search button event listener added');
        } else {
            console.error('Search button not found!');
        }

        // Enter key press
        if (searchInput) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    performSearch();
                }
            });
            console.log('Search input event listener added');
        } else {
            console.error('Search input not found!');
        }
    }

    /**
     * Add a marker for the searched location
     * @param {Array} coordinates - [lat, lng]
     * @param {string} areaName - Name of the area
     */
    addSearchMarker(coordinates, areaName) {
        // Remove previous search marker
        if (this.searchMarker) {
            this.map.removeLayer(this.searchMarker);
        }

        // Create new marker
        this.searchMarker = L.marker(coordinates).addTo(this.map);
        
        // Add popup with area name
        this.searchMarker.bindPopup(`
            <div style="text-align: center;">
                <strong>📍 ${areaName.charAt(0).toUpperCase() + areaName.slice(1)}</strong>
                <br>
                <small>Searched location</small>
            </div>
        `).openPopup();

        // Auto-close popup after 3 seconds
        setTimeout(() => {
            if (this.searchMarker) {
                this.searchMarker.closePopup();
            }
        }, 3000);
    }

    /**
     * Show road details in info panel
     * @param {Object} road - Road object
     */
    showRoadDetails(road) {
        const panel = document.getElementById('info-panel');
        const content = document.getElementById('info-content');

        const tender = road.tenderDetails || {};

        const html = `
            <div class="road-header">
                <h2 class="road-name">${road.name}</h2>
                <p class="road-id">ID: ${road.id}</p>
            </div>

            <div class="detail-section">
                <h3 class="section-title">Tender Information</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Tender ID</span>
                        <span class="detail-value">${tender.tenderId || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Project Cost</span>
                        <span class="detail-value cost">${dataLoader.formatCurrency(tender.cost)}</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3 class="section-title">Contractor Details</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Contractor Name</span>
                        <span class="detail-value">${tender.contractor || 'N/A'}</span>
                    </div>
                </div>
            </div>

            <div class="detail-section">
                <h3 class="section-title">Project Timeline</h3>
                <div class="detail-grid">
                    <div class="detail-item">
                        <span class="detail-label">Build Date</span>
                        <span class="detail-value">${dataLoader.formatDate(tender.buildDate)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Completion Date</span>
                        <span class="detail-value">${dataLoader.formatDate(tender.completionDate)}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Duration</span>
                        <span class="detail-value">${tender.projectDuration || 'N/A'}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Road Length</span>
                        <span class="detail-value">${tender.roadLength || 'N/A'}</span>
                    </div>
                </div>
            </div>

            ${tender.description ? `
            <div class="detail-section">
                <h3 class="section-title">Description</h3>
                <p class="description-text">${tender.description}</p>
            </div>
            ` : ''}
        `;

        content.innerHTML = html;
        panel.classList.remove('hidden');
    }

    /**
     * Show welcome message when no data is available
     */
    showWelcomeMessage() {
        const panel = document.getElementById('info-panel');
        const content = document.getElementById('info-content');

        content.innerHTML = `
            <div class="road-header">
                <h2 class="road-name">Welcome!</h2>
            </div>
            <div class="detail-section">
                <p class="description-text">
                    This is the Bengaluru Road Transparency Map. To get started, add road data to the 
                    <code>data/roads.json</code> file following the format in the README.
                </p>
                <p class="description-text" style="margin-top: 1rem;">
                    This is an open-source project. Visit our GitHub repository to learn how to contribute 
                    road and tender data.
                </p>
            </div>
        `;

        panel.classList.remove('hidden');
    }

    /**
     * Update statistics in header
     */
    updateStats() {
        const stats = dataLoader.getStats();
        const statsElement = document.getElementById('road-count');
        
        if (stats.totalRoads === 0) {
            statsElement.textContent = 'No roads loaded yet';
        } else {
            statsElement.textContent = `${stats.totalRoads} roads tracked | ${stats.contractors} contractors | Total: ${dataLoader.formatCurrency(stats.totalCost)}`;
        }
    }

    /**
     * Setup event listeners for UI interactions
     */
    setupEventListeners() {
        // Close button
        document.getElementById('close-btn').addEventListener('click', () => {
            document.getElementById('info-panel').classList.add('hidden');
            
            // Reset highlight
            if (this.currentHighlight) {
                this.currentHighlight.setStyle({
                    color: '#2563eb',
                    weight: 4,
                    opacity: 0.7
                });
                this.currentHighlight = null;
            }
        });

        // Contribute link
        document.getElementById('contribute-link').addEventListener('click', (e) => {
            e.preventDefault();
            alert('To contribute data, please visit our GitHub repository and follow the contribution guidelines in the README.');
        });

        // Search functionality
        this.setupSearch();
    }
}

// Initialize map when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new BengaluruRoadMap();
});


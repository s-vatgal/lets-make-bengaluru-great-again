# 🏗️ Bengaluru Road Transparency Map

An open-source interactive map showing Bengaluru road construction details, contractor information, and tender data. This project aims to bring transparency to public infrastructure projects and enable citizens to track road development in their city.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-active-success.svg)

## 🌟 Features

- **Interactive Map**: Click on highlighted roads to view detailed information
- **Comprehensive Data**: View contractor details, construction dates, costs, and tender information
- **Modern UI**: Clean, responsive design that works on desktop and mobile devices
- **Open Source**: Fully transparent codebase that anyone can contribute to
- **Easy to Update**: Simple JSON-based data structure for adding new roads
- **No Backend Required**: Static site that can be hosted on GitHub Pages

## 🚀 Quick Start

### View the Project

1. Clone this repository:
```bash
git clone https://github.com/YOUR_USERNAME/lets-make-bengaluru-great-again.git
cd lets-make-bengaluru-great-again
```

2. Open `index.html` in your web browser, or serve with a local server:
```bash
# Using Python 3
python -m http.server 8000

# Using Node.js (if you have http-server installed)
npx http-server

# Using PHP
php -S localhost:8000
```

3. Visit `http://localhost:8000` in your browser

### Deploy to GitHub Pages

1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select "main" branch and "/" (root) as source
4. Your site will be live at `https://YOUR_USERNAME.github.io/lets-make-bengaluru-great-again/`

## 📊 Adding Road Data

### Data Format

Road data is stored in `data/roads.json`. Each road follows this structure:

```json
{
  "id": "unique-road-id",
  "name": "Road Name",
  "geometry": {
    "type": "LineString",
    "coordinates": [
      [latitude, longitude],
      [latitude, longitude]
    ]
  },
  "tenderDetails": {
    "tenderId": "TENDER-ID",
    "contractor": "Company Name",
    "buildDate": "YYYY-MM-DD",
    "completionDate": "YYYY-MM-DD",
    "cost": "amount_in_rupees",
    "projectDuration": "6 months",
    "roadLength": "2.5 km",
    "description": "Detailed description"
  }
}
```

### How to Add New Roads

1. **Get Road Coordinates**: 
   - Use Google Maps or OpenStreetMap
   - Click along the road to get latitude/longitude points
   - Add at least 3-5 points for accurate representation

2. **Collect Tender Information**:
   - Tender ID from official documents
   - Contractor name
   - Project dates and duration
   - Total project cost
   - Any additional relevant details

3. **Add to JSON**:
   - Open `data/roads.json`
   - Add your road object to the "roads" array
   - Ensure all JSON syntax is valid (use a JSON validator)

4. **Test**:
   - Refresh the map in your browser
   - Click on the new road to verify details appear correctly

### Example Workflow

```bash
# Edit the data file
nano data/roads.json

# Validate JSON (optional)
cat data/roads.json | python -m json.tool

# Commit your changes
git add data/roads.json
git commit -m "Add data for Hosur Road section"
git push origin main
```

## 🎨 Project Structure

```
/
├── index.html              # Main HTML page
├── css/
│   └── styles.css         # All styles and responsive design
├── js/
│   ├── map.js             # Map initialization and interactions
│   └── data-loader.js     # Data loading and formatting utilities
├── data/
│   └── roads.json         # Road and tender data
├── README.md              # This file
└── LICENSE                # MIT License
```

## 🛠️ Technology Stack

- **Leaflet.js**: Open-source mapping library
- **OpenStreetMap**: Free, open-source map tiles
- **Vanilla JavaScript**: No frameworks, pure ES6+
- **CSS3**: Modern responsive design
- **JSON**: Simple data storage format

## 🤝 Contributing

We welcome contributions from everyone! Here's how you can help:

### Ways to Contribute

1. **Add Road Data**: Collect and submit tender information for roads
2. **Improve UI/UX**: Enhance the design and user experience
3. **Add Features**: Implement search, filters, or data export functionality
4. **Fix Bugs**: Report or fix issues you find
5. **Documentation**: Improve guides and documentation
6. **Spread the Word**: Share this project with others

### Contribution Guidelines

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/your-feature-name`
3. **Make your changes**: Follow existing code style
4. **Test thoroughly**: Ensure everything works
5. **Commit with clear messages**: `git commit -m "feat: add search functionality"`
6. **Push to your fork**: `git push origin feature/your-feature-name`
7. **Open a Pull Request**: Describe your changes clearly

### Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing formatting (2-space indentation)
- Write clean, readable code
- Test on both desktop and mobile

### Data Quality Guidelines

- Verify all information from official sources
- Include source/reference where possible
- Use accurate coordinates
- Format dates as YYYY-MM-DD
- Costs should be in Indian Rupees (numbers only)

## 📝 Data Sources

Recommended sources for collecting road and tender data:

- **BBMP Portal**: Official Bruhat Bengaluru Mahanagara Palike website
- **Karnataka e-Procurement**: Government tender portal
- **RTI Requests**: Right to Information applications
- **Public Documents**: Municipal corporation records
- **News Reports**: Verified media coverage

**Important**: Always verify data accuracy and cite sources when possible.

## 🔒 Privacy & Ethics

- This project displays only public information
- Do not include personal information of individuals
- Verify all data before submission
- Respect copyright and licensing of source materials
- Focus on transparency and public accountability

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### What This Means

- ✅ You can use this project for any purpose
- ✅ You can modify and distribute it
- ✅ You can use it commercially
- ✅ You must include the original copyright notice
- ❌ No warranty is provided

## 🙏 Acknowledgments

- **OpenStreetMap Contributors**: For providing free map data
- **Leaflet.js Team**: For the excellent mapping library
- **Contributors**: Everyone who adds data and improves the project
- **Citizens of Bengaluru**: The inspiration for this project

## 📧 Contact & Support

- **Issues**: Report bugs or request features via [GitHub Issues](https://github.com/YOUR_USERNAME/lets-make-bengaluru-great-again/issues)
- **Discussions**: Join conversations in [GitHub Discussions](https://github.com/YOUR_USERNAME/lets-make-bengaluru-great-again/discussions)
- **Pull Requests**: Submit improvements via Pull Requests

## 🗺️ Roadmap

### Current Features (v1.0)
- ✅ Interactive map with road overlays
- ✅ Click-to-view road details
- ✅ Responsive design
- ✅ Sample data

### Planned Features (v2.0)
- 🔲 Search functionality (find roads, contractors)
- 🔲 Advanced filters (by date, cost, contractor)
- 🔲 Data export (CSV, JSON)
- 🔲 User authentication for data submission
- 🔲 Admin panel for data management
- 🔲 Historical data and comparisons
- 🔲 Integration with government APIs

## ⭐ Support This Project

If you find this project useful:
- ⭐ Star this repository
- 🐛 Report bugs and issues
- 💡 Suggest new features
- 📝 Contribute data or code
- 📢 Share with others

---

**Made with ❤️ for Bengaluru** | [Report an Issue](https://github.com/YOUR_USERNAME/lets-make-bengaluru-great-again/issues) | [Contribute](https://github.com/YOUR_USERNAME/lets-make-bengaluru-great-again/pulls)


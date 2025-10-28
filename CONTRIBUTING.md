# Contributing to Bengaluru Road Transparency Map

Thank you for your interest in contributing! This document provides guidelines and instructions for contributing to this open-source project.

## 🌟 Ways to Contribute

### 1. Add Road Data
The most valuable contribution is adding accurate road and tender data.

**Steps:**
1. Collect road information from official sources (BBMP, tender portals, RTI requests)
2. Get accurate road coordinates (use Google Maps or OpenStreetMap)
3. Format data according to our JSON schema
4. Submit via Pull Request

**Data Requirements:**
- Verified from official sources
- Accurate geographic coordinates
- Complete tender information
- Proper date formatting (YYYY-MM-DD)
- Costs in Indian Rupees (numeric values only)

### 2. Report Bugs
Found an issue? Let us know!

**Steps:**
1. Check if the issue already exists in [Issues](https://github.com/YOUR_USERNAME/lets-make-bengaluru-great-again/issues)
2. Create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Browser/device information

### 3. Suggest Features
Have an idea to improve the project?

**Steps:**
1. Check existing feature requests
2. Create a new issue with tag `enhancement`
3. Describe the feature and its benefits
4. Provide examples or mockups if possible

### 4. Code Contributions
Improve the codebase with new features or fixes.

**Areas for Contribution:**
- Search functionality
- Data filtering and sorting
- Mobile experience improvements
- Performance optimizations
- Accessibility enhancements
- UI/UX improvements

## 🚀 Getting Started

### Prerequisites
- Git installed on your computer
- Text editor (VS Code, Sublime, etc.)
- Web browser for testing
- Basic knowledge of HTML/CSS/JavaScript

### Setup Development Environment

1. **Fork the repository**
   - Click "Fork" button on GitHub
   - This creates your own copy

2. **Clone your fork**
```bash
git clone https://github.com/YOUR-USERNAME/lets-make-bengaluru-great-again.git
cd lets-make-bengaluru-great-again
```

3. **Add upstream remote**
```bash
git remote add upstream https://github.com/ORIGINAL-OWNER/lets-make-bengaluru-great-again.git
```

4. **Create a branch**
```bash
git checkout -b feature/your-feature-name
```

5. **Make your changes**
   - Edit files as needed
   - Test thoroughly

6. **Commit your changes**
```bash
git add .
git commit -m "feat: add your feature description"
```

7. **Push to your fork**
```bash
git push origin feature/your-feature-name
```

8. **Create Pull Request**
   - Go to your fork on GitHub
   - Click "Pull Request" button
   - Fill in description and submit

## 📝 Code Style Guidelines

### JavaScript
- Use ES6+ features (const, let, arrow functions)
- Use meaningful variable names
- Add comments for complex logic
- Use async/await for asynchronous code
- Include JSDoc comments for functions

Example:
```javascript
/**
 * Load road data from JSON file
 * @returns {Promise<Array>} Array of road objects
 */
async loadRoadData() {
    // Implementation
}
```

### HTML
- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Keep structure clean and readable
- Use consistent indentation (2 spaces)

### CSS
- Use CSS custom properties (variables)
- Mobile-first responsive design
- Consistent naming conventions
- Group related styles together
- Add comments for complex sections

### JSON Data
- Validate JSON syntax before committing
- Use consistent formatting (2-space indentation)
- Include all required fields
- Use ISO date format (YYYY-MM-DD)
- Keep descriptions clear and concise

## 🧪 Testing Guidelines

Before submitting a Pull Request:

1. **Manual Testing**
   - Test on multiple browsers (Chrome, Firefox, Safari)
   - Test on mobile devices (or responsive mode)
   - Verify all links work
   - Check console for errors

2. **Data Validation**
   - Validate JSON syntax
   - Verify coordinates are accurate
   - Check all dates are properly formatted
   - Ensure no sensitive personal data

3. **Visual Testing**
   - Check responsive design
   - Verify colors and contrast
   - Test hover and click interactions
   - Ensure readability

## 📋 Commit Message Guidelines

Use conventional commit format:

- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting)
- `refactor:` Code refactoring
- `test:` Adding tests
- `chore:` Maintenance tasks

Examples:
```
feat: add search functionality for roads
fix: correct coordinate parsing in data loader
docs: update README with new features
style: improve mobile responsive design
```

## 🔍 Pull Request Process

1. **Before Submitting**
   - Ensure code follows style guidelines
   - Test thoroughly on multiple devices
   - Update documentation if needed
   - Make sure all files are included

2. **PR Description Should Include**
   - Clear title describing the change
   - Detailed description of what was changed
   - Screenshots for UI changes
   - Related issue numbers (if applicable)
   - Testing steps

3. **Review Process**
   - Maintainers will review your PR
   - Address any requested changes
   - Once approved, PR will be merged
   - Your contribution will be credited

## 🎯 Data Contribution Workflow

Special workflow for adding road data:

1. **Prepare Data**
   - Collect official tender documents
   - Verify all information
   - Get accurate coordinates

2. **Format JSON**
```json
{
  "id": "unique-id",
  "name": "Road Name",
  "geometry": {
    "type": "LineString",
    "coordinates": [[lat, lng], [lat, lng]]
  },
  "tenderDetails": {
    "tenderId": "TENDER-ID",
    "contractor": "Contractor Name",
    "buildDate": "2024-01-15",
    "completionDate": "2024-06-30",
    "cost": "50000000",
    "projectDuration": "6 months",
    "roadLength": "2.5 km",
    "description": "Project description"
  }
}
```

3. **Submit**
   - Add to `data/roads.json`
   - Include source reference in PR description
   - Test locally before submitting

## 🤔 Questions?

- Check existing [Issues](https://github.com/YOUR_USERNAME/lets-make-bengaluru-great-again/issues)
- Start a [Discussion](https://github.com/YOUR_USERNAME/lets-make-bengaluru-great-again/discussions)
- Review the [README](README.md)

## 📜 Code of Conduct

### Our Standards

- Be respectful and inclusive
- Welcome diverse perspectives
- Focus on what's best for the community
- Show empathy towards others
- Accept constructive criticism gracefully

### Unacceptable Behavior

- Harassment or discrimination
- Trolling or insulting comments
- Personal or political attacks
- Publishing others' private information
- Other unprofessional conduct

## 🙏 Recognition

All contributors will be:
- Listed in project contributors
- Credited in release notes
- Appreciated in the community

Thank you for making Bengaluru's infrastructure more transparent! 🎉


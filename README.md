# Scrambled Legs

Official website for Scrambled Legs, featuring the famous Hot Dog Counter.

## Development

This project was built with React and uses React Router for navigation.

### Installation

```bash
npm install
```

### Running Locally

```bash
npm start
```

### Building for Production

```bash
npm run build
```

The build folder will contain the static files that can be deployed to any web server or GitHub Pages.

## Project Structure

- `/public` - Static assets and HTML template
- `/src` - Source code
  - `/components` - Reusable React components
  - `/pages` - Page components for each route
  - `App.js` - Main application component with routing
  - `index.js` - Entry point

## Deployment

The site is configured to be deployed to GitHub Pages with the custom domain `thescrambledlegs.com` directly from the main branch.

### GitHub Pages Deployment

This project is set up for GitHub Pages deployment from the main branch:

1. Build the project: `npm run build`
2. The `build` directory contains all static files needed for deployment
3. Commit all files including the build directory to the main branch
4. In your GitHub repository, go to Settings > Pages:
   - Set the branch to `main`
   - Set the folder to `/docs` or `/` (root) depending on your GitHub Pages configuration

A GitHub Actions workflow has been set up to automatically build and deploy your site when you push changes to the main branch. This is configured in the `.github/workflows/deploy.yml` file.

### Custom Domain Setup

1. In your GitHub repository, go to Settings > Pages
2. Under "Custom domain", add `thescrambledlegs.com`
3. Ensure your DNS provider has the following records:
   - A records pointing to GitHub Pages IP addresses (currently 185.199.108.153, 185.199.109.153, 185.199.110.153, 185.199.111.153)
   - CNAME record for www subdomain pointing to `<username>.github.io`
4. Check "Enforce HTTPS" to enable SSL

### Handling Client-Side Routing

Since this app uses React Router, you'll need a `404.html` file to handle client-side routing on GitHub Pages. This is automatically set up in the build process.

## Features

- Hot Dog Counter with Firebase backend
- Responsive design
- Modern UI/UX
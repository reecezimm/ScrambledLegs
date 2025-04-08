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

The site is configured to be deployed to GitHub Pages with the custom domain `thescrambledlegs.com`.

### Automated Deployment with GitHub Actions

This project uses GitHub Actions for automated deployment to GitHub Pages. The workflow:

1. Automatically runs when you push to the main branch
2. Builds the React app
3. Deploys the built files to the gh-pages branch
4. GitHub Pages serves the site from the gh-pages branch

For this to work, you need to:

1. Configure GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Set the "Source" to "Deploy from a branch"
   - Select "gh-pages" branch and "/" (root) folder
   - Ensure your custom domain is configured correctly

2. Set proper permissions for GitHub Actions:
   - Go to Settings > Actions > General
   - Under "Workflow permissions", select "Read and write permissions"

### Manual Deployment

If you need to deploy manually:

1. Run the included deployment script: `./deploy.sh`
2. This will build the app and push to the gh-pages branch

### Troubleshooting Deployment

If your changes aren't appearing on the site:

1. Check the Actions tab to ensure the workflow ran successfully
2. Try clearing your browser cache
3. Make sure your browser isn't serving a cached version of the site
4. Ensure GitHub Pages is configured to serve from the gh-pages branch

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
# Guide for Claude

## Project Overview
This is the Scrambled Legs website featuring a Hot Dog Counter, built with React and Firebase.

## Key File Paths
- `/public/` - Static assets and production build
- `/src/` - Source code
  - `/components/` - Reusable components (Footer, HotDogButton, NotificationButton, etc.)
  - `/pages/` - Page components (Home, AdminPage, HotDogCounter)
  - `/services/` - Firebase configuration and services
  - `App.js` - Main application with routing
  - `index.js` - Entry point

## Common Tasks
- Run development server: `npm start`
- Build for production: `npm run build`
- Deploy to GitHub Pages: `./deploy.sh`

## Project Architecture
- Frontend: React with React Router
- Backend: Firebase (authentication, database, hosting)
- Key features: Hot Dog Counter, notifications

## Best Practices
- Component-based architecture
- Firebase for data persistence
- Mobile-first responsive design
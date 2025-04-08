import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

// Create a unique build ID for the application 
// Format: environment-timestamp (e.g., "production-20250408123456")
const BUILD_ID = `${process.env.NODE_ENV}-${new Date().toISOString().replace(/[:.]/g, '')}`;
console.log(`Application starting with build ID: ${BUILD_ID}`);

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
  }
  
  html {
    height: -webkit-fill-available;
  }
  
  body {
    font-family: 'Inter', sans-serif;
    background-color: #2c3539;
    position: relative;
    overflow-x: hidden;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    touch-action: manipulation;
    -webkit-overflow-scrolling: touch; /* Smoother scrolling on iOS */
  }
`;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <App />
  </React.StrictMode>
);

// Register service worker for PWA capabilities with improved cache management
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Add cache-busting query parameter to service worker URL
    const swUrl = `/service-worker.js?v=${new Date().getTime()}`;
    
    // Check if there's an existing service worker to update
    navigator.serviceWorker.getRegistration().then(registration => {
      if (registration) {
        // Force update check if service worker exists
        console.log('Updating existing service worker...');
        registration.update();
      }
      
      // Register/update service worker with cache-busting URL
      setTimeout(() => {
        navigator.serviceWorker.register(swUrl)
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
            
            // Check for updates regularly
            setInterval(() => {
              console.log('Checking for service worker updates...');
              registration.update();
            }, 60 * 60 * 1000); // Check hourly
            
            // Add an update listener
            registration.addEventListener('updatefound', () => {
              console.log('Service worker update found!');
              
              // Get the installing service worker
              const newWorker = registration.installing;
              
              // Listen for state changes
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  console.log('New service worker installed and ready for use!');
                  
                  // Optionally notify the user about new content and invite them to refresh
                  if (window.confirm('New content is available! Click OK to refresh.')) {
                    window.location.reload();
                  }
                }
              });
            });
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      }, 1000);
    });
    
    // Handle service worker updates more aggressively
    // Force reload when a new service worker takes control
    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        console.log('New service worker controller, refreshing page...');
        refreshing = true;
        window.location.reload();
      }
    });
  });
  
  // Log when the beforeinstallprompt event is fired
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('Install prompt event fired!');
    // Store the event for later use
    window.deferredPrompt = e;
    
    // Optionally show your own install button here
    // (This is where you could make a custom install UI visible)
  });
  
  // Log successful installations
  window.addEventListener('appinstalled', (evt) => {
    console.log('App was installed successfully!');
  });
  
  // Clear caches on page load to ensure fresh content
  const clearOldCaches = async () => {
    try {
      console.log(`[PWA] Build ID: ${BUILD_ID}`);
      console.log('[PWA] Checking for outdated caches...');
      
      const cacheKeys = await caches.keys();
      for (const cacheKey of cacheKeys) {
        // Only clear caches for our app, based on prefix
        if (cacheKey.startsWith('scrambled-legs-v')) {
          // Get cache timestamp from name
          const cacheParts = cacheKey.split('-');
          const cacheTimestamp = parseInt(cacheParts[cacheParts.length - 1] || '0');
          
          // If the cache is older than 1 day or if we can't determine the age, delete it
          if (!cacheTimestamp || (Date.now() - cacheTimestamp > 24 * 60 * 60 * 1000)) {
            console.log('[PWA] Clearing old cache:', cacheKey);
            await caches.delete(cacheKey);
          }
        }
      }
      
      // Force reload if running in PWA mode (standalone or fullscreen)
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.matchMedia('(display-mode: fullscreen)').matches) {
        // Add a refresh button for PWA users
        const addRefreshButton = () => {
          // Only add if it doesn't already exist
          if (!document.getElementById('pwa-refresh-button')) {
            const refreshButton = document.createElement('button');
            refreshButton.id = 'pwa-refresh-button';
            refreshButton.innerHTML = '↻ Refresh';
            refreshButton.style.position = 'fixed';
            refreshButton.style.bottom = '10px';
            refreshButton.style.right = '10px';
            refreshButton.style.zIndex = '9999';
            refreshButton.style.padding = '8px 12px';
            refreshButton.style.backgroundColor = '#FF8800';
            refreshButton.style.color = 'white';
            refreshButton.style.border = 'none';
            refreshButton.style.borderRadius = '4px';
            refreshButton.style.cursor = 'pointer';
            refreshButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
            
            refreshButton.addEventListener('click', () => {
              console.log('[PWA] Manual refresh triggered');
              window.location.reload();
            });
            
            document.body.appendChild(refreshButton);
          }
        };
        
        // Add the button after a short delay to ensure body is available
        setTimeout(addRefreshButton, 1000);
      }
    } catch (error) {
      console.error('[PWA] Error clearing caches:', error);
    }
  };
  
  // Force unregister all service workers in case of errors
  const forceCleanServiceWorkers = async () => {
    if ('serviceWorker' in navigator) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        let unregisteredAny = false;
        
        // Check the URL for a force refresh parameter
        const urlParams = new URLSearchParams(window.location.search);
        const forceRefresh = urlParams.get('refresh');
        
        for (const registration of registrations) {
          // Force unregister if the refresh parameter is set
          if (forceRefresh === 'true' || forceRefresh === '1') {
            console.log('[PWA] Force unregistering service worker due to refresh parameter');
            await registration.unregister();
            unregisteredAny = true;
          }
        }
        
        // Reload if we unregistered any service workers
        if (unregisteredAny) {
          window.location.reload();
        }
      } catch (error) {
        console.error('[PWA] Error checking service workers:', error);
      }
    }
  };
  
  // Run cleanup on load
  clearOldCaches();
  forceCleanServiceWorkers();
}
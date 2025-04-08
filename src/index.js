import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createGlobalStyle } from 'styled-components';

// Create unique IDs for the application
// Format: environment-timestamp (e.g., "production-20250408123456")
const BUILD_ID = `${process.env.NODE_ENV}-${new Date().toISOString().replace(/[:.]/g, '')}`;
const BUILD_TIMESTAMP = new Date().getTime();

// Log startup information
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
  // Flag to track if we've already shown the update prompt
  // Store in sessionStorage to persist across page refreshes
  const hasShownUpdatePrompt = sessionStorage.getItem('hasShownUpdatePrompt') === 'true';
  // Flag to track if we're already refreshing
  let isRefreshing = false;
  
  window.addEventListener('load', () => {
    console.log('[PWA] Starting with build ID:', BUILD_ID);
    console.log('[PWA] Update prompt already shown:', hasShownUpdatePrompt);
    
    // Check if we came from a refresh prompt - if so, don't show again
    if (sessionStorage.getItem('justRefreshed') === 'true') {
      console.log('[PWA] Just refreshed from update prompt, not showing again');
      sessionStorage.removeItem('justRefreshed');
      sessionStorage.setItem('hasShownUpdatePrompt', 'true');
    }
    
    // Add a version timestamp as a query parameter for cache busting
    const swUrl = `/service-worker.js?v=${BUILD_ID}`;
    
    // Register the service worker with the cache-busting URL
    setTimeout(() => {
      navigator.serviceWorker.register(swUrl)
        .then(registration => {
          console.log('[PWA] Service Worker registered with scope:', registration.scope);
          
          // Only check for updates every 30 minutes (not continuously)
          const THIRTY_MINUTES = 30 * 60 * 1000;
          setInterval(() => {
            console.log('[PWA] Scheduled update check');
            registration.update().catch(err => {
              console.error('[PWA] Update check failed:', err);
            });
          }, THIRTY_MINUTES);
          
          // Only listen for update events if we haven't shown the prompt yet
          if (!hasShownUpdatePrompt) {
            // Add an update listener
            registration.addEventListener('updatefound', () => {
              console.log('[PWA] Service worker update found');
              
              // Get the installing service worker
              const newWorker = registration.installing;
              
              // Listen for state changes
              newWorker.addEventListener('statechange', () => {
                // Only show the prompt if we haven't already and the new worker is installed
                if (newWorker.state === 'installed' && 
                    navigator.serviceWorker.controller && 
                    !hasShownUpdatePrompt) {
                  
                  console.log('[PWA] New service worker installed and ready');
                  sessionStorage.setItem('hasShownUpdatePrompt', 'true');
                  
                  // Show update notification (only once per session)
                  if (window.confirm('New content is available! Click OK to refresh.')) {
                    sessionStorage.setItem('justRefreshed', 'true');
                    window.location.reload();
                  }
                }
              });
            });
          }
        })
        .catch(error => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    }, 1000);
  });
  
  // Handle controllerchange event (avoid multiple refreshes)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!isRefreshing) {
      console.log('[PWA] Service worker controller changed');
      isRefreshing = true;
      
      // Don't automatically refresh - we're using the confirm dialog instead
      // This prevents refresh loops
    }
  });
  
  // Log when the beforeinstallprompt event is fired
  window.addEventListener('beforeinstallprompt', (e) => {
    console.log('[PWA] Install prompt event fired');
    // Store the event for later use
    window.deferredPrompt = e;
  });
  
  // Log successful installations
  window.addEventListener('appinstalled', (evt) => {
    console.log('[PWA] App was installed successfully');
  });
  
  // Add refresh button in PWA mode (standalone or fullscreen)
  const addRefreshButtonInPWAMode = () => {
    try {
      // Only add button in PWA mode
      if (window.matchMedia('(display-mode: standalone)').matches || 
          window.matchMedia('(display-mode: fullscreen)').matches) {
          
        // Check if the button already exists
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
          
          // Force a complete reset when clicked
          refreshButton.addEventListener('click', () => {
            console.log('[PWA] Manual refresh button clicked');
            // Add a timestamp to avoid cache
            window.location.href = '/?refresh=true&t=' + Date.now();
          });
          
          // Add button to the document body
          setTimeout(() => {
            document.body.appendChild(refreshButton);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('[PWA] Error adding refresh button:', error);
    }
  };
  
  // Clear old caches on startup
  const clearOldCaches = async () => {
    try {
      const ONE_DAY = 24 * 60 * 60 * 1000;
      
      // Only clear caches on a schedule, not every page load
      // Use localStorage to track when we last cleared
      const lastCacheClear = localStorage.getItem('lastCacheClear');
      const now = Date.now();
      
      // Check if we've cleared in the last day
      if (lastCacheClear && (now - parseInt(lastCacheClear) < ONE_DAY)) {
        console.log('[PWA] Cache was cleared recently, skipping cleanup');
        return;
      }
      
      console.log('[PWA] Checking for outdated caches...');
      const cacheKeys = await caches.keys();
      
      let deleteCount = 0;
      for (const cacheKey of cacheKeys) {
        // Only clear old caches, not the current one
        if (cacheKey.startsWith('scrambled-legs-v') && 
            !cacheKey.includes(BUILD_TIMESTAMP)) {
          console.log('[PWA] Deleting old cache:', cacheKey);
          await caches.delete(cacheKey);
          deleteCount++;
        }
      }
      
      // Save the time we did the cleanup
      if (deleteCount > 0) {
        console.log(`[PWA] Cleared ${deleteCount} old caches`);
      } else {
        console.log('[PWA] No old caches to clear');
      }
      
      localStorage.setItem('lastCacheClear', now.toString());
    } catch (error) {
      console.error('[PWA] Error clearing caches:', error);
    }
  };
  
  // Add the refresh button
  setTimeout(addRefreshButtonInPWAMode, 2000);
  
  // Clear old caches but don't force service worker updates
  clearOldCaches();
}
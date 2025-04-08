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
  // Flag to track service worker behavior, kept in localStorage to persist
  // We use localStorage instead of sessionStorage to persist across browser sessions
  const hasShownUpdatePrompt = localStorage.getItem('hasShownUpdatePrompt') === 'true';
  const serviceWorkerVersion = localStorage.getItem('serviceWorkerVersion') || '0';
  // Flag to prevent repeated refreshes
  let isRefreshing = false;
  
  // Add cache-busting timestamp to ensure fresh service worker
  const swUrl = `/service-worker.js?v=${BUILD_ID}&t=${BUILD_TIMESTAMP}`;
  
  window.addEventListener('load', () => {
    console.log('[PWA] Starting with build ID:', BUILD_ID);
    console.log('[PWA] Service worker version from local storage:', serviceWorkerVersion);
    
    // Flag to check if we're coming back from a refresh
    const isPostRefresh = localStorage.getItem('justRefreshed') === 'true';
    if (isPostRefresh) {
      console.log('[PWA] Just refreshed from update prompt');
      localStorage.removeItem('justRefreshed');
      localStorage.setItem('hasShownUpdatePrompt', 'true');
    }
    
    // Register service worker with a slight delay to ensure page loads
    setTimeout(() => {
      navigator.serviceWorker.register(swUrl)
        .then(registration => {
          console.log('[PWA] Service Worker registered with scope:', registration.scope);
          
          // Check if there's an update available immediately
          registration.update().catch(err => {
            console.log('[PWA] Initial update check failed:', err);
          });
          
          // Set up periodic update checks (hourly)
          const ONE_HOUR = 60 * 60 * 1000;
          setInterval(() => {
            console.log('[PWA] Running scheduled update check');
            registration.update().catch(err => {
              console.log('[PWA] Scheduled update check failed:', err);
            });
          }, ONE_HOUR);
          
          // Check service worker version
          if (navigator.serviceWorker.controller) {
            // Get the service worker version
            const messageChannel = new MessageChannel();
            messageChannel.port1.onmessage = (event) => {
              if (event.data) {
                const swVersion = event.data.version || 'unknown';
                console.log('[PWA] Service worker version:', swVersion);
                
                // Compare with stored version
                if (swVersion !== serviceWorkerVersion) {
                  console.log('[PWA] Service worker version changed:', serviceWorkerVersion, '->', swVersion);
                  localStorage.setItem('serviceWorkerVersion', swVersion);
                  
                  // Only show prompt if we haven't shown it recently and it's not a page refresh
                  if (!hasShownUpdatePrompt && !isPostRefresh) {
                    localStorage.setItem('hasShownUpdatePrompt', 'true');
                    
                    // Show update notification
                    if (window.confirm('Application updated! Reload to use the latest version?')) {
                      localStorage.setItem('justRefreshed', 'true');
                      window.location.reload();
                    }
                  }
                }
              }
            };
            
            // Ask the service worker for its version
            navigator.serviceWorker.controller.postMessage({
              type: 'GET_VERSION'
            }, [messageChannel.port2]);
          }
        })
        .catch(error => {
          console.error('[PWA] Service Worker registration failed:', error);
        });
    }, 1500);
  });
  
  // Handle controllerchange event (when a new service worker takes control)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!isRefreshing) {
      console.log('[PWA] Service worker controller changed');
      isRefreshing = true;
      
      // We don't force reload here - we use the confirmation dialog instead
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
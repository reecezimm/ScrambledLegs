// Service Worker for Scrambled Legs
// Cache-busting version with timestamp
const CACHE_VERSION = '4.0.1'; // Incremented for Response clone fix
const BUILD_TIMESTAMP = new Date().getTime();
const CACHE_NAME = `scrambled-legs-v${CACHE_VERSION}-${BUILD_TIMESTAMP}`;

// Debug info
console.log(`Service worker initializing: ${CACHE_NAME} at ${new Date().toISOString()}`);

// Use this to determine if requests are going through the service worker correctly
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_VERSION,
      timestamp: BUILD_TIMESTAMP,
      cache: CACHE_NAME,
      startTime: new Date().toISOString()
    });
  }
});

// List of files to cache
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',
  '/sw-timestamp.js'
];

// Install event
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing new version');
  
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`[Service Worker] Opened cache: ${CACHE_NAME}`);
        return cache.addAll(urlsToCache);
      })
      .catch(err => {
        console.error('[Service Worker] Cache installation error:', err);
      })
      .then(() => {
        console.log('[Service Worker] Installation complete');
        return self.skipWaiting();
      })
  );
});

// Activate event
self.addEventListener('activate', event => {
  console.log('[Service Worker] Activate event fired');
  
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName !== CACHE_NAME && cacheName.startsWith('scrambled-legs-v')) {
              console.log(`[Service Worker] Deleting old cache: ${cacheName}`);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('[Service Worker] Claiming clients');
        return self.clients.claim();
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  // Ignore non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Clone the request to ensure it's safe to use multiple times
  const requestClone = event.request.clone();
  const requestUrl = new URL(event.request.url);
  
  // Special handling for HTML navigation requests (always try network first, fallback to cache)
  if (event.request.mode === 'navigate' || 
      (event.request.method === 'GET' && 
       event.request.headers.get('accept') && 
       event.request.headers.get('accept').includes('text/html'))) {
    
    event.respondWith(
      fetch(requestClone)
        .then(response => {
          return response;
        })
        .catch(() => {
          console.log('[Service Worker] Fetch failed, returning cached page instead');
          return caches.match('/index.html');
        })
    );
    return;
  }
  
  // For all other requests - Stale While Revalidate strategy
  event.respondWith(
    // First try to get from cache
    caches.match(requestClone)
      .then(cachedResponse => {
        // Return cached response immediately if available
        const networkFetch = fetch(event.request.clone())
          .then(networkResponse => {
            // Don't cache bad responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            try {
              // IMPORTANT: Clone the response BEFORE using it
              const responseToCache = networkResponse.clone();
              
              // Update the cache asynchronously (don't block the response)
              caches.open(CACHE_NAME)
                .then(cache => {
                  try {
                    // Store the new response
                    cache.put(event.request, responseToCache);
                  } catch (e) {
                    console.error('[Service Worker] Failed to update cache:', e);
                  }
                })
                .catch(e => {
                  console.error('[Service Worker] Failed to open cache:', e);
                });
                
              return networkResponse;
            } catch (e) {
              console.error('[Service Worker] Error handling response:', e);
              return networkResponse;
            }
          })
          .catch(error => {
            console.log('[Service Worker] Fetch failed:', error);
            return cachedResponse;
          });
          
        return cachedResponse || networkFetch;
      })
  );
});
// Service Worker for Scrambled Legs
// Cache-busting version with timestamp
const CACHE_VERSION = '3'; // Increment this when making changes to the service worker
const BUILD_TIMESTAMP = new Date().getTime();
const CACHE_NAME = `scrambled-legs-v${CACHE_VERSION}-${BUILD_TIMESTAMP}`;

// Debug info
console.log(`Service worker initializing: ${CACHE_NAME}`);

// Use this to determine if requests are going through the service worker correctly
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'GET_VERSION') {
    event.ports[0].postMessage({
      version: CACHE_VERSION,
      timestamp: BUILD_TIMESTAMP,
      cache: CACHE_NAME
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
  '/sw-timestamp.js',
  // Include JavaScript bundles created by React build
  // Note: Create React App builds output files with hashed names like main.abc123.js
  // The exact pattern depends on the build configuration, so we use general patterns
  // The actual cache handling is done in the fetch handler
];

// Function to clean up dynamic resource paths
function cleanupDynamicPaths(cache) {
  return cache.keys().then(function(keys) {
    const deletionPromises = keys.map(function(request) {
      const url = new URL(request.url);
      // If the request is for a dynamic bundle (contains hash) and not in current list
      if (url.pathname.includes('/static/js/main.') || 
          url.pathname.includes('/static/css/main.')) {
        // We'll cache these on-demand, so delete old versions
        return cache.delete(request);
      }
      return Promise.resolve();
    });
    
    return Promise.all(deletionPromises);
  });
}

// Install event
self.addEventListener('install', (event) => {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service worker: Opened cache', CACHE_NAME);
        // Cache static resources
        return cache.addAll(urlsToCache);
      })
      .catch(err => console.log('Error caching static assets:', err))
  );
  
  // Skip waiting to ensure the new service worker activates immediately
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME && cacheName.startsWith('scrambled-legs-')) {
            console.log('Service worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('Service worker: Now controlling all clients');
      return self.clients.claim();
    })
  );
});

// Fetch event with improved caching strategy
self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Get URL and pathname
  const url = new URL(event.request.url);
  const pathname = url.pathname;

  // Special handling for navigation requests (HTML pages)
  if (event.request.mode === 'navigate' || 
      (event.request.method === 'GET' && 
       event.request.headers.get('accept').includes('text/html'))) {
    
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // If offline, serve the index page from cache
          return caches.match('/index.html');
        })
    );
    return;
  }
  
  // For JavaScript and CSS files - network first, then cache
  if (pathname.endsWith('.js') || pathname.endsWith('.css') || 
      pathname.includes('/static/js/') || pathname.includes('/static/css/')) {
    
    event.respondWith(
      fetch(event.request.clone())
        .then(response => {
          // Only cache successful responses
          if (response && response.ok) {
            // Clone the response before using it
            const responseToCache = response.clone();
            
            // Store in cache asynchronously (don't block the response)
            caches.open(CACHE_NAME)
              .then(cache => {
                try {
                  cache.put(event.request, responseToCache);
                } catch (err) {
                  console.error('Cache put error for script/style:', err);
                }
              })
              .catch(err => {
                console.error('Cache open error for script/style:', err);
              });
          }
            
          return response;
        })
        .catch(() => {
          // If network fails, try to get from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // For other assets - stale-while-revalidate strategy
  event.respondWith(
    caches.match(event.request)
      .then(cachedResponse => {
        // Start network fetch
        const fetchPromise = fetch(event.request.clone())
          .then(networkResponse => {
            // Only cache valid responses
            if (networkResponse && networkResponse.ok) {
              // We need to clone the response before consuming it
              const responseToCache = networkResponse.clone();
              
              // Store in cache asynchronously (don't block the response)
              caches.open(CACHE_NAME)
                .then(cache => {
                  try {
                    cache.put(event.request, responseToCache);
                  } catch (err) {
                    console.error('Cache put error:', err);
                  }
                })
                .catch(err => {
                  console.error('Cache open error:', err);
                });
            }
            
            // Return the original response
            return networkResponse;
          })
          .catch(error => {
            console.log('Fetch failed for', event.request.url, error);
            
            // Only return a new Response if we don't have a cached one
            if (!cachedResponse) {
              return new Response('You are offline and this resource is not cached.');
            }
            // If there's a cachedResponse, the outer function will return it
          });
        
        // Return cached response immediately if available, otherwise wait for fetch
        return cachedResponse || fetchPromise;
      })
  );
});
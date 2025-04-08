// Service Worker for Scrambled Legs
// Cache-busting version with timestamp
const CACHE_VERSION = '4.1.0'; // Major version bump after code review
const BUILD_TIMESTAMP = new Date().getTime();
const CACHE_NAME = `scrambled-legs-v${CACHE_VERSION}-${BUILD_TIMESTAMP}`;

// Maximum age for a cache entry (24 hours in milliseconds)
const CACHE_MAX_AGE = 24 * 60 * 60 * 1000;

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

/**
 * Safely adds URLs to the cache, handling possible failures
 * @param {Cache} cache - The cache object
 * @param {string[]} urls - Array of URLs to cache
 * @returns {Promise} - Promise that resolves when caching is complete
 */
const safelyCacheUrls = async (cache, urls) => {
  const failedUrls = [];
  
  // Use Promise.allSettled to handle individual failures
  const results = await Promise.allSettled(
    urls.map(async (url) => {
      try {
        await cache.add(url);
        return url;
      } catch (err) {
        failedUrls.push(url);
        console.error(`[Service Worker] Failed to cache: ${url}`, err);
        return null;
      }
    })
  );
  
  if (failedUrls.length > 0) {
    console.warn(`[Service Worker] Failed to cache ${failedUrls.length} URLs:`, failedUrls);
  }
  
  return results.filter(r => r.status === 'fulfilled').map(r => r.value).filter(Boolean);
};

// Install event
self.addEventListener('install', event => {
  console.log('[Service Worker] Installing new version');
  
  // Perform install steps with improved error handling
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log(`[Service Worker] Opened cache: ${CACHE_NAME}`);
        return safelyCacheUrls(cache, urlsToCache);
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

/**
 * Determine if a URL should be cacheable based on URL and response
 * @param {URL} url - The request URL
 * @param {Response} response - The fetch response 
 * @returns {boolean} - Whether the URL should be cached
 */
const shouldCache = (url, response) => {
  // Check for valid scheme (http/https)
  const isValidScheme = url.protocol === 'https:' || url.protocol === 'http:';
  if (!isValidScheme) return false;
  
  // Check for same domain (avoid caching third-party resources that could change)
  const isSameDomain = url.hostname === self.location.hostname;
  
  // Check for valid response
  const isValidResponse = response && 
                         response.status === 200 && 
                         response.type === 'basic';
  
  // Don't cache query strings except for essential ones
  const hasQueryParams = url.search.length > 0;
  const isEssentialQueryParam = url.search.includes('v=') || 
                               url.search.includes('version=');
  const shouldCacheWithParams = !hasQueryParams || isEssentialQueryParam;
  
  // Only cache same-domain successful responses without query params (unless essential)
  return isValidScheme && isSameDomain && isValidResponse && shouldCacheWithParams;
};

/**
 * Try to put a response in the cache, handling various errors
 * @param {Request} request - The request to use as cache key
 * @param {Response} response - The response to cache
 * @returns {Promise<boolean>} - Whether the operation succeeded
 */
const safeCachePut = async (request, response) => {
  try {
    const cache = await caches.open(CACHE_NAME);
    await cache.put(request, response.clone());
    return true;
  } catch (error) {
    console.error('[Service Worker] Cache put error:', error);
    return false;
  }
};

// Fetch event handler
self.addEventListener('fetch', event => {
  try {
    // Early return for non-GET requests
    if (event.request.method !== 'GET') return;
    
    // Try to parse the URL (will throw for invalid URLs)
    let requestUrl;
    try {
      requestUrl = new URL(event.request.url);
    } catch (error) {
      console.error('[Service Worker] Invalid URL:', event.request.url);
      return; // Let browser handle this request
    }
    
    // Skip non-HTTP(S) URLs (chrome-extension://, file://, etc.)
    if (requestUrl.protocol !== 'https:' && requestUrl.protocol !== 'http:') {
      // Debug log only in development or for unusual schemes
      if (requestUrl.protocol !== 'chrome-extension:') {
        console.log(`[Service Worker] Skipping non-HTTP URL: ${requestUrl.protocol}//${requestUrl.hostname}`);
      }
      return; // Let browser handle these requests normally
    }
    
    // Clone the request to ensure it's safe to use multiple times
    const requestClone = event.request.clone();
    
    // HTML Navigation requests - Network first with cache fallback
    if (event.request.mode === 'navigate' || 
        (event.request.headers.get('accept') && 
         event.request.headers.get('accept').includes('text/html'))) {
      
      event.respondWith(
        fetch(requestClone)
          .then(response => {
            // Cache the navigation response for offline use
            if (shouldCache(requestUrl, response)) {
              const responseToCache = response.clone();
              safeCachePut(requestClone, responseToCache);
            }
            return response;
          })
          .catch(error => {
            console.log('[Service Worker] Navigation fetch failed, using cache:', error);
            return caches.match('/index.html');
          })
      );
      return;
    }
    
    // For all other requests - Stale While Revalidate strategy
    event.respondWith(
      // First check the cache
      caches.match(requestClone)
        .then(cachedResponse => {
          // Start network request in parallel
          const fetchPromise = fetch(requestClone)
            .then(networkResponse => {
              // Only cache if it meets our criteria
              if (shouldCache(requestUrl, networkResponse)) {
                // Clone before using the response
                const responseToCache = networkResponse.clone();
                // Cache asynchronously - don't block the response
                safeCachePut(requestClone, responseToCache);
              }
              return networkResponse;
            })
            .catch(error => {
              console.log('[Service Worker] Fetch failed:', error);
              // Return cached response if available
              return cachedResponse;
            });
            
          // Return cached response right away if available, otherwise wait for network
          return cachedResponse || fetchPromise;
        })
        .catch(error => {
          console.error('[Service Worker] Cache match error:', error);
          // Fallback to network if cache lookup fails
          return fetch(requestClone);
        })
    );
  } catch (error) {
    // Global error handler to prevent service worker from crashing
    console.error('[Service Worker] Uncaught error in fetch handler:', error);
  }
});
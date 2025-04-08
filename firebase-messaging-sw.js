// Firebase Service Worker for background notifications
// Version: 1.2.0 - Fixed for Push Notifications
// This file must be at the root of the domain to receive push notifications properly

// Import the Firebase SDK scripts
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.15.0/firebase-messaging-compat.js');

// Initialize Firebase
firebase.initializeApp({
  apiKey: "AIzaSyAmwwbvmvxNYX-8PesRl8io9CH60sI2v2A", // Correct API key from Firebase console
  authDomain: "fundraiser-f0831.firebaseapp.com",
  databaseURL: "https://fundraiser-f0831-default-rtdb.firebaseio.com",
  projectId: "fundraiser-f0831",
  storageBucket: "fundraiser-f0831.firebasestorage.app",
  messagingSenderId: "900827039889",
  appId: "1:900827039889:web:4bd336cb4f88a0c76e1730",
  vapidKey: "BEsmXUl-hHK0FAmHVdbUeZ3kDbSyhOPId-66fJ5NRJ44XFYy5MujmXiXKBp8MH_7hBmFedktB5y7iF3NOjV86tY"
});

// Initialize messaging
const messaging = firebase.messaging();

// Track service worker version for debugging
self.FIREBASE_SW_VERSION = '1.5.0'; // Updated with correct Firebase config
console.log('[firebase-messaging-sw.js] Version:', self.FIREBASE_SW_VERSION);

// Add a message handler for debugging and checking the service worker state
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'GET_VERSION') {
    if (event.ports && event.ports[0]) {
      event.ports[0].postMessage({
        version: self.FIREBASE_SW_VERSION,
        isActive: true,
        timestamp: Date.now()
      });
    }
  }
});

// Handle background notifications
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  // Customize notification here
  const notificationTitle = payload.notification.title || 'Scrambled Legs';
  const notificationOptions = {
    body: payload.notification.body || 'New message from Scrambled Legs',
    icon: '/android-chrome-192x192.png',
    badge: '/favicon-32x32.png',
    tag: payload.data?.tag || 'scrambled-legs-notification',
    vibrate: [100, 50, 100],
    data: payload.data || {},
    
    // For Android
    actions: [
      {
        action: 'open_app',
        title: 'Open App'
      }
    ],
    
    // For Chrome
    requireInteraction: true,
    
    // For iOS
    timestamp: Date.now()
  };

  // Show notification
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('[firebase-messaging-sw.js] Notification clicked', event);
  
  event.notification.close();
  
  // Get the clicked notification
  const notification = event.notification;
  
  // Handle different clicks
  if (event.action === 'open_app') {
    // User clicked the "Open App" action
    clients.openWindow('/');
  } else {
    // User clicked the notification itself
    clients.openWindow('/');
  }
});
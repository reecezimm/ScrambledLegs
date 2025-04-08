import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, push, update, remove } from 'firebase/database';
import { getMessaging, getToken, onMessage, deleteToken } from 'firebase/messaging';

// Firebase configuration
// IMPORTANT: Use the exact same config as in firebase-messaging-sw.js
const firebaseConfig = {
  apiKey: "AIzaSyANlKWMjOX0Zy6lg1uDcUfZrjp4CfCSBOM",
  authDomain: "fundraiser-f0831.firebaseapp.com",
  databaseURL: "https://fundraiser-f0831-default-rtdb.firebaseio.com/",
  projectId: "fundraiser-f0831",
  storageBucket: "fundraiser-f0831.appspot.com",
  messagingSenderId: "1043794720343",
  appId: "1:1043794720343:web:65a6d4f6e7e09c67e8bfd1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Initialize messaging if browser supports it
let messaging = null;
try {
  // Check for service worker support
  if ('serviceWorker' in navigator) {
    messaging = getMessaging(app);
    console.log('Firebase messaging initialized');
  } else {
    console.log('Service Workers not supported in this browser');
  }
} catch (error) {
  console.error('Error initializing Firebase messaging:', error);
}

// VAPID key for web push notifications
const VAPID_KEY = "BEsmXUl-hHK0FAmHVdbUeZ3kDbSyhOPId-66fJ5NRJ44XFYy5MujmXiXKBp8MH_7hBmFedktB5y7iF3NOjV86tY";

/**
 * Request permission and register for push notifications
 * @returns {Promise<string|null>} FCM token or null if not supported/allowed
 */
export const requestNotificationPermission = async () => {
  // Check if messaging is supported in this browser
  if (!messaging) {
    console.error('Firebase messaging is not supported in this browser');
    return null;
  }
  
  try {
    // Check if notification permission is granted
    let permission = Notification.permission;
    console.log('Current notification permission:', permission);
    
    // Request permission if not already granted
    if (permission !== 'granted') {
      console.log('Requesting notification permission...');
      permission = await Notification.requestPermission();
      console.log('Permission response:', permission);
    }
    
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // Check if service worker is registered
    let serviceWorkerRegistration = null;
    try {
      serviceWorkerRegistration = await navigator.serviceWorker.getRegistration();
      if (!serviceWorkerRegistration) {
        console.log('No service worker registration found. Waiting for service worker.');
        // Wait for service worker registration
        await new Promise(resolve => setTimeout(resolve, 1000));
        serviceWorkerRegistration = await navigator.serviceWorker.getRegistration();
      }
      console.log('Service worker registration:', serviceWorkerRegistration);
    } catch (swError) {
      console.error('Service worker error:', swError);
    }

    // Wait a moment for service worker to stabilize
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Get FCM token with explicit options
    console.log('Getting FCM token with VAPID key...');
    
    // Try multiple approaches for maximum compatibility
    let token = null;
    let attempts = 0;
    const maxAttempts = 3;
    
    while (!token && attempts < maxAttempts) {
      attempts++;
      console.log(`Token request attempt ${attempts}/${maxAttempts}...`);
      
      try {
        // Different strategies based on attempt number
        if (attempts === 1) {
          // First attempt: with service worker registration
          token = await getToken(messaging, { 
            vapidKey: VAPID_KEY,
            serviceWorkerRegistration 
          });
        } else if (attempts === 2) {
          // Second attempt: without service worker registration
          token = await getToken(messaging, { 
            vapidKey: VAPID_KEY 
          });
        } else {
          // Final attempt: force a new token
          await deleteToken(messaging).catch(() => { /* Ignore errors */ });
          token = await getToken(messaging, { vapidKey: VAPID_KEY });
        }
        
        if (token) {
          console.log(`Successfully got token on attempt ${attempts}`);
          break;
        }
      } catch (tokenError) {
        console.error(`Error on attempt ${attempts}:`, tokenError);
        // Wait before next attempt
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    if (token) {
      console.log('FCM Token obtained successfully:', token);
      localStorage.setItem('fcmToken', token);
      
      // Store token in database
      try {
        // Check if token is already in database
        const subscribersRef = ref(database, 'subscribers');
        const snapshot = await get(subscribersRef);
        
        if (snapshot.exists()) {
          const subscribers = snapshot.val();
          const tokenExists = Object.values(subscribers).includes(token);
          
          if (tokenExists) {
            console.log('Token already exists in database');
          } else {
            // Add new token
            const newSubscriberRef = push(subscribersRef);
            await set(newSubscriberRef, token);
            console.log('Token saved to database with ID:', newSubscriberRef.key);
          }
        } else {
          // No subscribers yet, add first one
          const newSubscriberRef = push(subscribersRef);
          await set(newSubscriberRef, token);
          console.log('First subscriber token saved to database');
        }
      } catch (dbError) {
        console.error('Error interacting with database:', dbError);
      }
      
      return token;
    } else {
      console.error('No registration token available');
      return null;
    }
  } catch (error) {
    console.error('Failed to get FCM token:', error);
    return null;
  }
};

/**
 * Unsubscribe from push notifications
 */
export const unsubscribeFromNotifications = async () => {
  if (!messaging) return false;
  
  try {
    // Get the current token
    const currentToken = localStorage.getItem('fcmToken');
    
    if (currentToken) {
      // Remove from Firebase database
      try {
        // Find the token in the database
        const subscribersRef = ref(database, 'subscribers');
        const snapshot = await get(subscribersRef);
        
        if (snapshot.exists()) {
          const subscribers = snapshot.val();
          
          // Find the key for this token
          let tokenKey = null;
          Object.entries(subscribers).forEach(([key, value]) => {
            if (value === currentToken) {
              tokenKey = key;
            }
          });
          
          // Delete the token if found
          if (tokenKey) {
            await remove(ref(database, `subscribers/${tokenKey}`));
            console.log('Token removed from database');
          }
        }
      } catch (dbError) {
        console.error('Error removing token from database:', dbError);
      }
    }
    
    // Delete from Firebase Messaging
    await deleteToken(messaging);
    localStorage.removeItem('fcmToken');
    console.log('Token deleted successfully');
    return true;
  } catch (error) {
    console.error('Error deleting token:', error);
    return false;
  }
};

/**
 * Check if user is subscribed to notifications
 * @returns {boolean} true if subscribed, false otherwise
 */
export const isSubscribedToNotifications = () => {
  const hasToken = !!localStorage.getItem('fcmToken');
  
  // Extra validation - if permission is denied but we have a token,
  // that's an invalid state - clean it up
  if (hasToken && Notification.permission === 'denied') {
    console.log('Found token but permission is denied - cleaning up');
    localStorage.removeItem('fcmToken');
    return false;
  }
  
  return hasToken;
};

/**
 * Set up foreground message handler
 * @param {Function} callback Function to call when notification is received
 */
export const setupMessageHandler = (callback) => {
  if (!messaging) return null;
  
  return onMessage(messaging, (payload) => {
    console.log('Message received:', payload);
    
    // Default notification options
    const notificationOptions = {
      body: payload.notification?.body || 'New message from Scrambled Legs',
      icon: '/android-chrome-192x192.png',
      badge: '/favicon-32x32.png',
      tag: payload.data?.tag || 'scrambled-legs-notification',
      timestamp: new Date().getTime(),
      data: payload.data,
      vibrate: [100, 50, 100]
    };
    
    // Show notification if in foreground
    if (Notification.permission === 'granted' && !document.hidden) {
      try {
        const notification = new Notification(
          payload.notification?.title || 'Scrambled Legs', 
          notificationOptions
        );
        
        notification.onclick = () => {
          notification.close();
          window.focus();
          
          // Handle notification click
          if (callback && typeof callback === 'function') {
            callback(payload);
          }
        };
      } catch (error) {
        console.error('Error showing notification:', error);
      }
    }
  });
};

export { app, database, messaging };
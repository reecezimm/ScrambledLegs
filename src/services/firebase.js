import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, push, update, remove } from 'firebase/database';
import { getMessaging, getToken, onMessage, deleteToken } from 'firebase/messaging';

// Firebase configuration
const firebaseConfig = {
  databaseURL: "https://fundraiser-f0831-default-rtdb.firebaseio.com/",
  apiKey: "AIzaSyANlKWMjOX0Zy6lg1uDcUfZrjp4CfCSBOM",
  authDomain: "fundraiser-f0831.firebaseapp.com",
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
  messaging = getMessaging(app);
} catch (error) {
  console.log('Firebase messaging not supported in this browser');
}

// VAPID key for web push notifications
const VAPID_KEY = "BEsmXUl-hHK0FAmHVdbUeZ3kDbSyhOPId-66fJ5NRJ44XFYy5MujmXiXKBp8MH_7hBmFedktB5y7iF3NOjV86tY";

/**
 * Request permission and register for push notifications
 * @returns {Promise<string|null>} FCM token or null if not supported/allowed
 */
export const requestNotificationPermission = async () => {
  if (!messaging) return null;
  
  try {
    // Check if notification permission is granted
    let permission = Notification.permission;
    
    // Request permission if not already granted
    if (permission !== 'granted') {
      permission = await Notification.requestPermission();
    }
    
    if (permission !== 'granted') {
      console.log('Notification permission denied');
      return null;
    }

    // Get FCM token
    const token = await getToken(messaging, { vapidKey: VAPID_KEY });
    
    if (token) {
      console.log('FCM Token:', token);
      localStorage.setItem('fcmToken', token);
      
      // Store token in database
      try {
        const subscribersRef = ref(database, 'subscribers');
        const newSubscriberRef = push(subscribersRef);
        await set(newSubscriberRef, token);
        console.log('Token saved to database');
      } catch (dbError) {
        console.error('Error saving token to database:', dbError);
      }
      
      return token;
    } else {
      console.log('No registration token available');
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
 */
export const isSubscribedToNotifications = () => {
  return !!localStorage.getItem('fcmToken');
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
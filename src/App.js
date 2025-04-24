import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HotDogCounter from './pages/HotDogCounter';
import AdminPage from './pages/AdminPage';
import LesterPark from './pages/LesterPark';
import { setupMessageHandler, requestNotificationPermission } from './services/firebase';

// Get the basename from the environment or use an empty string
// This ensures the router works correctly on GitHub Pages and local development
const basename = process.env.PUBLIC_URL || '';

function App() {
  useEffect(() => {
    // Set up Firebase message handler for foreground notifications
    const unsubscribe = setupMessageHandler((payload) => {
      console.log('Notification clicked:', payload);
      // Handle notification click here if needed
    });
    
    // Check and fix service worker registration if needed
    const initializeServiceWorker = async () => {
      try {
        // Verify service worker registration and fix if needed
        let registration = await navigator.serviceWorker.getRegistration('/firebase-messaging-sw.js');
        
        // If no specific registration for the messaging service worker, check for any registration
        if (!registration) {
          registration = await navigator.serviceWorker.getRegistration();
        }
        
        // Log service worker status
        if (registration) {
          console.log('Service worker registered with scope:', registration.scope);
          
          // Check if we have the firebase-messaging-sw.js service worker specifically
          const isFCMServiceWorker = registration.scope.endsWith('/') || 
                                    registration.active?.scriptURL.includes('firebase-messaging-sw.js');
          
          if (!isFCMServiceWorker) {
            console.warn('Firebase messaging service worker not properly registered');
          }
        } else {
          console.warn('No service worker registration found');
        }
        
        // Only try to restore notifications if permission is already granted
        // This avoids prompting for permission before user interaction
        if (Notification.permission === 'granted') {
          console.log('Notification permission already granted, checking token');
          
          // Check if we have a token in localStorage
          const hasToken = !!localStorage.getItem('fcmToken');
          
          if (!hasToken && registration) {
            console.log('Permission granted but no token found, attempting to get a new token');
            // Only try to get a token if service worker is registered
            try {
              // Add a timeout to prevent hanging if there's an error
              const tokenPromise = Promise.race([
                requestNotificationPermission(),
                new Promise((_, reject) => 
                  setTimeout(() => reject(new Error('Token request timeout')), 8000)
                )
              ]);
              
              const token = await tokenPromise;
              if (token) {
                console.log('Successfully restored FCM token on app load');
              }
            } catch (error) {
              console.error('Failed to restore FCM token:', error);
            }
          }
        }
      } catch (error) {
        console.error('Error initializing service worker:', error);
      }
    };
    
    // Run initialization
    initializeServiceWorker();
    
    return () => {
      // Cleanup subscription
      if (unsubscribe) unsubscribe();
    };
  }, []);
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Main route for hot dog counter */}
        <Route path="/hotdog-counter" element={<HotDogCounter />} />
        {/* Support HD.html legacy route */}
        <Route path="/hd.html" element={<Navigate to="/hotdog-counter" replace />} />
        {/* Named route */}
        <Route path="/hot-dog-counter" element={<Navigate to="/hotdog-counter" replace />} />
        {/* Admin route */}
        <Route path="/admin1" element={<AdminPage />} />
        {/* Lester Park route */}
        <Route path="/lester-park" element={<LesterPark />} />
      </Routes>
    </Router>
  );
}

export default App;
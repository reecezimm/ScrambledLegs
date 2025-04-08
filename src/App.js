import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HotDogCounter from './pages/HotDogCounter';
import AdminPage from './pages/AdminPage';
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
    
    // Check if service worker should be registered
    const initializeServiceWorker = async () => {
      // Only try to restore notifications if permission is already granted
      // This avoids prompting for permission before user interaction
      if (Notification.permission === 'granted') {
        console.log('Notification permission already granted, checking token');
        
        // Check if we have a token in localStorage
        const hasToken = !!localStorage.getItem('fcmToken');
        
        if (!hasToken) {
          console.log('Permission granted but no token found, attempting to get a new token');
          // Try to get a new token without showing any UI
          try {
            const token = await requestNotificationPermission();
            if (token) {
              console.log('Successfully restored FCM token on app load');
            }
          } catch (error) {
            console.error('Failed to restore FCM token:', error);
          }
        }
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
      </Routes>
    </Router>
  );
}

export default App;
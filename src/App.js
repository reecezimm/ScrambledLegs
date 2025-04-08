import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HotDogCounter from './pages/HotDogCounter';
import AdminPage from './pages/AdminPage';
import { setupMessageHandler } from './services/firebase';

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
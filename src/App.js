import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HotDogCounter from './pages/HotDogCounter';

// Get the basename from the environment or use an empty string
// This ensures the router works correctly on GitHub Pages and local development
const basename = process.env.PUBLIC_URL || '';

function App() {
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
      </Routes>
    </Router>
  );
}

export default App;
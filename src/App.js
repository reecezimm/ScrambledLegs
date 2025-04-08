import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Route path="/hot-dog-counter" element={<HotDogCounter />} />
      </Routes>
    </Router>
  );
}

export default App;
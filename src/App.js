import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import HotDogCounter from './pages/HotDogCounter';
import AdminPage from './pages/AdminPage';
import LesterPark from './pages/LesterPark';
import AuthButton from './components/AuthButton';
import UpdateAvailableToast from './components/UpdateAvailableToast';
import PageTracker from './services/pageTracker';
import { logEvent } from './services/analytics';
import { setInstallPrompt } from './services/pwaInstall';

// Get the basename from the environment or use an empty string
// This ensures the router works correctly on GitHub Pages and local development
const basename = process.env.PUBLIC_URL || '';

function App() {
  React.useEffect(() => {
    const onInstalled = () => {
      logEvent('pwa_installed', {});
      setInstallPrompt(null);
    };
    const onBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('appinstalled', onInstalled);
    window.addEventListener('beforeinstallprompt', onBeforeInstall);
    return () => {
      window.removeEventListener('appinstalled', onInstalled);
      window.removeEventListener('beforeinstallprompt', onBeforeInstall);
    };
  }, []);
  return (
    <Router basename={basename}>
      <PageTracker />
      <AuthButton />
      <UpdateAvailableToast />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* Event deep-link route — renders Home with the sheet open */}
        <Route path="/events/:eventId" element={<Home />} />
        {/* Main route for hot dog counter */}
        <Route path="/hotdog-counter" element={<HotDogCounter />} />
        {/* Support HD.html legacy route */}
        <Route path="/hd.html" element={<Navigate to="/hotdog-counter" replace />} />
        {/* Named route */}
        <Route path="/hot-dog-counter" element={<Navigate to="/hotdog-counter" replace />} />
        {/* Admin route — :tab is optional; bare /admin1 redirects to /admin1/events inside AdminPage */}
        <Route path="/admin1" element={<AdminPage />} />
        <Route path="/admin1/:tab" element={<AdminPage />} />
        {/* Lester Park route */}
        <Route path="/lester-park" element={<LesterPark />} />
      </Routes>
    </Router>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3); }
  50% { transform: scale(1.05); box-shadow: 0 4px 12px rgba(255, 87, 34, 0.5); }
  100% { transform: scale(1); box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3); }
`;

const InstallButtonContainer = styled.div`
  position: fixed;
  bottom: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    bottom: 70px;
  }
`;

const Button = styled.button`
  background-color: #ff5722;
  color: white;
  border: none;
  padding: 12px 18px;
  border-radius: 8px;
  cursor: pointer;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3);
  animation: ${pulseAnimation} 2s infinite ease-in-out;
  
  &:hover {
    background-color: #ff6e40;
    transform: translateY(-2px);
  }
  
  &::before {
    content: "📱";
    margin-right: 8px;
    font-size: 1.2em;
  }
`;

const Toast = styled.div`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px 16px;
  border-radius: 20px;
  font-size: 13px;
  margin-bottom: 10px;
  max-width: 220px;
  text-align: center;
  backdrop-filter: blur(4px);
`;

const InstallButton = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isEngaged, setIsEngaged] = useState(false);
  const [installAttempts, setInstallAttempts] = useState(0);

  useEffect(() => {
    // Track engagement time
    const engagementTimer = setTimeout(() => {
      setIsEngaged(true);
      // After user has been on site for a while, show the install button if available
      if (installPrompt) {
        setIsVisible(true);
        // Show toast briefly
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
    }, 15000); // 15 seconds of engagement

    // Track user interactions (clicks, scrolls)
    const trackEngagement = () => {
      if (!isEngaged) {
        setIsEngaged(true);
        clearTimeout(engagementTimer);
        // If we have an install prompt and user has interacted, show the button
        if (installPrompt) {
          setIsVisible(true);
        }
      }
    };

    // Listen for user interactions
    window.addEventListener('click', trackEngagement);
    window.addEventListener('scroll', trackEngagement);
    window.addEventListener('touchstart', trackEngagement);
    
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent default browser install prompt
      e.preventDefault();
      console.log('Install prompt captured and saved');
      
      // Stash the event so it can be triggered later
      setInstallPrompt(e);
      
      // If user is already engaged, show the button
      if (isEngaged) {
        setIsVisible(true);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
    });
    
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsVisible(false);
    }
    
    // Periodically check if we should show the install button
    // Some Android devices need a little nudge
    const periodicCheck = setInterval(() => {
      if (installPrompt && isEngaged && installAttempts < 2) {
        setIsVisible(true);
        // Only show toast occasionally
        if (Math.random() > 0.5) {
          setShowToast(true);
          setTimeout(() => setShowToast(false), 5000);
        }
      }
    }, 30000); // Check every 30 seconds
    
    return () => {
      clearTimeout(engagementTimer);
      clearInterval(periodicCheck);
      window.removeEventListener('click', trackEngagement);
      window.removeEventListener('scroll', trackEngagement);
      window.removeEventListener('touchstart', trackEngagement);
    };
  }, [installPrompt, isEngaged, installAttempts]);

  const handleInstallClick = () => {
    if (!installPrompt) {
      console.log('No installation prompt available');
      // Try to show install instructions manually
      setShowToast(true);
      setTimeout(() => setShowToast(false), 7000);
      setInstallAttempts(prev => prev + 1);
      return;
    }
    
    // Show the install prompt
    installPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
        setIsVisible(false);
      } else {
        console.log('User dismissed the install prompt');
        // If user dismisses, increment attempts
        setInstallAttempts(prev => prev + 1);
      }
      
      // Clear the saved prompt since it can't be used again
      setInstallPrompt(null);
    });
  };

  if (!isVisible) return null;
  
  return (
    <InstallButtonContainer>
      {showToast && (
        <Toast>
          Add to home screen for the best experience!
        </Toast>
      )}
      <Button onClick={handleInstallClick}>
        Add to Home Screen
      </Button>
    </InstallButtonContainer>
  );
};

export default InstallButton;
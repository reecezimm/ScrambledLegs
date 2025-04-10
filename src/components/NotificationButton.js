import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { 
  requestNotificationPermission, 
  isSubscribedToNotifications, 
  unsubscribeFromNotifications 
} from '../services/firebase';

const pulseAnimation = keyframes`
  0% { transform: scale(1); box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3); }
  50% { transform: scale(1.05); box-shadow: 0 4px 12px rgba(255, 87, 34, 0.5); }
  100% { transform: scale(1); box-shadow: 0 2px 8px rgba(255, 87, 34, 0.3); }
`;

const NotificationButtonContainer = styled.div`
  position: fixed;
  bottom: 140px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  @media (max-width: 768px) {
    bottom: 130px;
  }
`;

const Button = styled.button`
  background-color: ${props => props.subscribed ? '#4CAF50' : '#ff5722'};
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
  animation: ${props => props.subscribed ? 'none' : pulseAnimation} 2s infinite ease-in-out;
  
  &:hover {
    background-color: ${props => props.subscribed ? '#3e8e41' : '#ff6e40'};
    transform: translateY(-2px);
  }
  
  &::before {
    content: "${props => props.subscribed ? '🔔' : '🔕'}";
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

const NotificationButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [permissionState, setPermissionState] = useState(
    typeof Notification !== 'undefined' ? Notification.permission : 'default'
  );
  const [browserSupported, setBrowserSupported] = useState(true);

  useEffect(() => {
    // Check if the browser supports notifications and service workers
    const checkBrowserSupport = () => {
      // Check if Notification API is supported
      const notificationsSupported = typeof Notification !== 'undefined';
      
      // Check if Service Worker API is supported
      const serviceWorkersSupported = 'serviceWorker' in navigator;
      
      // Set browser support state
      const isSupported = notificationsSupported && serviceWorkersSupported;
      setBrowserSupported(isSupported);
      
      if (!isSupported) {
        console.log('Browser does not support notifications or service workers');
        return false;
      }
      
      return true;
    };
    
    const checkSubscriptionStatus = async () => {
      // First check if browser supports notifications
      if (!checkBrowserSupport()) {
        return;
      }
      
      // Get current subscription status
      const isCurrentlySubscribed = isSubscribedToNotifications();
      console.log('Subscription check:', isCurrentlySubscribed ? 'Subscribed' : 'Not subscribed');
      setIsSubscribed(isCurrentlySubscribed);
      
      // Get current permission state
      const currentPermission = Notification.permission;
      console.log('Current notification permission:', currentPermission);
      setPermissionState(currentPermission);
      
      // If permission is granted but we don't have a token, something went wrong
      // This can happen if the token was cleared or expired
      if (currentPermission === 'granted' && !isCurrentlySubscribed) {
        console.log('Permission granted but no token - will request new token');
        // Show button to let user resubscribe
        setIsVisible(true);
      }
    };
    
    // Run initial check
    checkSubscriptionStatus();
    
    // Track time spent on site - show notification prompt after delay
    const timer = setTimeout(() => {
      if (!hasInteracted && permissionState !== 'denied') {
        console.log('Showing notification prompt after delay');
        setIsVisible(true);
        setShowToast(true);
        setToastMessage('Get notified about hot dog events!');
        setTimeout(() => setShowToast(false), 5000);
      }
    }, 15000); // Show after 15 seconds (reduced from 20s)
    
    // Track user interactions (clicks, scrolls)
    const trackInteraction = () => {
      setHasInteracted(true);
      // Show notification button if not already subscribed or denied
      if (permissionState !== 'denied' && !isSubscribed) {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('click', trackInteraction);
    window.addEventListener('scroll', trackInteraction);
    
    // Periodic reminders if not subscribed
    const reminderInterval = setInterval(() => {
      if (!isSubscribed && permissionState !== 'denied' && hasInteracted) {
        // Show reminder occasionally
        if (Math.random() > 0.7) {
          console.log('Showing periodic notification reminder');
          setIsVisible(true);
          setShowToast(true);
          setToastMessage('Stay updated with notifications!');
          setTimeout(() => setShowToast(false), 5000);
        }
      }
    }, 60000); // Check every minute
    
    // Check for permission changes
    const permissionChangeCheck = setInterval(() => {
      if (Notification.permission !== permissionState) {
        console.log('Permission state changed:', Notification.permission);
        setPermissionState(Notification.permission);
        
        // Update subscription status if permission changed
        checkSubscriptionStatus();
      }
    }, 5000); // Check every 5 seconds
    
    return () => {
      clearTimeout(timer);
      clearInterval(reminderInterval);
      clearInterval(permissionChangeCheck);
      window.removeEventListener('click', trackInteraction);
      window.removeEventListener('scroll', trackInteraction);
    };
  }, [hasInteracted, isSubscribed, permissionState]);
  
  const handleNotificationClick = async () => {
    try {
      // Check if browser supports notifications
      if (!browserSupported) {
        console.error('Browser does not support notifications');
        setToastMessage('Your browser does not support notifications.');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
        return;
      }
      
      if (isSubscribed) {
        // Show feedback while processing
        setToastMessage('Turning off notifications...');
        setShowToast(true);
        
        // Unsubscribe from notifications
        console.log('Attempting to unsubscribe from notifications');
        const success = await unsubscribeFromNotifications();
        
        if (success) {
          console.log('Successfully unsubscribed from notifications');
          setIsSubscribed(false);
          setToastMessage('Notifications turned off');
        } else {
          console.error('Failed to unsubscribe from notifications');
          setToastMessage('Failed to turn off notifications');
        }
        
        // Show result toast
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        try {
          // First verify the service worker is properly registered
          const registration = await navigator.serviceWorker.getRegistration();
          if (!registration) {
            console.error('No service worker registration found');
            setToastMessage('Browser setup required. Please refresh the page first.');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
            return;
          }
          
          // Show feedback while processing
          setToastMessage('Requesting notification permission...');
          setShowToast(true);
          
          // Request permission for notifications from the browser
          if (Notification.permission !== 'granted') {
            const permission = await Notification.requestPermission();
            if (permission !== 'granted') {
              setToastMessage('Notification permission denied. Please update browser settings.');
              setShowToast(true);
              setTimeout(() => setShowToast(false), 5000);
              return;
            }
          }
          
          // Subscribe to notifications
          console.log('Attempting to subscribe to notifications');
          
          // Add a timeout to prevent hanging if there's an error
          const tokenPromise = Promise.race([
            requestNotificationPermission(),
            new Promise((_, reject) => 
              setTimeout(() => reject(new Error('Token request timeout')), 10000)
            )
          ]);
          
          const token = await tokenPromise;
          
          if (token) {
            console.log('Successfully subscribed to notifications with token');
            setIsSubscribed(true);
            setToastMessage('Notifications enabled! 🎉');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
          } else {
            // This case happens when permission is granted but token acquisition fails
            console.error('Failed to get notification token');
            setToastMessage('Could not enable notifications. Please try refreshing the page.');
            setShowToast(true);
            setTimeout(() => setShowToast(false), 5000);
          }
          
          // Update permission state
          setPermissionState(Notification.permission);
        } catch (subscribeError) {
          console.error('Error during subscription process:', subscribeError);
          setToastMessage('Could not enable notifications: ' + (subscribeError.message || 'Unknown error'));
          setShowToast(true);
          setTimeout(() => setShowToast(false), 5000);
        }
      }
    } catch (error) {
      console.error('Error in notification button handler:', error);
      setToastMessage('An error occurred. Please try again.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };
  
  // Logic for when to show the notification button
  let shouldShowButton = false;
  
  // First check if browser supports notifications
  if (!browserSupported) {
    shouldShowButton = false;
  }
  // Case 1: Already subscribed - always show to allow unsubscribing
  else if (isSubscribed) {
    shouldShowButton = true;
  }
  // Case 2: Permission granted but not subscribed - show to allow subscribing
  else if (permissionState === 'granted' && !isSubscribed) {
    shouldShowButton = true;
  }
  // Case 3: Permission not decided yet - show if visibility is set
  else if (permissionState === 'default' && isVisible) {
    shouldShowButton = true;
  }
  // Case 4: Permission denied - never show
  else if (permissionState === 'denied') {
    shouldShowButton = false;
  }
  
  // Return null if button shouldn't be shown
  if (!shouldShowButton) {
    return null;
  }
  
  return (
    <NotificationButtonContainer>
      {showToast && (
        <Toast>
          {toastMessage}
        </Toast>
      )}
      <Button 
        onClick={handleNotificationClick}
        subscribed={isSubscribed}
      >
        {isSubscribed ? 'Notifications On' : 'Enable Notifications'}
      </Button>
    </NotificationButtonContainer>
  );
};

export default NotificationButton;
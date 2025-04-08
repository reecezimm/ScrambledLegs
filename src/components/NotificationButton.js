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
  const [permissionState, setPermissionState] = useState(Notification.permission);

  useEffect(() => {
    // Check subscription status
    setIsSubscribed(isSubscribedToNotifications());
    
    // Track time spent on site
    const timer = setTimeout(() => {
      if (!hasInteracted && permissionState !== 'denied') {
        setIsVisible(true);
        setShowToast(true);
        setToastMessage('Get notified about hot dog events!');
        setTimeout(() => setShowToast(false), 5000);
      }
    }, 20000); // Show after 20 seconds
    
    // Track user interactions (clicks, scrolls)
    const trackInteraction = () => {
      setHasInteracted(true);
      if (permissionState !== 'denied' && permissionState !== 'granted') {
        setIsVisible(true);
      }
    };
    
    window.addEventListener('click', trackInteraction);
    window.addEventListener('scroll', trackInteraction);
    
    // Periodic reminders if not subscribed
    const reminderInterval = setInterval(() => {
      if (!isSubscribed && permissionState !== 'denied' && hasInteracted) {
        // Only show occasionally
        if (Math.random() > 0.7) {
          setIsVisible(true);
          setShowToast(true);
          setToastMessage('Stay updated with notifications!');
          setTimeout(() => setShowToast(false), 5000);
        }
      }
    }, 60000); // Check every minute
    
    return () => {
      clearTimeout(timer);
      clearInterval(reminderInterval);
      window.removeEventListener('click', trackInteraction);
      window.removeEventListener('scroll', trackInteraction);
    };
  }, [hasInteracted, isSubscribed, permissionState]);
  
  const handleNotificationClick = async () => {
    if (isSubscribed) {
      // Unsubscribe from notifications
      const success = await unsubscribeFromNotifications();
      if (success) {
        setIsSubscribed(false);
        setToastMessage('Notifications turned off');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      }
    } else {
      // Subscribe to notifications
      const token = await requestNotificationPermission();
      if (token) {
        setIsSubscribed(true);
        setToastMessage('Notifications enabled! 🎉');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } else {
        setToastMessage('Please allow notifications in your browser settings');
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }
      setPermissionState(Notification.permission);
    }
  };
  
  // Don't show button if permission is denied and user is not subscribed
  if (permissionState === 'denied' && !isSubscribed) {
    return null;
  }
  
  // Always show if user is subscribed, otherwise follow visibility state
  if (!isVisible && !isSubscribed) {
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
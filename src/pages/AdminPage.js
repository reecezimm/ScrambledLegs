import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getDatabase, ref, push, set, get, remove, onValue } from 'firebase/database';
import { database } from '../services/firebase';

const PageContainer = styled.div`
  background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
  min-height: 100vh;
  padding: 40px 20px;
  color: white;
  font-family: 'Inter', sans-serif;
`;

const AdminPanel = styled.div`
  max-width: 800px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
`;

const Header = styled.h1`
  font-size: 28px;
  margin-bottom: 30px;
  color: #FFE66D;
  text-align: center;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #FF6B6B;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #FF6B6B;
    background: rgba(255, 255, 255, 0.15);
  }
`;

const Button = styled.button`
  background: linear-gradient(45deg, #FF6B6B, #FF8E53);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 600;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: block;
  margin: 20px 0;
  width: 100%;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
  
  &:disabled {
    background: #555;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const StatusMessage = styled.div`
  padding: 15px;
  margin: 20px 0;
  border-radius: 4px;
  font-weight: 500;
  text-align: center;
  background: ${props => props.success ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)'};
  border: 1px solid ${props => props.success ? 'rgba(76, 175, 80, 0.5)' : 'rgba(244, 67, 54, 0.5)'};
  color: ${props => props.success ? '#4CAF50' : '#F44336'};
`;

const NotificationsList = styled.div`
  margin-top: 40px;
`;

const NotificationItem = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  position: relative;
  border-left: 3px solid #FF6B6B;
`;

const NotificationTitle = styled.h3`
  margin: 0 0 10px 0;
  font-size: 18px;
  color: #FFE66D;
`;

const NotificationBody = styled.p`
  margin: 0;
  color: rgba(255, 255, 255, 0.8);
`;

const NotificationTimestamp = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 10px;
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  font-size: 18px;
  padding: 0;
  
  &:hover {
    color: #F44336;
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
  flex-wrap: wrap;
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  padding: 15px;
  flex: 1;
  margin: 0 10px 10px 0;
  min-width: 150px;
  text-align: center;
  
  &:last-child {
    margin-right: 0;
  }
`;

const StatNumber = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #FFE66D;
  margin-bottom: 5px;
`;

const StatLabel = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
`;

const AdminLogin = styled.div`
  max-width: 400px;
  margin: 100px auto;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
  text-align: center;
`;

const AdminLoginTitle = styled.h2`
  font-size: 24px;
  margin-bottom: 20px;
  color: #FFE66D;
`;

const PasswordInput = styled.input`
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: white;
  font-size: 16px;
  text-align: center;
  
  &:focus {
    outline: none;
    border-color: #FF6B6B;
  }
`;

// For demo purposes - in production, use proper authentication
const ADMIN_PASSWORD = "scrambledegg123";

const AdminPage = () => {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState({ message: '', success: false, visible: false });
  const [notifications, setNotifications] = useState([]);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    // Fetch notifications history
    const notificationsRef = ref(database, 'notifications');
    const unsubscribe = onValue(notificationsRef, (snapshot) => {
      const data = snapshot.val() || {};
      const notificationsList = Object.keys(data).map(key => ({
        id: key,
        ...data[key]
      })).sort((a, b) => b.timestamp - a.timestamp);
      
      setNotifications(notificationsList);
    });
    
    // Fetch subscriber count
    const subscribersRef = ref(database, 'subscribers');
    get(subscribersRef).then((snapshot) => {
      const data = snapshot.val() || {};
      setSubscriberCount(Object.keys(data).length);
    });
    
    return () => {
      // Clean up subscription
      unsubscribe();
    };
  }, []);
  
  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      setStatus({
        message: 'Invalid password',
        success: false,
        visible: true
      });
      
      setTimeout(() => {
        setStatus({ ...status, visible: false });
      }, 3000);
    }
  };
  
  const handleSendNotification = async () => {
    if (!title.trim() || !message.trim()) {
      setStatus({
        message: 'Please provide both title and message',
        success: false,
        visible: true
      });
      
      setTimeout(() => {
        setStatus({ ...status, visible: false });
      }, 3000);
      
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Add to notifications collection
      const notificationsRef = ref(database, 'notifications');
      const newNotificationRef = push(notificationsRef);
      const notificationData = {
        title,
        message,
        timestamp: Date.now(),
        read: false
      };
      
      await set(newNotificationRef, notificationData);
      
      // Add to FCM send queue
      const sendQueueRef = ref(database, 'fcmSendQueue');
      const newSendRef = push(sendQueueRef);
      await set(newSendRef, {
        notification: {
          title,
          body: message
        },
        timestamp: Date.now(),
        sent: false
      });
      
      setStatus({
        message: 'Notification sent successfully!',
        success: true,
        visible: true
      });
      
      setTitle('');
      setMessage('');
      
      setTimeout(() => {
        setStatus({ ...status, visible: false });
      }, 3000);
    } catch (error) {
      console.error('Error sending notification:', error);
      setStatus({
        message: `Error: ${error.message}`,
        success: false,
        visible: true
      });
      
      setTimeout(() => {
        setStatus({ ...status, visible: false });
      }, 5000);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleDeleteNotification = async (id) => {
    try {
      const notificationRef = ref(database, `notifications/${id}`);
      await remove(notificationRef);
      
      setStatus({
        message: 'Notification deleted',
        success: true,
        visible: true
      });
      
      setTimeout(() => {
        setStatus({ ...status, visible: false });
      }, 3000);
    } catch (error) {
      console.error('Error deleting notification:', error);
      setStatus({
        message: `Error: ${error.message}`,
        success: false,
        visible: true
      });
      
      setTimeout(() => {
        setStatus({ ...status, visible: false });
      }, 5000);
    }
  };
  
  if (!isAuthenticated) {
    return (
      <PageContainer>
        <AdminLogin>
          <AdminLoginTitle>Admin Access</AdminLoginTitle>
          <FormGroup>
            <Label>Enter Password</Label>
            <PasswordInput 
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
            />
          </FormGroup>
          <Button onClick={handleLogin}>Login</Button>
          {status.visible && (
            <StatusMessage success={status.success}>
              {status.message}
            </StatusMessage>
          )}
        </AdminLogin>
      </PageContainer>
    );
  }
  
  return (
    <PageContainer>
      <AdminPanel>
        <Header>Notification Admin</Header>
        
        <StatsContainer>
          <StatBox>
            <StatNumber>{subscriberCount}</StatNumber>
            <StatLabel>Subscribers</StatLabel>
          </StatBox>
          <StatBox>
            <StatNumber>{notifications.length}</StatNumber>
            <StatLabel>Sent Notifications</StatLabel>
          </StatBox>
        </StatsContainer>
        
        <FormGroup>
          <Label>Notification Title</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title..."
            maxLength={50}
          />
        </FormGroup>
        
        <FormGroup>
          <Label>Notification Message</Label>
          <TextArea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter message..."
            maxLength={200}
          />
        </FormGroup>
        
        <Button 
          onClick={handleSendNotification}
          disabled={isLoading || !title.trim() || !message.trim()}
        >
          {isLoading ? 'Sending...' : 'Send Notification'}
        </Button>
        
        {status.visible && (
          <StatusMessage success={status.success}>
            {status.message}
          </StatusMessage>
        )}
        
        <NotificationsList>
          <h2>Notification History</h2>
          {notifications.length === 0 ? (
            <p>No notifications sent yet.</p>
          ) : (
            notifications.map(notification => (
              <NotificationItem key={notification.id}>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationBody>{notification.message}</NotificationBody>
                <NotificationTimestamp>
                  {new Date(notification.timestamp).toLocaleString()}
                </NotificationTimestamp>
                <DeleteButton onClick={() => handleDeleteNotification(notification.id)}>
                  &times;
                </DeleteButton>
              </NotificationItem>
            ))
          )}
        </NotificationsList>
      </AdminPanel>
    </PageContainer>
  );
};

export default AdminPage;
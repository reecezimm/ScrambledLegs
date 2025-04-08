const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

/**
 * When a new notification is added to the fcmSendQueue, send it to all subscribers
 */
exports.sendPushNotifications = functions.database.ref('/fcmSendQueue/{pushId}')
  .onCreate(async (snapshot, context) => {
    const notificationData = snapshot.val();
    
    // Skip if already sent
    if (notificationData.sent === true) {
      console.log('Notification already sent, skipping');
      return null;
    }
    
    try {
      // Get all subscriber tokens
      const subscribersSnapshot = await admin.database().ref('/subscribers').once('value');
      const subscribers = subscribersSnapshot.val() || {};
      
      const tokens = Object.values(subscribers);
      
      if (tokens.length === 0) {
        console.log('No subscribers found');
        return null;
      }
      
      console.log(`Sending notification to ${tokens.length} subscribers`);
      
      // Prepare the notification message
      const message = {
        notification: notificationData.notification,
        tokens: tokens
      };
      
      // Send the notification
      const response = await admin.messaging().sendMulticast(message);
      
      console.log(`${response.successCount} messages were sent successfully`);
      
      // Update the notification status
      await snapshot.ref.update({
        sent: true,
        sentAt: admin.database.ServerValue.TIMESTAMP,
        successCount: response.successCount,
        failureCount: response.failureCount
      });
      
      // Clean up invalid tokens
      if (response.failureCount > 0) {
        const failedTokens = [];
        response.responses.forEach((resp, idx) => {
          if (!resp.success) {
            failedTokens.push(tokens[idx]);
          }
        });
        
        console.log(`${failedTokens.length} tokens failed, cleaning up...`);
        
        // Remove failed tokens from subscribers
        for (const token of failedTokens) {
          const tokenRef = Object.keys(subscribers).find(key => subscribers[key] === token);
          if (tokenRef) {
            await admin.database().ref(`/subscribers/${tokenRef}`).remove();
            console.log(`Removed invalid token: ${token}`);
          }
        }
      }
      
      return null;
    } catch (error) {
      console.error('Error sending notifications:', error);
      
      // Update with error
      await snapshot.ref.update({
        error: error.message,
        errorAt: admin.database.ServerValue.TIMESTAMP
      });
      
      return null;
    }
  });

/**
 * When a user subscribes, store their FCM token
 */
exports.storeSubscription = functions.https.onCall(async (data, context) => {
  const { token } = data;
  
  if (!token) {
    throw new functions.https.HttpsError('invalid-argument', 'Token is required');
  }
  
  try {
    // Check if token already exists
    const subscribersSnapshot = await admin.database().ref('/subscribers').once('value');
    const subscribers = subscribersSnapshot.val() || {};
    
    // Check if token already exists
    const existingToken = Object.values(subscribers).includes(token);
    if (existingToken) {
      return { success: true, message: 'Token already registered' };
    }
    
    // Add new token
    const newSubscriberRef = admin.database().ref('/subscribers').push();
    await newSubscriberRef.set(token);
    
    return { success: true, message: 'Subscription successful' };
  } catch (error) {
    console.error('Error storing subscription:', error);
    throw new functions.https.HttpsError('internal', 'Error storing subscription');
  }
});

/**
 * When a user unsubscribes, remove their FCM token
 */
exports.removeSubscription = functions.https.onCall(async (data, context) => {
  const { token } = data;
  
  if (!token) {
    throw new functions.https.HttpsError('invalid-argument', 'Token is required');
  }
  
  try {
    // Find and remove the token
    const subscribersSnapshot = await admin.database().ref('/subscribers').once('value');
    const subscribers = subscribersSnapshot.val() || {};
    
    let removed = false;
    
    // Find the token entry
    for (const [key, value] of Object.entries(subscribers)) {
      if (value === token) {
        await admin.database().ref(`/subscribers/${key}`).remove();
        removed = true;
        break;
      }
    }
    
    return { success: true, removed };
  } catch (error) {
    console.error('Error removing subscription:', error);
    throw new functions.https.HttpsError('internal', 'Error removing subscription');
  }
});
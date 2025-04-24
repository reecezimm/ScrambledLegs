import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, push, update, remove } from 'firebase/database';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAmwwbvmvxNYX-8PesRl8io9CH60sI2v2A", // Correct API key from Firebase console
  authDomain: "fundraiser-f0831.firebaseapp.com",
  databaseURL: "https://fundraiser-f0831-default-rtdb.firebaseio.com",
  projectId: "fundraiser-f0831",
  storageBucket: "fundraiser-f0831.firebasestorage.app",
  messagingSenderId: "900827039889", 
  appId: "1:900827039889:web:4bd336cb4f88a0c76e1730",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Stub functions for notification-related functionality
export const requestNotificationPermission = async () => null;
export const unsubscribeFromNotifications = async () => true;
export const isSubscribedToNotifications = () => false;
export const setupMessageHandler = () => null;

export { app, database };
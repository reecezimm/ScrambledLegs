import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import { getMessaging, isSupported } from 'firebase/messaging';
import { getFunctions } from 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyAmwwbvmvxNYX-8PesRl8io9CH60sI2v2A",
  authDomain: "fundraiser-f0831.firebaseapp.com",
  databaseURL: "https://fundraiser-f0831-default-rtdb.firebaseio.com",
  projectId: "fundraiser-f0831",
  storageBucket: "fundraiser-f0831.firebasestorage.app",
  messagingSenderId: "900827039889",
  appId: "1:900827039889:web:4bd336cb4f88a0c76e1730",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const storage = getStorage(app);
const functions = getFunctions(app);

// FCM messaging — gated by isSupported() so Safari pre-16, FF private, etc.
// don't blow up the bundle. We expose an async getter so callers can await
// and handle the unsupported case cleanly.
let _messagingPromise = null;
function getMessagingIfSupported() {
  if (_messagingPromise) return _messagingPromise;
  _messagingPromise = isSupported()
    .then((ok) => {
      if (!ok) return null;
      try {
        return getMessaging(app);
      } catch (e) {
        return null;
      }
    })
    .catch(() => null);
  return _messagingPromise;
}

export { app, database, storage, functions, getMessagingIfSupported };

// src/config/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// Hardcoded config - Firebase config is public and safe to commit
// (These are meant to be exposed in client-side code)
const firebaseConfig = {
  apiKey: "AIzaSyB8ldJZ7oUdyur0DbkcnjW4QAf27wOpMPM",
  authDomain: "biohackme-app-379de.firebaseapp.com",
  projectId: "biohackme-app-379de",
  storageBucket: "biohackme-app-379de.firebasestorage.app",
  messagingSenderId: "593310303438",
  appId: "1:593310303438:web:8b470c8b391917ff667c9f",
  measurementId: "G-TFEE1C2RVZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export const storage = getStorage(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

// Connect to emulators in development
if (import.meta.env.DEV && !import.meta.env.VITE_USE_FIREBASE_PROD) {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectFunctionsEmulator(functions, 'localhost', 5001);
    connectStorageEmulator(storage, 'localhost', 9199);
    console.log('🔥 Connected to Firebase emulators');
  } catch (error) {
    console.log('Firebase emulators already connected');
  }
}

export default app;
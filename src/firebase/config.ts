// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
const analytics = getAnalytics(app);

export { app, analytics };
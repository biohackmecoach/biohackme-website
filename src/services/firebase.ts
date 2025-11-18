// Firebase imports - temporarily commented for build testing
// import { initializeApp } from 'firebase/app'
// import { getAuth, connectAuthEmulator } from 'firebase/auth'
// import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'
// import { getStorage, connectStorageEmulator } from 'firebase/storage'
// import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'biohackme-app-379de',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Temporarily comment out Firebase initialization for build testing
// const app = initializeApp(firebaseConfig)

// Initialize Firebase services - temporarily disabled
// export const auth = getAuth(app)
// export const db = getFirestore(app)
// export const storage = getStorage(app)
// export const functions = getFunctions(app)

// Placeholder exports for build
export const auth = null
export const db = null
export const storage = null
export const functions = null

// Connect to emulators in development
// if (import.meta.env.DEV) {
//   try {
//     connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true })
//     connectFirestoreEmulator(db, 'localhost', 8080)
//     connectStorageEmulator(storage, 'localhost', 9199)
//     connectFunctionsEmulator(functions, 'localhost', 5001)
//   } catch (error) {
//     console.log('Emulators already connected or not available:', error)
//   }
// }

export default null
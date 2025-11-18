// Temporarily disabled Firebase imports for build testing
// import {
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
//   signOut,
//   onAuthStateChanged,
//   updateProfile,
//   sendPasswordResetEmail,
//   User
// } from 'firebase/auth'
// import { doc, setDoc, getDoc } from 'firebase/firestore'
// import { auth, db } from './firebase'

// Placeholder type
export interface User {
  uid: string
  email: string | null
}

export interface UserProfile {
  uid: string
  email: string
  displayName: string
  photoURL?: string
  role: 'client' | 'coach' | 'admin'
  phone?: string
  timezone?: string
  createdAt: Date
  updatedAt: Date
}

// Authentication functions - temporarily disabled for build
export const registerUser = async (email: string, password: string, displayName: string) => {
  // Placeholder implementation
  throw new Error('Firebase not initialized')
}

export const loginUser = async (email: string, password: string) => {
  throw new Error('Firebase not initialized')
}

export const logoutUser = async () => {
  throw new Error('Firebase not initialized')
}

export const resetPassword = async (email: string) => {
  throw new Error('Firebase not initialized')
}

export const getUserProfile = async (uid: string): Promise<UserProfile | null> => {
  throw new Error('Firebase not initialized')
}

export const updateUserProfile = async (uid: string, updates: Partial<UserProfile>) => {
  throw new Error('Firebase not initialized')
}

// Auth state observer
export const onAuthStateChange = (callback: (user: User | null) => void) => {
  throw new Error('Firebase not initialized')
}

'use client';

import { initializeApp, getApps, getApp, FirebaseApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

/**
 * Firebase configuration populated strictly from environment variables.
 * Using NEXT_PUBLIC_ prefix ensures these are available on the client side.
 */
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

export function initializeFirebase() {
  // Prevent multiple initializations
  if (getApps().length > 0) {
    return getSdks(getApp());
  }

  // Check if config is missing or contains default placeholders
  const isConfigIncomplete = !firebaseConfig.apiKey || 
                            firebaseConfig.apiKey === '' || 
                            firebaseConfig.apiKey.includes('placeholder');

  if (isConfigIncomplete) {
    // We log a warning instead of a blocking error during development if keys aren't set yet.
    // This allows the app to mount, but Firebase services will fail if called.
    console.warn(
      "Firebase configuration is missing or invalid. Firebase features will not work until you set your NEXT_PUBLIC_FIREBASE_* environment variables in the .env file."
    );
    
    // Create a mock app or return null if you prefer, but usually initializeApp will throw 
    // later if we don't handle it. For prototyping, we'll try to initialize but catch errors.
    try {
       const firebaseApp = initializeApp(firebaseConfig);
       return getSdks(firebaseApp);
    } catch (e) {
       console.error("Failed to initialize Firebase:", e);
       // Return empty objects to prevent total crash, though hooks will fail
       return { firebaseApp: null as any, auth: null as any, firestore: null as any };
    }
  }

  // Initialize Firebase App normally
  const firebaseApp = initializeApp(firebaseConfig);
  return getSdks(firebaseApp);
}

export function getSdks(firebaseApp: FirebaseApp) {
  return {
    firebaseApp,
    auth: getAuth(firebaseApp),
    firestore: getFirestore(firebaseApp)
  };
}

export * from './provider';
export * from './client-provider';
export * from './firestore/use-collection';
export * from './firestore/use-doc';
export * from './non-blocking-updates';
export * from './non-blocking-login';
export * from './errors';
export * from './error-emitter';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword, getRedirectResult } from 'firebase/auth';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject, getMetadata, updateMetadata } from 'firebase/storage';
import { initializeFirestore, persistentLocalCache, doc, setDoc, collection, getDocs, query, orderBy, updateDoc } from 'firebase/firestore';
import { getAnalytics, isSupported } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Throw an error if the environment variables are not set.
if (!firebaseConfig.apiKey || !firebaseConfig.projectId) {
  throw new Error('Firebase environment variables are not set. Please check your .env.local file or your deployment environment settings.');
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let analytics;

if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

// Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firebase Storage
const storage = getStorage(app);

// Firebase Firestore with offline persistence
const db = initializeFirestore(app, {
  localCache: persistentLocalCache(/*{tabManager: 'multi-tab'}*/)
});


// Export necessary Firebase services and utilities
export {
  app,
  auth,
  provider,
  analytics,
  signInWithPopup,
  signInWithEmailAndPassword,
  getRedirectResult,
  storage,
  ref,
  uploadBytes,
  listAll,
  getDownloadURL,
  deleteObject,
  getMetadata,
  updateMetadata,
  db,              // Firestore instance
  doc,
  setDoc,
  collection,
  getDocs,
  query,
  orderBy,
  updateDoc
};

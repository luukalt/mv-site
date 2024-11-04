// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject, getMetadata, updateMetadata } from 'firebase/storage';
import { getFirestore, doc, setDoc, collection, getDocs, query, orderBy, updateDoc } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjbYAlKbny0xwz-QRGMeoBUsF0ZZfoETo",
  authDomain: "marieke-versleijen.firebaseapp.com",
  projectId: "marieke-versleijen",
  storageBucket: "marieke-versleijen.appspot.com",
  messagingSenderId: "685554379761",
  appId: "1:685554379761:web:c35314731ab627947eb250",
  measurementId: "G-B6FMNC5LCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firebase Storage
const storage = getStorage(app);

// Firebase Firestore
const db = getFirestore(app);

// Export necessary Firebase services and utilities
export {
  app,
  auth,
  provider,
  signInWithPopup,
  signInWithEmailAndPassword,
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

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getStorage, ref, listAll, getDownloadURL, getMetadata } from 'firebase/storage';
import { getAuth, signInWithPopup, signInWithEmailPassword, GoogleAuthProvider } from 'firebase/auth';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject, getMetadata, updateMetadata } from 'firebase/storage';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase Authentication
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Firebase Storage
const storage = getStorage(app);

// Export auth and provider for sign-in
// export { };

// Export storage and common Storage functions
export { auth, provider, signInWithPopup, signInWithEmailPassword, storage, ref, uploadBytes, listAll, getDownloadURL, deleteObject, getMetadata, updateMetadata};
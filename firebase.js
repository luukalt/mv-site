// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';

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
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, ref, listAll, getDownloadURL };
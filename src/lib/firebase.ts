// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCw5ei9emypQefTo91rUuQsxSec6MyAPsY",
  authDomain: "studio-6440466613-89ca6.firebaseapp.com",
  projectId: "studio-6440466613-89ca6",
  storageBucket: "studio-6440466613-89ca6.appspot.com",
  messagingSenderId: "97580529198",
  appId: "1:97580529198:web:0c496e23af214f64d691bf"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, db, auth, storage };

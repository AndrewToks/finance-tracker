// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA2EYPt0qQoOawLE-0C0tVPzagH_HYpAk4",
  authDomain: "finance-tracker-6e120.firebaseapp.com",
  projectId: "finance-tracker-6e120",
  storageBucket: "finance-tracker-6e120.firebasestorage.app",
  messagingSenderId: "935215198825",
  appId: "1:935215198825:web:1e7c08403498b3fa96e8f8",
  measurementId: "G-6L54WS19HQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
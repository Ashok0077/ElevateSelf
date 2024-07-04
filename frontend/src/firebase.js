// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkyJIlMXH3ZPqBA19YTvQ61BJVJHcm2g4",
  authDomain: "elevateself.firebaseapp.com",
  projectId: "elevateself",
  storageBucket: "elevateself.appspot.com",
  messagingSenderId: "220947769640",
  appId: "1:220947769640:web:0190f878e5264f80f8881d",
  measurementId: "G-JS55Y0LBGJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;
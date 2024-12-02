// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import getStorage for Firebase Storage
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBkEuIT9lOOqn9JHSViqjfJsUYrAPiSwno",
  authDomain: "nsv-chatbot.firebaseapp.com",
  databaseURL: "https://nsv-chatbot-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nsv-chatbot",
  storageBucket: "nsv-chatbot.firebasestorage.app",
  messagingSenderId: "260944441289",
  appId: "1:260944441289:web:9fca45ef7e7d3e28108218",
  measurementId: "G-G19D4REX62"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app); // Initialize Firebase Storage
const auth = getAuth(app)
const googleProvider = getFirestore(app)
const db = getFirestore(app)


// Export analytics, app, and storage
export { analytics, app, storage, auth, googleProvider, db };

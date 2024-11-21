// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage"; // Import getStorage for Firebase Storage
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA-6fintAaUyUUWFBqnZmfsNwwnIV3x88c",
  authDomain: "nvschatbot.firebaseapp.com",
  databaseURL: "https://nvschatbot-default-rtdb.firebaseio.com",
  projectId: "nvschatbot",
  storageBucket: "nvschatbot.firebasestorage.app",
  messagingSenderId: "316590867227",
  appId: "1:316590867227:web:60d5804a62667245d809be",
  measurementId: "G-P9VTN89XR5"
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

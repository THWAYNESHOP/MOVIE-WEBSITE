// ================================================
// FIREBASE CONFIGURATION & INITIALIZATION
// ================================================
// Import Firebase core
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDCqpIC-YMWMNP_Bjdfhb5lmJDde0dBbqk",
  authDomain: "movie-website-24502.firebaseapp.com",
  projectId: "movie-website-24502",
  storageBucket: "movie-website-24502.firebasestorage.app",
  messagingSenderId: "786613840105",
  appId: "1:786613840105:web:1e484884495d2deeb32878",
  measurementId: "G-4MLBG7YKJJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const realtimeDb = getDatabase(app);

// Export for use in other modules
export { app, analytics, auth, db, realtimeDb };

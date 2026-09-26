import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDi0veT0CrHEIWTlvP_ARH_-nNGBSj3_n0",
  authDomain: "project-gram-cb46f.firebaseapp.com",
  projectId: "project-gram-cb46f",
  storageBucket: "project-gram-cb46f.firebasestorage.app",
  messagingSenderId: "65934895258",
  appId: "1:65934895258:web:49878d6733e5b7a6ab9723",
  measurementId: "G-00QCB9TLPJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Analytics is only available in browser environments
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

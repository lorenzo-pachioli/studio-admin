
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';


const firebaseConfig = {
  apiKey: process.env.APIKEY,
  authDomain: "pawsome-3ecdf.firebaseapp.com",
  projectId: "pawsome-3ecdf",
  storageBucket: "pawsome-3ecdf.firebasestorage.app",
  messagingSenderId: "975468319931",
  appId: "1:975468319931:web:acf7257acf39858211459e",
  measurementId: "G-YCSVDWTRMZ"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
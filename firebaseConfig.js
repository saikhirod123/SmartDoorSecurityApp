import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Replace with your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyDPJiu7RVWWQRsyLNVUZ6wRQ_0E67AljQM",
  authDomain: "uapp-e2de0.firebaseapp.com",
  projectId: "uapp-e2de0",
  storageBucket: "uapp-e2de0.appspot.com",
  messagingSenderId: "455005099357",
  appId: "1:455005099357:web:f6dcdef52d07a52c8384b4",
  measurementId: "G-H5007D7YC6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

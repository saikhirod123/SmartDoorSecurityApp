import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';

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

export const db = getFirestore(app);
export const storage = getStorage(app);

export const auth = Platform.OS === 'web'
  ? getAuth(app) // Web: use default web persistence
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage), // React Native: use AsyncStorage persistence
    });

import { initializeApp } from 'firebase/app';
// Optionally import the services that you want to use
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { get, getDatabase } from "firebase/database";
import { getFirestore } from "firebase/firestore";
// import {...} from "firebase/functions";
// import {...} from "firebase/storage";


// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDUGdDwaD6n_-AUn91Mu436m2zdv4cGKio",
  authDomain: "portal-d6a13.firebaseapp.com",
  databaseURL: "https://portal-d6a13-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "portal-d6a13",
  storageBucket: "portal-d6a13.appspot.com",
  messagingSenderId: "21131653481",
  appId: "1:21131653481:web:ab8f4ac5d2e2c2178fcdf8",
  measurementId: "G-BGER8FPF3S"
};

// initialise Firebase app
export const FIREBASE_APP = initializeApp(firebaseConfig);
// initialise Firebase auth for app
initializeAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(AsyncStorage)
});
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIRESTORE_DB = getFirestore(FIREBASE_APP);

import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
import { getAuth } from "firebase/auth";
import { get, getDatabase } from "firebase/database";
// import {...} from "firebase/firestore";
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

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_DB = getDatabase(FIREBASE_APP);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase

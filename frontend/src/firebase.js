// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Import Firestore

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARlWTS2gwiM5iER6zjTuwlo8EE3Hcui10",
  authDomain: "wordlegauntlet.firebaseapp.com",
  projectId: "wordlegauntlet",
  storageBucket: "wordlegauntlet.appspot.com",
  messagingSenderId: "1065529784421",
  appId: "1:1065529784421:web:bb6930fb44f51278612e8c",
  measurementId: "G-E8ZWGZV1X6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const analytics = getAnalytics(app);
const firestore = getFirestore(app); // Initialize Firestore

export { auth, firestore };

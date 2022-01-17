// Initialize Cloud Firestore through Firebase
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
const firebaseApp = initializeApp({
    apiKey: "AIzaSyDRCP3iIFJiyf6p5AsnFJY9ffT8Pj4IzkA",
    authDomain: "sand-ra.firebaseapp.com",
    projectId: "sand-ra",
    storageBucket: "sand-ra.appspot.com",
    messagingSenderId: "354634939769",
    appId: "1:354634939769:web:285159b2607caa8e3e43a8",
    measurementId: "G-86RW1WM9RG"
  });

const db = getFirestore(firebaseApp);
export default db
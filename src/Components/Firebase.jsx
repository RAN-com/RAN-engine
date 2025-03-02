import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc,updateDoc, setDoc } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyAmLlHeOgH573DVu_jaUHUyt1sGrQL97gc",
    authDomain: "lavanya-608c2.firebaseapp.com",
    projectId: "lavanya-608c2",
    storageBucket: "lavanya-608c2.firebasestorage.app",
    messagingSenderId: "600900008122",
    appId: "1:600900008122:web:7a34ecb32ceca127e36a83",
    measurementId: "G-FYKK0SW1C7"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Firestore instance

export { auth, db, collection, addDoc, getDocs, deleteDoc, doc,updateDoc, setDoc };

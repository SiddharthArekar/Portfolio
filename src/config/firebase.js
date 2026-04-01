import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCE40xoOd4lWrV8Q9xY_iIFSRI5Dooo44k",
    authDomain: "personal-portfolio-67d3a.firebaseapp.com",
    projectId: "personal-portfolio-67d3a",
    storageBucket: "personal-portfolio-67d3a.firebasestorage.app",
    messagingSenderId: "726037822324",
    appId: "1:726037822324:web:649c89e83c06f0e8798a21",
    measurementId: "G-6HGK09KXQM"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

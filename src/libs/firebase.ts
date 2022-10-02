import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCKTWXujINjkG4yj4PURQzjlnkDVPJRpcM",
  authDomain: "kompad-demo-364216.firebaseapp.com",
  projectId: "kompad-demo-364216",
  storageBucket: "kompad-demo-364216.appspot.com",
  messagingSenderId: "516864158744",
  appId: "1:516864158744:web:ba79a488a968310d26a76d",
  measurementId: "G-M4TKWVMMHS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const db = getFirestore(app);
export const storage = getStorage(app);

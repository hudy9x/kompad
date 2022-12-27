import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY_2,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN_2,
  projectId: process.env.REACT_APP_PROJECT_ID_2,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET_2,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID_2,
  appId: process.env.REACT_APP_APP_ID_2,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const db = getFirestore(app);
export const storage = getStorage(app);

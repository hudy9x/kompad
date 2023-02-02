import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB5sIk3WGEdJtNGcJ5DnBXgXYlPzAmsr0k",
  authDomain: "kompad-a9b60.firebaseapp.com",
  projectId: "kompad-a9b60",
  storageBucket: "kompad-a9b60.appspot.com",
  messagingSenderId: "431772304435",
  appId: "1:431772304435:web:aafe5ce57f7954e4d88f46",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const provider = new GoogleAuthProvider();
export const auth = getAuth();

export const db = getFirestore(app);
export const storage = getStorage(app);

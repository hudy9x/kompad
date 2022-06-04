import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../libs/firebase";

export const signIn = (email: string, pasword: string) => {
  return signInWithEmailAndPassword(auth, email, pasword);
};

export const signUp = (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const verifyEmail = async () => {
  auth.currentUser && (await sendEmailVerification(auth.currentUser));
};

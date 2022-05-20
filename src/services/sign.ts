import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, provider } from "../libs/firebase";

export const signIn = (email: string, pasword: string) => {
  signInWithEmailAndPassword(auth, email, pasword).then((useCredential) => {
    console.log(useCredential);
  });
};

import { AES, enc } from "crypto-js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../libs/firebase";

interface IKey {
  id?: string
  uid: string
  key: string
  prevKeys?: string[]
}

export const getSecretKeyFromCache = () => {
  return localStorage.getItem("SECRET_KEY") || ''
}

export const encryptText = (text: string) => {
  const key = getSecretKeyFromCache();
  return AES.encrypt(text, key).toString()
}

export const decryptText = (cipherText: string) => {
  const key = getSecretKeyFromCache()
  const bytes = AES.decrypt(cipherText, key);
  return bytes.toString(enc.Utf8)
}

export const getSecretKey = async (uid: string) => {
  const docSnap = await getDoc(doc(db, 'keys', uid))

  if (!docSnap.exists()) {
    return;
  }

  const data = docSnap.data() as IKey

  return data.key;

}

export const getNSaveSecretKey = async (uid: string) => {
  const key = await getSecretKey(uid)
  localStorage.setItem('SECRET_KEY', key || '')
}

export const isSecretKeyCached = () => {
  const cachedSecretKey = localStorage.getItem('SECRET_KEY') || ''
  if (cachedSecretKey) return true;

  return false;
}


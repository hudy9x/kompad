import { AES, enc } from "crypto-js"
import { doc, getDoc, setDoc } from "firebase/firestore"
import PasswordValidator from "password-validator"
import { message } from "../components/message"
import promptBox from "../components/Prompt"
import { db } from "../libs/firebase"

interface IKey {
  id?: string
  uid: string
  key: string
  prevKeys?: string[]
}

export const getSecretKeyFromCache = () => {
  return localStorage.getItem("SECRET_KEY") || ""
}

export const encryptText = (text: string) => {
  const key = getSecretKeyFromCache()
  return AES.encrypt(text, key).toString()
}

export const decryptText = (cipherText: string) => {
  const key = getSecretKeyFromCache()
  try {
const bytes = AES.decrypt(cipherText, key)
    return bytes.toString(enc.Utf8)
  } catch (error) {
    console.log(error)
    return ""
  }
}

export const getSecretKey = async (uid: string) => {
  const docSnap = await getDoc(doc(db, "keys", uid))

  if (!docSnap.exists()) {
    return
  }

  const data = docSnap.data() as IKey

  return data.key
}

export const setSecretKey = async (uid: string, key: string) => {
  // const docSnap = await getDoc(doc(db, "keys", uid))
  // let prevKeys: string[] = []
  //
  // if (docSnap.exists()) {
  //   const docData = docSnap.data() as IKey
  //   prevKeys = docData.prevKeys || []
  //   prevKeys.push(docData.key)
  // }

  await setDoc(doc(db, "keys", uid), {
    uid,
    key,
    // prevKeys,
  })
}

const secretKeySchema = new PasswordValidator();
secretKeySchema
 .is().min(4)
 .is().max(10)
 .has().uppercase()
 .has().lowercase()
 .has().digits(1)
 .has().not().spaces();

export const getNSaveSecretKey = async (uid: string) => {
  try {
    const key = await getSecretKey(uid)
    if (!key) {
      promptBox({
        title: "Entering a Secret Key",
        desc: "Please help us to protect your data with a secret key! Input your own key to ensure only you can access your information.",
        onValidate: (newKey) => {
          const isValid = secretKeySchema.validate(newKey) ? true : false

          if (!isValid) {
            message.error("Your secret key is invalid 😨 !")
          }

          return isValid
        },
        onOk: (newKey) => {
          setSecretKey(uid, newKey)
          localStorage.setItem("SECRET_KEY", newKey || "")
          message.success("Your secret key is set successfully 🎈 !")
        }
      })
    } else {
      localStorage.setItem("SECRET_KEY", key || "")
      Promise.resolve(1)
    }
  } catch (error) {
    Promise.reject(1)
  }
}

export const isSecretKeyCached = () => {
  const cachedSecretKey = localStorage.getItem("SECRET_KEY") || ""
  if (cachedSecretKey) return true

  return false
}

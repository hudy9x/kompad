import { useEffect, useState } from "react";
import { message } from "../components/message";
import promptBox from "../components/Prompt";
import {
  getNSaveSecretKey,
  getSecretKey,
  isSecretKeyCached,
  secretKeySchema,
  setSecretKey,
} from "../services/encryption";
import { useAuth } from "./useAuth";

export default function useKms() {
  const [hasSecretKey, setHasSecretKey] = useState(false)
  const { user } = useAuth();

  useEffect(() => {

    if (isSecretKeyCached()) {
      setHasSecretKey(true)
      return;
    }

// if (user && user.uid) {
//   const uid = user.uid
//   const key = await getSecretKey(uid)
//   if (!key) {
//     promptBox({
//       title: "Entering a Secret Key",
//       desc: "Please help us to protect your data with a secret key! Input your own key to ensure only you can access your information.",
//       onValidate: (newKey) => {
//         const isValid = secretKeySchema.validate(newKey) ? true : false
//
//         if (!isValid) {
//           message.error("Your secret key is invalid 😨 !")
//         }
//
//         return isValid
//       },
//       onOk: (newKey) => {
//         setSecretKey(uid, newKey)
//         localStorage.setItem("SECRET_KEY", newKey || "")
//         message.success("Your secret key is set successfully 🎈 !")
//       }
//     })
//   }
//
// }


    user && user.uid && getNSaveSecretKey(user.uid).then(() => {
      setHasSecretKey(true)
    }).catch(() => {
        setHasSecretKey(false)
      })
  }, [user]);

  return {
    hasSecretKey
  };
}

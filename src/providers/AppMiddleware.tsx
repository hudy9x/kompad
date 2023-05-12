import { useEffect, useState } from "react"
import { message } from "../components/message"
import promptBox from "../components/Prompt"
import { useAuth } from "../hooks/useAuth"
import { sendNotification } from "../libs/notify"
import {
  getSecretKey,
  isSecretKeyCached,
  secretKeySchema,
  setSecretKey,
  setSecretKeyToCache,
} from "../services/encryption"

export default function AppMiddleware({
  children,
}: {
  children: JSX.Element | JSX.Element[]
}) {
  const [hasSecretKey, setHasSecretKey] = useState(false)
  const { user } = useAuth()

  const getAndSaveSecretKey = async (uid: string) => {
    const key = await getSecretKey(uid)
    if (!key) {
      promptBox({
        title: "Entering a Secret Key",
        desc: "Please help us to protect your data with a secret key! Input your own key to ensure only you can access your information.",
        trailingDesc: (
          <>
            <div className="pt-4 w-72 text-sm whitespace-pre-line">
              Make sure your secret matches these conditions:
              <div>- Minimize 4 characters</div>
              <div>- Maximize 10 characters</div>
              <div>- Has an uppercase</div>
              <div>- Has a lowercase</div>
              <div>- At least a digit 0-9</div>
              <div>- Do not contains space</div>
            </div>
          </>
        ),
        onValidate: (newKey) => {
          const isValid = secretKeySchema.validate(newKey) ? true : false

          if (!isValid) {
            message.error("Your secret key is invalid 😨 !")
          }

          return isValid
        },
        onOk: (newKey) => {
          setSecretKey(uid, newKey)
          message.success("Your secret key is set successfully 🎈 !")
          setSecretKeyToCache(newKey)
          setHasSecretKey(true)
        },
      })
    } else {
      setSecretKeyToCache(key)
      setHasSecretKey(true)
    }
  }

  useEffect(() => {
    user &&
      user.uid &&
      sendNotification(`😻 ${user.email} is online at ${new Date()}`)
  }, [user])

  useEffect(() => {
    if (isSecretKeyCached()) {
      setHasSecretKey(true)
      return
    }

    user && user.uid && getAndSaveSecretKey(user.uid)

    // user && user.uid && getNSaveSecretKey(user.uid).then(() => {
    //   setHasSecretKey(true)
    // }).catch(() => {
    //   setHasSecretKey(false)
    // })
  }, [user])

  return <>{hasSecretKey ? children : null}</>
}

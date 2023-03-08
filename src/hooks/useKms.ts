import { useEffect } from "react";
import { getNSaveSecretKey, getSecretKey, isSecretKeyCached } from "../services/encryption";
import { useAuth } from "./useAuth";

export default function useKms() {
  const { user } = useAuth()

  useEffect(() => {

    if (isSecretKeyCached()) {
      return;
    }

    user && user.uid && getNSaveSecretKey(user.uid)

  }, [user])
  return 1;
}

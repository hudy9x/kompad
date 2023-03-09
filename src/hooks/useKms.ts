import { useEffect, useState } from "react";
import {
  getNSaveSecretKey,
  isSecretKeyCached,
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

import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../libs/firebase";
import { usePadStore } from "../store"
import { useNavigate } from "react-router-dom"
import { usePadListStore } from "../store/pad"
import { getIdUrl } from "../containers/PadActions/PadShareModal/utils"

export interface IAuthenUser {
  email: string | null;
  displayName: string | null;
  uid: string;
  photoURL: string | null;
}

interface IAuthenContext {
  checking: boolean;
  user: IAuthenUser | null;
}

export const AuthenContext = createContext<IAuthenContext>({
  checking: true,
  user: null,
});

interface AuthenProviderProps {
  children: JSX.Element | JSX.Element[];
}
export const AuthenProvider = ({ children }: AuthenProviderProps) => {
  const [authInfo, setAuthInfo] = useState<IAuthenContext>({
    checking: true,
    user: null,
  })
  const { filterByShared } = usePadListStore()
  const navigate = useNavigate();
  const setIdShared = usePadStore((state) => state.setIdShared)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const checkIdShared = window.location.href.includes("#share")
      if (checkIdShared) {
        const id = getIdUrl(window.location.href)
        setIdShared(id)
        filterByShared()
      }
      if (user && user.emailVerified) {
        setAuthInfo({
          checking: false,
          user: {
            displayName: user.displayName,
            email: user.email,
            photoURL: user.photoURL,
            uid: user.uid,
          },
        });
      } else {
        setAuthInfo({
          checking: false,
          user: null,
        });
        navigate('/signin')
      }
    });

    return () => {
      unsubscribe();
    };
  // eslint-disable-next-line 
  }, []);

  return (
    <AuthenContext.Provider value={authInfo}>{children}</AuthenContext.Provider>
  );
};

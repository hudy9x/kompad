import { useEffect, useState } from "react";
import { getUser, IUser } from "../services/users";
import { useAuth } from "./useAuth";

export const useCurrentUser = (): { info: IUser | null } => {
  const { checking, user } = useAuth();
  const [info, setInfo] = useState<IUser | null>(null);

  useEffect(() => {
    if (user) {
      getUser(user?.uid).then((user) => {
        setInfo(user);
      });
    }
  }, [checking, user]);

  return {
    info,
  };
};

import { useContext } from "react";
import { AuthenContext } from "../providers/Authenticator";

export const useAuth = () => {
  const authenUser = useContext(AuthenContext);
  return authenUser;
};

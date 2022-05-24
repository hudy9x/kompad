import { signOut } from "firebase/auth";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../libs/firebase";

function Signout() {
  const navigate = useNavigate();
  useEffect(() => {
    signOut(auth).then(
      () => {
        navigate("/signin");
      },
      () => {
        navigate("/signin");
      }
    );
  }, [navigate]);

  return <></>;
}

export default Signout;

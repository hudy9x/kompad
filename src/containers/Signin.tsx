import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { auth } from "../libs/firebase";
import { signIn } from "../services/sign";

function Signin() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      console.log(user);
    });
  }, []);

  return (
    <div>
      <button
        onClick={() => {
          signIn("huudai09@gmail.com", "test123");
        }}
        className="btn"
      >
        Sign in with Email
      </button>
    </div>
  );
}

export default Signin;

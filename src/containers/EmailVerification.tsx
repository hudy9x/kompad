import { Link, useSearchParams } from "react-router-dom";
import Email from "../assets/email.png";

export default function EmailVerification() {
  const [param] = useSearchParams();
  return (
    <div className="bg-gray-100 h-screen w-screen flex items-center justify-center">
      <div className="bg-white rounded-md shadow-lg py-10 px-8 text-center font-sans text-gray-500">
        <img
          src={Email}
          alt="email"
          className="w-14 h-14 m-auto text-yellow-400"
        />
        <h2 className="text-3xl font-bold my-4 text-gray-700">
          Check your email
        </h2>
        <p className="mt-6 ">
          We've sent you a magic link to{" "}
          <b className="text-gray-600">{param.get("email")}</b>.
        </p>
        <p className="mt-1">Please click the link to confirm your address</p>
        <div className="mt-4 text-xs text-gray-400">
          Can't see the email? Please check the spam folder.
        </div>
        <div className="mt-2 text-xs text-gray-400">
          If your email verified,{" "}
          <Link to={"/"} className="text-yellow-500 hover:underline">
            back to home
          </Link>
        </div>
      </div>
    </div>
  );
}

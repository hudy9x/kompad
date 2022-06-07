import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiClipboardCheck,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineGlobe,
} from "react-icons/hi";
import { useFormik } from "formik";
import { signIn, signUp, verifyEmail } from "../../services/sign";
import { addUser } from "../../services/users";
import { toTimestame } from "../../libs/date";
import { message } from "../../components/message";
import { useState } from "react";
import AvatarForm from "../AvatarForm";
import { isValidPassword } from "../../libs/password";
import { createFreePlan } from "../../services/plans";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      address: "",
      photoURL: "",
      dateOfBirth: new Date().toDateString(),
    },
    onSubmit: (user) => {
      const { email, password, address, dateOfBirth, fullname, photoURL } =
        user;

      if (loading) return;

      setLoading(true);

      if (!isValidPassword(password)) {
        message.error(`Should be 8-16 characters
Have uppercase letter
Have lowercase letter
Have at least 1 digit
And not have spaces`);

        setLoading(false);
        return;
      }

      signUp(email, password)
        .then(async (userCredential) => {
          const { user } = userCredential;

          await addUser({
            uid: user.uid,
            fullname,
            email,
            address,
            photoURL,
            dateOfBirth: toTimestame(dateOfBirth),
          });

          const res = await signIn(email, password);

          await createFreePlan();
          await verifyEmail();

          if (res) {
            navigate(`/email-verification?email=${email}`);
          }
        })
        .catch((error) => {
          console.dir(error.code);

          switch (error.code) {
            case "auth/invalid-email":
              message.error("Email already in use");
              break;

            case "auth/internal-error":
              message.error("Internal error");
              break;

            case "auth/email-already-in-use":
              message.error("Email already in use");
              break;

            default:
              message.error("Something went wrong");
              break;
          }
        })
        .finally(() => {
          setLoading(false);
        });
    },
  });

  return (
    <div>
      <div className="sign-container flex-col gap-8">
        <AvatarForm
          onSelect={(selected) => {
            formik.setFieldValue("photoURL", selected);
          }}
        />
        <div className="sign sign-up">
          <h2 className="sign-title flex items-center gap-2">
            <HiClipboardCheck className="h-7 w-7 rounded-full text-indigo-500 p-1.5 bg-indigo-100" />
            <span>Sign up</span>
          </h2>
          <p className="sign-desc">
            Become a member - by spending a few second to tell us some
            information about you
          </p>

          <form className="sign-form" onSubmit={formik.handleSubmit}>
            <div className="input-group">
              {/* <label htmlFor="email" className="block text-sm text-gray-700">
                Fullname
              </label> */}
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineUser
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="fullname"
                  id="fullname"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                  className="focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Fullname"
                />
              </div>
            </div>

            <div className="input-group">
              {/* <label htmlFor="email" className="block text-sm text-gray-700">
                Email
              </label> */}
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineMail
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                  placeholder="Email"
                  className="focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="input-group">
              {/* <label htmlFor="email" className="block text-sm text-gray-700">
                Password
              </label> */}
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineLockClosed
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="input-group inp-date">
              {/* <label htmlFor="email" className="block text-sm text-gray-700">
                Date of birth
              </label> */}
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineCalendar
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="date"
                  name="date"
                  id="date"
                  placeholder="Date of birth"
                  onChange={(ev) => {
                    formik.setFieldValue("dateOfBirth", ev.target.value);
                  }}
                  value={formik.values.dateOfBirth}
                  className="focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="input-group">
              {/* <label htmlFor="email" className="block text-sm text-gray-700">
                Date of birth
              </label> */}
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <HiOutlineGlobe
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Address"
                  onChange={formik.handleChange}
                  value={formik.values.address}
                  className="focus:ring-yellow-400 focus:border-yellow-400 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="input-group">
              <button
                type="submit"
                className="inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-yellow-900 bg-yellow-400 hover:bg-yellow-300"
              >
                Sign up
              </button>
            </div>

            <div className="input-group">
              <p className="text-gray-400 text-xs">
                Already have an account?{" "}
                <Link
                  to={"/signin"}
                  className="text-yellow-500 hover:underline"
                >
                  Back to sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;

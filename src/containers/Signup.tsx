import { Link, useNavigate } from "react-router-dom";
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiKey,
  HiClipboardCheck,
  HiOutlineCalendar,
  HiOutlineUser,
} from "react-icons/hi";
import { useFormik } from "formik";
import { signUp } from "../services/sign";

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      password: "",
      dateOfBirth: new Date().toDateString(),
    },
    onSubmit: ({ email, password }) => {
      signUp(email, password)
        .then((user) => {})
        .catch((error) => {});
    },
  });

  return (
    <div>
      <div className="sign-container">
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
              <label htmlFor="email" className="block text-sm text-gray-700">
                Fullname
              </label>
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email" className="block text-sm text-gray-700">
                Email
              </label>
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email" className="block text-sm text-gray-700">
                Password
              </label>
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
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="email" className="block text-sm text-gray-700">
                Date of birth
              </label>
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
                  onChange={(ev) => {
                    formik.setFieldValue("dateOfBirth", ev.target.value);
                  }}
                  value={formik.values.dateOfBirth}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="input-group">
              <button
                type="submit"
                className="inline-flex w-full justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign up
              </button>
            </div>

            <div className="input-group">
              <p className="text-gray-500 text-xs">
                Already have an account?{" "}
                <Link
                  to={"/signin"}
                  className="text-indigo-600 hover:underline"
                >
                  Back to sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

      {/* <button
        onClick={() => {
          signIn("huudai09@gmail.com", "test123").then((useCredential) => {
            navigate("/pad/1");
          });
        }}
        className="btn"
      >
        Sign in with Email
      </button> */}
    </div>
  );
}

export default Signup;

import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed, HiKey } from "react-icons/hi";
import { signIn } from "../services/sign";
import { useFormik } from "formik";

function Signin() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ email, password }) => {
      signIn(email, password).then((user) => {
        if (user) {
          navigate("/");
        } else {
          alert("username or password invalid");
        }
      });
    },
  });

  return (
    <div>
      <div className="sign-container">
        <div className="sign sign-in">
          <h2 className="sign-title flex items-center gap-3">
            <HiKey className="h-7 w-7 rounded-full text-green-500 p-1.5 bg-green-100" />
            <span>Welcome to Kompad</span>
          </h2>
          <p className="sign-desc">Please enter your email and password</p>

          <form className="sign-form mt-8" onSubmit={formik.handleSubmit}>
            <div className="input-group">
              {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="input-group">
              {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
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
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="input-group">
              <button
                type="submit"
                className="inline-flex w-full uppercase justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Sign in
              </button>
            </div>

            <div className="input-group">
              <p className="text-gray-500 text-xs">
                Don't have an account yet?{" "}
                <Link
                  to={"/signup"}
                  className="text-indigo-600 hover:underline"
                >
                  Create Account
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

export default Signin;

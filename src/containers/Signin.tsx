import { Link, useNavigate } from "react-router-dom";
import { HiOutlineMail, HiOutlineLockClosed, HiKey } from "react-icons/hi";
import { signIn } from "../services/sign";
import { useFormik } from "formik";
import { message } from "../components/message";

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
          message.success("Signing in successfully ! 😎")
          navigate("/");
        } else {
          alert("username or password invalid");
        }
      }).catch(err => {
        console.dir(err)
        let mess = ''
        switch (err.code) {
          case "auth/wrong-password":
            mess = "Wrong password";
            break;

          case "auth/user-not-found":
            mess = "User not found";
            break;

          case "auth/internal-error":
            mess = "Internal Error"
            break;

          case "auth/invalid-email":
            mess = "Invalid email"
            break;

          default:
            mess = "Something went wrong"
            break;
        }

        message.success(mess)
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

          <form className="sign-form mt-5" onSubmit={formik.handleSubmit}>
            <div className="input-group">
              {/* <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label> */}
              <div className="form-control">
                <div className="form-icon">
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
                  className=""
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
              <div className="form-control">
                <div className="form-icon">
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
                  className=""
                  placeholder="Password"
                />
              </div>
            </div>

            <div className="input-group">
              <button
                type="submit"
                className="btn btn-primary btn-xl btn-block"
              >
                Sign in
              </button>
            </div>

            <div className="input-group">
              <p className="text-gray-400 text-xs">
                Don't have an account yet?{" "}
                <Link
                  to={"/signup"}
                  className="text-color-primary hover:underline"
                >
                  Create Account
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}

export default Signin;

import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { HiLockOpen, HiOutlineMail } from "react-icons/hi";
import { sendResetPassword } from "../services/sign";
import { message } from "../components/message";

export default function ForgotPassword() {
  const formik = useFormik({
    initialValues: {
      email: ""
    },
    onSubmit: (({ email }) => {
      if (!email) {
        message.error("Please input a correct email address")
        return
      }
      sendResetPassword(email).then(() => {
        message.success(`An reset password link sent to "${email}". Please check it !`)
      }).catch(error => {
          message.error(error.message)
        })
    })
  })
  return <div className="sign-container">
    <div className="sign forgot-password">
      <h2 className="sign-title flex items-center gap-3">
        <HiLockOpen className="h-7 w-7 rounded-full text-yellow-500 p-1.5 bg-yellow-100" />
        <span>Forgot your password ?</span>
      </h2>
      <p className="sign-desc">Please enter your email address to recieve a reset password link</p>

      <form className="sign-form mt-5" onSubmit={formik.handleSubmit}>
        <div className="input-group">
          <div className="form-control">
            <div className="form-icon">
              <HiOutlineMail
                className="h-5 w-5"
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
          <button
            type="submit"
            className="btn btn-primary btn-xl btn-block"
          >
            Send reset link
          </button>
        </div>

      </form>
    </div>
    <p className="text-xs mt-6">
      <span className="opacity-80">Just remember password. </span>
      <Link
        to={"/signin"}
        className="text-color-primary hover:underline"
      >
        Back to sign in
      </Link>
    </p>
  </div>
}

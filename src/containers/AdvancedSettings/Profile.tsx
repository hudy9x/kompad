import {
  HiOutlineMail,
  HiOutlineCalendar,
  HiOutlineUser,
  HiOutlineGlobe,
} from "react-icons/hi"
import { useFormik } from "formik"
import { getUser, updateUserById } from "../../services/users"
import { toTimestame } from "../../libs/date"
import { message } from "../../components/message"
import { useEffect, useState } from "react"
import AvatarForm from "../AvatarForm"
import Button from "../../components/Button"
import { useAuth } from "../../hooks/useAuth"
import dayjs from "dayjs"
function Profile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const formik = useFormik({
    initialValues: {
      fullname: "",
      email: "",
      address: "",
      photoURL: "",
      dateOfBirth: "",
    },
    onSubmit: (values) => {
      const { address, dateOfBirth, fullname, photoURL } = values

      if (loading || !user?.uid) return

      setLoading(true)

      updateUserById(user?.uid, {
        fullname,
        photoURL,
        dateOfBirth: toTimestame(dateOfBirth),
        address,
      })
        .then(() => {
          message.success("Update profile succesfully")
        })
        .catch((err) => {
          console.log(err)
          message.error("Update profile error")
        })
        .finally(() => {
          setLoading(false)
        })
    },
  })

  useEffect(() => {
    if (user?.uid) {
      getUser(user.uid).then((userCre) => {
        if (!userCre) {
          return
        }

        const { address, dateOfBirth, email, fullname, photoURL } = userCre
        const dob = dayjs(dateOfBirth.toDate())

        formik.setValues({
          address: address,
          dateOfBirth: dob.format("YYYY-MM-DD"),
          // dateOfBirth: dateOfBirth.toDate().toDateString(),
          email: email,
          fullname: fullname,
          photoURL: photoURL,
        })
      })
    }

    // eslint-disable-next-line
  }, [user?.uid])

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="border border-color-base shadow-lg sm:rounded-md sm:overflow-hidden">
          <div className="advanced-setting-card">
            <div>
              <h3 className="title">Profile</h3>
              <p className="paragraph">
                This information will only be displayed on your app. So feel
                free to update it whatever you want
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div className="form-control col-span-3 sm:col-span-2">
                <label htmlFor="fullname">Fullname</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="form-icon">
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
                    placeholder=""
                  />
                </div>
              </div>

              <div className="form-control col-span-3">
                <label htmlFor="email">Email</label>
                <div className="mt-1 relative rounded-md shadow-sm">
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
                    readOnly={true}
                    // onChange={formik.handleChange}
                    value={formik.values.email}
                  />
                </div>
                <p className="mt-2 paragraph">
                  Email used for authentication process. So you can't update it
                  for now
                </p>
              </div>

              <div className="col-span-3 form-control">
                <label>Photo</label>
                <div className="mt-1 flex items-center">
                  <AvatarForm
                    defaultValue={formik.values.photoURL}
                    onSelect={(selected) => {
                      formik.setFieldValue("photoURL", selected)
                    }}
                  />
                </div>
              </div>

              <div className="form-control col-span-3">
                <label htmlFor="date">Date of birth</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="form-icon">
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
                      formik.setFieldValue("dateOfBirth", ev.target.value)
                    }}
                    value={formik.values.dateOfBirth}
                  />
                </div>
              </div>

              <div className="form-control col-span-3">
                <label htmlFor="address">Address</label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <div className="form-icon">
                    <HiOutlineGlobe
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-bottom">
            <Button submit>Save</Button>
          </div>
        </div>
      </form>
    </>
  )
}

export default Profile

import { useState, useEffect } from "react"
import { IoEarth } from "react-icons/io5"
import { IoMdArrowDropdown } from "react-icons/io"
import Modal from "../../components/Modal"
import { useCurrentUser } from "../../hooks/useCurrentUser"
import { usePadListStore } from "../../store/pad"
import { BsLink } from "react-icons/bs"
import { useFormik } from "formik";
import { getUserWithEmail } from "../../services/users"
import { message } from "../../components/message"
import { useAuth } from "../../hooks/useAuth"

export const PadShareModal = () => {
  const [visible, setVisible] = useState(false)
  const { title, isShareModal, setIsShareModal } = usePadListStore()
  const { info } = useCurrentUser()
  const { user } = useAuth();

  const formik = useFormik({
    initialValues:{
      email: "",
    },
    onSubmit: async ({ email }) => {
      try {
        getUserWithEmail(user?.uid!, email)
      } catch (error: any) {
        console.log(error);
        message.warning(error);
      }
    }
  })

  useEffect(() => {
    setVisible(isShareModal)
  }, [isShareModal])

  useEffect(() => {
    setIsShareModal(visible)
    //eslint-disable-next-line
  }, [visible])

  return (
    <Modal visible={visible} setVisible={setVisible}>
      <form onSubmit={formik.handleSubmit} className="w-auto text-color-base">
        <p className="text-lg leading-6 pb-4">{`Share: "${title}"`}</p>
        <div className="pb-4">
          <div className="form-control no-icon">
            <input
              type="text"
              name="email"
              id="pad-share"
              placeholder="Add people and groups"
              value={formik.values.email}
              onChange={formik.handleChange}
              className=""
            />
          </div>
        </div>
        <div className="pb-10">
          <p className="text-lg leading-6 pb-4">People with access rights</p>
          <ul>
            <li className="flex justify-between">
              <div className="flex">
                <div className="m-auto pr-4">
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={info?.photoURL}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm leading-6 font-semibold">{`${info?.fullname} (bạn)`}</p>
                  <p className="text-sm leading-6">{info?.email}</p>
                </div>
              </div>
              <div className="text-sm leading-6 pb-4"> Owner </div>
            </li>
          </ul>
        </div>
        <div className="pb-10">
          <p className="text-lg leading-6 pb-4">General Access</p>
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full flex justify-center flex-col items-center back bg-green-200">
              <IoEarth className="text-slate-950" />
            </div>
            <div className="pl-4">
              <div className="flex items-center">
                <p className="text-sm leading-6">Anyone with a link</p>
                <div className="pl-1">
                  <IoMdArrowDropdown />
                </div>
              </div>
              <p className="text-xs leading-6">
                Anyone with an Internet connection and this link can view it
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="btn btn-lg">
            <BsLink />
            <p className="pl-5">Copy link</p>
          </button>
          <button type="submit" className="btn btn-primary btn-lg">
            Done
          </button>
        </div>
      </form>
    </Modal>
  )
}

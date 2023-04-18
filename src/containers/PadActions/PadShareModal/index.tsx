import { useState, useEffect } from "react"
import { usePadListStore } from "../../../store/pad";
import { useCurrentUser } from "../../../hooks/useCurrentUser";
import { useFormik } from "formik";
import { IUser, getUserWithEmail } from "../../../services/users";
import Modal from "../../../components/Modal";
import { message } from "../../../components/message";
import { ButtonShare } from "./ButtonShare";
import { IoEarth } from "react-icons/io5"
import { IoMdArrowDropdown } from "react-icons/io"
import { PadShareListModal } from "./PadShareListModal";

export const PadShareModal = () => {
  const [visible, setVisible] = useState(false)
  const { title, isShareModal, setIsShareModal } = usePadListStore()
  const { info } = useCurrentUser()
  const [openListShare, setOpenListShare] = useState<boolean>(false)
  const [users, setUsers] = useState<IUser[]>([])
  const [isSearch, setIsSearch] = useState<boolean>(false)

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async ({ email }) => {
      try {
        const user = await getUserWithEmail(email) as unknown as IUser
        setIsSearch(true)
        if (user) {
          setUsers([user])
          return
        }

        setUsers([])
      } catch (error: any) {
        console.log(error);
        message.warning(error);
      }
    }
  })

  const handleClickUser = () => {
    setOpenListShare(true)
  }

  useEffect(() => {
    setIsSearch(false)
    setVisible(isShareModal)
  }, [isShareModal])

  useEffect(() => {
    setIsShareModal(visible)
    //eslint-disable-next-line
  }, [visible])

  return (
    <div>
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
                onBlur={() => setIsSearch(false)}
                className=""
              />
            </div>
            {users.length > 0 && isSearch && <ul className="bg-light rounded mt-3">
              {users.map((user) => (
                <li className="flex justify-between cursor-pointer" onClick={handleClickUser}>
                  <div className="flex">
                    <div className="m-auto pr-4">
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={user.photoURL}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-sm leading-6 font-semibold">{`${user.fullname}`}</p>
                      <p className="text-sm leading-6">{user.email}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>}

            {users.length === 0 && isSearch && <div className="p-4 text-sm text-gray-500">No pad found.</div>}
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
          <ButtonShare />
        </form>
      </Modal>
      <PadShareListModal visible={openListShare}/>
    </div>
  )
}

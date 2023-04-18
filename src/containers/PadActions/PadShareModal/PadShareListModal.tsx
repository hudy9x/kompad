import { useState } from "react"
import { useFormik } from "formik";
import Modal from "../../../components/Modal"
import { usePadListStore } from "../../../store/pad"
import { IUser, getUserWithEmail } from "../../../services/users";
import { message } from "../../../components/message";
import { Switch } from "@headlessui/react";
import { classNames } from "../../../libs/utils";
import { ButtonShare } from "./ButtonShare";

export const PadShareListModal = ({ visible }: {
  visible: boolean
}) => {
  const [visible, setVisible] = useState(false)
  const { title } = usePadListStore()
  const [users, setUsers] = useState<IUser[]>([])
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [enabled, setEnabled] = useState<boolean>(false)

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


  return (
    <Modal visible={visible} setVisible={setVisible}>
      <form onSubmit={formik.handleSubmit} className="w-auto text-color-base">
        <p className="text-lg leading-6 pb-4">{`Share: "${title}"`}</p>
        <div></div> {/* ====> Danh sach nguoi dung duoc chia se  */}
        <div>
          <input></input> {/* ====> tim kiem nguoi dung */}
          <div></div> {/* ====> set quyen chinh sua  */}
        </div>
        <div>
          <Switch
            checked={enabled}
            onChange={setEnabled}
            className={classNames(
              enabled ? "bg-primary" : "bg-light",
              "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none"
            )}
          >
            <span className="sr-only">Share List User</span>
            <span
              aria-hidden="true"
              className={classNames(
                enabled ? "translate-x-5" : "translate-x-0",
                "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
              )}
            />
          </Switch>
          <div>Notice to these people</div>
        </div>
        <div className="form-control no-icon mt-4">
          <div className="mt-1">
            <textarea
              placeholder="message"
              name="desc"
              id="pad-desc"
              value={''}
              onChange={formik.handleChange}
              className=""
            />
          </div>
        </div>
        <ButtonShare />
      </form>
    </Modal>
  )
}
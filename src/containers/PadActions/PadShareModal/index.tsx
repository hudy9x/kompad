import { useState, useEffect } from "react"
import { usePadStore } from "../../../store/index"
import Modal from "../../../components/Modal"
import { PadShareUser } from "./PadShareUser"
import { PadShareListUser } from "./PadShareListUser"
import { Provider } from "./context"
import { IUserShare } from "../../../services/pads"
import { Editor } from "@tiptap/react"

export const PadShareModal = ({ editor }: {
  editor: Editor
}) => {
  const [visible, setVisible] = useState(false)
  const { isPadShareModal, setIsPadShareModal } = usePadStore()
  const [selectedUser, setSelectedUser] = useState<IUserShare | null>(null)
  const [isOpenUser, setIsOpenUser] = useState<boolean>(true)
  const [isOpenListUser, setIsOpenListUser] = useState<boolean>(false)
  const [group, setGroup] = useState<IUserShare[]>([])

  useEffect(() => {
    setVisible(isPadShareModal)
  }, [isPadShareModal])

  useEffect(() => {
    if (visible) {
      setIsOpenUser(true)
      setIsOpenListUser(false)
    }
    setIsPadShareModal(visible)
  }, [visible, setIsPadShareModal])

  return (
    <div>
      <Modal visible={visible} setVisible={setVisible}>
        <Provider
          props={{
            setVisible,
            setSelectedUser,
            setIsOpenUser,
            setIsOpenListUser,
            setGroup,
            group,
            isOpenUser,
            isOpenListUser,
            selectedUser,
            editor,
          }}
        >
          <PadShareUser />
          <PadShareListUser />
        </Provider>
      </Modal>
    </div>
  )
}

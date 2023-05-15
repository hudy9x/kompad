import { useState, useEffect } from "react"
import { usePadStore } from "../../../store/index"
import Modal from "../../../components/Modal"
import { PadShareUser } from "./PadShareUser"
import { Provider } from "./context"
import { IPad, IUserShared, getPadById } from "../../../services/pads"

export const PadShareModal = () => {
  const [visible, setVisible] = useState(false)
  const { isOpenPadShareModal, openPadSharedModal } = usePadStore()
  const [selectedUser, setSelectedUser] = useState<IUserShared | null>(null)
  const [isOpenUser, setIsOpenUser] = useState<boolean>(true)
  const [isOpenListUser, setIsOpenListUser] = useState<boolean>(false)
  const [sharedUsers, setSharedUsers] = useState<IUserShared[]>([])
  const [padShared, setPadShared] = useState<IPad>()
  const { idShared } = usePadStore() 

  useEffect(() => {
    void (async () => {
      const pad = await getPadById(idShared!)
      if (!pad) return
      setPadShared(pad)
      setVisible(isOpenPadShareModal)
      pad.shared.sharedUsers ? setSharedUsers([...pad.shared.sharedUsers]) : setSharedUsers([])
    })()
  // eslint-disable-next-line    
  }, [isOpenPadShareModal])

  useEffect(() => {
    if (visible) {
      setIsOpenUser(true)
      setIsOpenListUser(false)
    }
    openPadSharedModal(visible)
  }, [visible, openPadSharedModal])

  return (
    <div>
      <Modal visible={visible} setVisible={setVisible}>
        <Provider
          props={{
            setVisible,
            setSelectedUser,
            setIsOpenUser,
            setIsOpenListUser,
            setSharedUsers,
            padShared,
            sharedUsers,
            isOpenUser,
            isOpenListUser,
            selectedUser,
          }}
        >
          <PadShareUser />
          {/* <PadShareListUser /> */}
        </Provider>
      </Modal>
    </div>
  )
}

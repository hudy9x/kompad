import { useState, useEffect } from "react"
import { usePadStore } from "../../../store/index"
import Modal from "../../../components/Modal"
import { PadShareUser } from "./PadShareUser"
import { PadShareListUser } from "./PadShareListUser"
import { Provider } from "./context"
import { IPad, IUserShare, getPadById } from "../../../services/pads"

export const PadShareModal = () => {
  const [visible, setVisible] = useState(false)
  const { isOpenPadShareModal, openPadSharedModal } = usePadStore()
  const [selectedUser, setSelectedUser] = useState<IUserShare | null>(null)
  const [isOpenUser, setIsOpenUser] = useState<boolean>(true)
  const [isOpenListUser, setIsOpenListUser] = useState<boolean>(false)
  const [group, setGroup] = useState<IUserShare[]>([])
  const [padShared, setPadShared] = useState<IPad>()
  const { idShared } = usePadStore() 

  useEffect(() => {
    void (async () => {
      const pad = await getPadById(idShared!)
      if (!pad) return
      setPadShared(pad)
      setVisible(isOpenPadShareModal)
      pad.shared.group ? setGroup([...pad.shared.group]) : setGroup([])
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
            setGroup,
            padShared,
            group,
            isOpenUser,
            isOpenListUser,
            selectedUser,
          }}
        >
          <PadShareUser />
          <PadShareListUser />
        </Provider>
      </Modal>
    </div>
  )
}

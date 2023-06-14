import { useState, useEffect } from "react"
import { usePadStore } from "../../../store/index"
import Modal from "../../../components/Modal"
import { Provider } from "./context"
import { IPad, ISharedPad, IUserShared, getPadById } from "../../../services/pads"
import { UserList } from "./UserList"
import { ALL_USERS_CAN_EDIT, Rules } from "./types"
import { UserSearch } from "./UserSearch"
import { UserRuleAssignment } from "./UserRuleAssignment"
import { UserShareActions } from "./UserShareActions"

const updatePermissionLevel = (padShared: ISharedPad) => {
  return padShared.editedUsers === ALL_USERS_CAN_EDIT
    ? Rules.Edit
    : Rules.View
}

const updateAccessLevel = (padShared: ISharedPad) => {
  return padShared.accessLevel === Rules.None ? Rules.Limit : padShared.accessLevel
}

export const PadShareModal = () => {
  const [visible, setVisible] = useState(false)
  const { isOpenPadShareModal, openPadSharedModal } = usePadStore()
  const [isOpenUser, setIsOpenUser] = useState<boolean>(true)
  const [hasBeenShared, setHasBeenShared] = useState<boolean>(false)
  const [padShared, setPadShared] = useState<IPad>()
  const [accessLevel, setAccessLevel] = useState<Rules>(Rules.Limit)
  const [permissionLevel, setPermissionLevel] = useState<Rules>(Rules.View)
  const [sharedUsers, setSharedUsers] = useState<IUserShared[]>([])
  const { idShared } = usePadStore()

  useEffect(() => {
    void (async () => {
      const pad = await getPadById(idShared!)
      if (!pad || !pad.shared) return
      
      setHasBeenShared(pad.shared.accessLevel !== Rules.None ? true : false)
      setPadShared(pad)
      setPermissionLevel(updatePermissionLevel(pad.shared))
      setAccessLevel(updateAccessLevel(pad.shared))
      setVisible(isOpenPadShareModal)
      pad.shared.sharedUsers
        ? setSharedUsers([...pad.shared.sharedUsers])
        : setSharedUsers([])
    })()
    // eslint-disable-next-line
  }, [isOpenPadShareModal])

  useEffect(() => {
    if (visible) {
      setIsOpenUser(true)
    }
    openPadSharedModal(visible)
  }, [visible, openPadSharedModal])

  return (
    <div>
      <Modal visible={visible} setVisible={setVisible}>
        <Provider
          props={{
            setVisible,
            setIsOpenUser,
            setSharedUsers,
            setAccessLevel,
            setPermissionLevel,
            permissionLevel,
            accessLevel,
            padShared,
            sharedUsers,
            isOpenUser,
            visible,
            hasBeenShared,
          }}
        >
          <div className="container-modal-share">
            <p className="text-lg leading-6 pb-4">{`Share: "${padShared?.title}"`}</p>
            <UserSearch />
            <UserList />
            <UserRuleAssignment />
            <UserShareActions />
          </div>
        </Provider>
      </Modal>
    </div>
  )
}

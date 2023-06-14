import { BsLink } from "react-icons/bs"
import { ALL_USERS_CAN_EDIT, ProviderProps, Rules } from "./types"
import { ISharedPad, defaultShared, setShared } from "../../../services/pads"
import { getCurrentURL, getEmailsRuleEdit } from "./utils"
import { decryptText } from "../../../services/encryption"
import { Context } from "./context"
import { useContext } from "react"
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard"
import { message } from "../../../components/message"
import { usePadStore } from "../../../store"
import { TbShareOff } from "react-icons/tb"

export const UserShareActions = () => {
  const {
    padShared,
    sharedUsers,
    accessLevel,
    permissionLevel,
    hasBeenShared,
    setVisible,
  } = useContext(Context) as ProviderProps
  const copy = useCopyToClipboard()
  const { idShared } = usePadStore()
  const handleClickShare = async () => {
    try {
      const reqShared: ISharedPad = {
        sharedUsers: sharedUsers,
        accessLevel: accessLevel,
        viewedUsers: sharedUsers.map((item) => item.email),
        editedUsers:
          accessLevel === Rules.Anyone && permissionLevel === Rules.Edit
            ? ALL_USERS_CAN_EDIT
            : getEmailsRuleEdit(sharedUsers),
      }
      const contentPad = padShared && decryptText(padShared.cipherContent)
      if (!contentPad) return
      if (accessLevel === Rules.Limit && sharedUsers.length === 0) {
        message.success("Please add user to share")
        return
      }

      await setShared(reqShared, idShared, contentPad)

      message.success("Shared successfully")
      setVisible(false)
    } catch (err) {
      message.error("Shared error")
    }
  }

  const handleClickCopy = () => {
    copy(getCurrentURL())
    message.success("Copy link successfully")
  }

  const handleStopSharing = async () => {
    await setShared(defaultShared, idShared)

    message.success("Stop sharing successfully")
    setVisible(false)
  }

  return (
    <div className="flex justify-between">
      <div>
        <button type="button" className="btn btn-lg mr-2" onClick={handleClickCopy}>
          <BsLink />
          <p className="pl-3">Copy link</p>
        </button>
        {hasBeenShared && <button type="button" className="btn btn-lg" onClick={handleStopSharing}>
          <TbShareOff />
          <p className="pl-3">Stop Sharing</p>
        </button>}
      </div>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={handleClickShare}
      >
        Done
      </button>
    </div>
  )
}

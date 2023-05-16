import { BsLink } from "react-icons/bs"
import { ALL_USERS_CAN_EDIT, ProviderProps, Rules } from "./types"
import { ISharedPad, setShared } from "../../../services/pads"
import { getCurrentURL, getEmailsRuleEdit } from "./utils"
import { decryptText } from "../../../services/encryption"
import { Context } from "./context"
import { useContext } from "react"
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard"
import { message } from "../../../components/message"
import { usePadStore } from "../../../store"

export const UserShareActions = () => {
  const {
    padShared,
    sharedUsers,
    accessLevel,
    permissionLevel,
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
    setVisible(false)
  }

  return (
    <div className="flex justify-between">
      <button type="button" className="btn btn-lg" onClick={handleClickCopy}>
        <BsLink />
        <p className="pl-5">Copy link</p>
      </button>
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

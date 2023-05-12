import { useContext, useEffect, useState } from "react"
import { useFormik } from "formik"
import { IUser, getUserWithEmail } from "../../../services/users"
import { message } from "../../../components/message"
import { ButtonShareModal } from "./ButtonShareModal"
import { IoMdArrowBack } from "react-icons/io"
import { GrFormClose } from "react-icons/gr"
import { OutsideClickHandler } from "../../../components/OutsideClickHandler"
import { IOption, ListBoxOptions } from "../../../components/ListBox"
import { ProviderProps, Rules } from "./types"
import { ISharedPad, IUserShare, setShared } from "../../../services/pads"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard"
import { getCurrentURL, updateAllUser } from "./utils"
import { Context } from "./context"
import { decryptText } from "../../../services/encryption"
import { usePadStore } from "../../../store"

export const rules: IOption[] = [
  {
    name: Rules.View,
    unavailable: true,
  },
  {
    name: Rules.Edit,
    unavailable: false,
  },
]

export const PadShareListUser = () => {
  const {
    setIsOpenListUser,
    setIsOpenUser,
    setVisible,
    group,
    isOpenListUser,
    selectedUser,
    padShared,
  } = useContext(Context) as ProviderProps
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [searchUser, setSearchUser] = useState<IUser | null>(null)
  const [permissionLevel, setPermissionLevel] = useState<Rules>(Rules.View)
  const copy = useCopyToClipboard()
  const [users, setUsers] = useState<IUserShare[]>([])
  const [note, setNote] = useState<string>("")
  const { idShared } = usePadStore()
  const { info } = useCurrentUser()

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async ({ email }) => {
      try {
        const user = (await getUserWithEmail(email)) as unknown as IUser
        setIsSearch(true)
        if (user) {
          setSearchUser(user)
          return
        }

        setSearchUser(null)
      } catch (error) {
        console.log(error)
        message.warning(error as unknown as string)
      }
    },
  })

  const handleClickBack = () => {
    setUsers([])
    setIsOpenUser(true)
    setIsOpenListUser(false)
  }

  const handleDeleteUser = (index: number) => {
    if (!users) return
    const newUsers = users.filter((user, i) => i !== index)

    message.success("Delete user successfully")
    setUsers(newUsers)
  }

  const handleClickUser = (user: IUser) => {
    if (!users) return

    const isCurrentUser = info?.email === user.email
    const isExistingUser = users.some((item) => item.email === user.email)

    if (isCurrentUser) {
      message.warning("User search and account must not be the same")
      return
    }

    if (isExistingUser) {
      message.warning("Existing user")
      return
    }

    const userShare: IUserShare = {
      fullName: user.fullname,
      email: user.email,
      photoURL: user.photoURL,
      isEdit: false,
    }
    setUsers([...users, userShare])
  }

  const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let { name, value } = e.target
    if (name === "note") {
      setNote(value)
    }
  }

  const handleSelectedRule = (rule: Rules) => {
    setPermissionLevel(rule)
    message.success("Access privileges have been modified")
  }

  const handleClickShare = async () => {
    const usersUpdate = updateAllUser(users, permissionLevel);
    const emails = [...group, ...usersUpdate].map((user) => user.email)
    const sharedEmails = [...emails]
    const canEditEmails = permissionLevel === Rules.Edit ? sharedEmails : []
    const reqShared: ISharedPad = {
      group: [...group, ...usersUpdate],
      emails,
      edits: canEditEmails,
      accessLevel: Rules.Limit,
      note,
    }
    try {
      const contentPad = padShared && decryptText(padShared.cipherContent)
      if (!contentPad) return;
      
      await setShared(reqShared, idShared, contentPad)
      message.success("Shared successfully")
      setVisible(false)
    } catch {
      message.error("Shared error")
    }
  }

  const handleClickCopy = () => {
    copy(getCurrentURL())
    message.success("Copy link successfully")
    setVisible(false)
  }

  useEffect(() => {
    if (!selectedUser) return
    setUsers([selectedUser])
  }, [selectedUser])

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`${
        isOpenListUser ? "width-modal-share text-color-base" : "hidden"
      }`}
    >
      <div className="flex items-center pb-4">
        <IoMdArrowBack className="w-6 h-6 mr-4" onClick={handleClickBack} />
        <h2 className="text-lg leading-6">{`Share "${padShared?.title}"`}</h2>
      </div>
      <div className="mb-4">
        {users.map((user, index) => (
          <div key={index} className="rounded-3xl inline-block bg-light mr-2">
            <div className="flex items-center px-2">
              <div>{user?.photoURL}</div>
              <span className="pb-1 mr-2">{user?.fullName}</span>
              <GrFormClose onClick={() => handleDeleteUser(index)} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <div className="form-control no-icon mr-4 grow relative w-full">
          <OutsideClickHandler onOutsideClick={() => setIsSearch(false)}>
            <input
              type="text"
              name="email"
              id="pad-share-list-user"
              placeholder="Add people and groups"
              value={formik.values.email}
              onChange={formik.handleChange}
              className=""
            />
            <div className="bg-light rounded absolute w-full z-10">
              {searchUser && isSearch && (
                <div
                  className="flex justify-between cursor-pointer"
                  onClick={() => handleClickUser(searchUser)}
                >
                  <div className="flex">
                    <div className="m-auto pr-4">
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={searchUser.photoURL}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-sm leading-6 font-semibold">{`${searchUser.fullname}`}</p>
                      <p className="text-sm leading-6">{searchUser.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </OutsideClickHandler>
        </div>
        <ListBoxOptions
          options={rules}
          selected={permissionLevel}
          customContainer="w-52 relative"
          customButton="btn btn-primary btn-lg w-full"
          customOptions="bg-light absolute w-full rounded z-50 cursor-pointer"
          onSelected={handleSelectedRule}
        />
      </div>
      <div className="form-control no-icon mt-4">
        <div className="mt-1">
          <textarea
            placeholder="Note"
            name="note"
            value={note}
            onChange={(e) => handleChangeNote(e)}
            className="h-28"
          />
        </div>
      </div>
      <div className="mt-10">
        <ButtonShareModal
          onClickShare={handleClickShare}
          onClickCopy={handleClickCopy}
        />
      </div>
    </form>
  )
}

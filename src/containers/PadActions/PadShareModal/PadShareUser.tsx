import { useFormik } from "formik"
import { useContext, useEffect, useState } from "react"
import { AiTwotoneLock } from "react-icons/ai"
import { IoMdArrowDropdown } from "react-icons/io"
import { IoEarth } from "react-icons/io5"
import { IOption, ListBoxOptions } from "../../../components/ListBox"
import { message } from "../../../components/message"
import { OutsideClickHandler } from "../../../components/OutsideClickHandler"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import {
  IPad,
  ISharedPad,
  IUserShare,
  setShared,
} from "../../../services/pads"
import { getUserWithEmail, IUser } from "../../../services/users"
import { ButtonShareModal } from "./ButtonShareModal"
import { rules } from "./PadShareListUser"
import { ProviderProps, Rules } from "./types"
import { useCopyToClipboard } from "../../../hooks/useCopyToClipboard"
import { createNewUserShare, getCurrentURL, getEdits, isSearchAndAccountSame, isUserAlreadyInGroup } from "./utils"
import { Context } from "./context"
import { useAuth } from "../../../hooks/useAuth"
import { decryptText } from "../../../services/encryption"
import { usePadStore } from "../../../store"

const accessOptions: IOption[] = [
  {
    name: Rules.Limit,
    unavailable: true,
  },
  {
    name: Rules.Anyone,
    unavailable: false,
  },
]

export const ALL_USERS_CAN_EDIT = 'ALL'

const initialPermissionLevel = (padShared: IPad | undefined) => {
  return padShared && padShared.shared.edits === ALL_USERS_CAN_EDIT ? Rules.Edit : Rules.View
}

const initialAccessLevel = (padShared: IPad) => {
  return padShared && padShared?.shared.accessLevel
}

export const PadShareUser = () => {
  const {
    setSelectedUser,
    setVisible,
    setIsOpenListUser,
    setIsOpenUser,
    setGroup,
    padShared,
    group,
    isOpenUser,
  } = useContext(Context) as ProviderProps
  const [accessLevel, setAccessLevel] = useState<Rules>(initialAccessLevel(padShared!))
  const [permissionLevel, setPermissionLevel] = useState<Rules>(initialPermissionLevel(padShared))
  const [userSearch, setUserSearch] = useState<IUser | null>(null)
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const copy = useCopyToClipboard()
  const { idShared } = usePadStore()
  const { info } = useCurrentUser()
  const { user } = useAuth()

  const handleClickUser = (user: IUser) => {
    if (isSearchAndAccountSame(user, info!)) {
      message.error("You can't share the list with yourself")
      return
    }

    if(isUserAlreadyInGroup(user, group)) {
      message.error("Sorry,this user is already in the shared list")
      return
    }

    const userShare: IUserShare = createNewUserShare(user)

    setIsOpenListUser(true)
    setIsOpenUser(false)
    setSelectedUser(userShare)
    setIsSearch(true)
  }

  const handleSelectedRule = async (rule: Rules, email: string) => {
    switch (rule) {
      case Rules.Anyone:
        setGroup([])
        setAccessLevel(rule)
        break
      case Rules.Limit:
        padShared?.shared.group ? setGroup([...padShared.shared.group]) : setGroup([])
        setAccessLevel(rule)
        break
      case Rules.Edit:
      case Rules.View:
        if (accessLevel === Rules.Anyone) {
          setPermissionLevel(rule)
        } else {
          const updateUser = group.map((user) => user.email === email ? {
            ...user,
            isEdit: rule === Rules.Edit ? true : false,
          } : user)
          
          setGroup(updateUser)
        }
        break;
      default:
        return;
    }
    message.success("Access privileges have been modified")
  }

  const handleClickShare = async () => {
    try {
      const reqShared: ISharedPad = {
        group: group,
        accessLevel: accessLevel,
        emails: group.map((item) => item.email),
        edits: accessLevel === Rules.Anyone && permissionLevel === Rules.Edit ? ALL_USERS_CAN_EDIT : getEdits(group),
      }
      const contentPad = padShared && decryptText(padShared.cipherContent)
      if (!contentPad) return;
      
      await setShared(reqShared, idShared, contentPad)

      message.success("Shared successfully")
      setVisible(false)
    } catch (err) {
      message.error("Shared error")
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: async ({ email }) => {
      try {
        const user = (await getUserWithEmail(email)) as unknown as IUser
        setIsSearch(true)
        if (user) {
          setUserSearch(user)
          return
        }

        setUserSearch(null)
      } catch (error: any) {
        console.log(error)
        message.warning(error)
      }
    },
  })

  const handleClickCopy = () => {
    copy(getCurrentURL())
    message.success("Copy link successfully")
    setVisible(false)
  }

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={`${isOpenUser ? "width-modal-share text-color-base" : "hidden"
        }`}
    >
      <p className="text-lg leading-6 pb-4">{`Share: "${padShared?.title}"`}</p>
      <div className="pb-4">
        <OutsideClickHandler onOutsideClick={() => setIsSearch(false)}>
          <div className="form-control no-icon">
            <input
              type="text"
              name="email"
              id="pad-share-user"
              placeholder="Add people and groups"
              value={formik.values.email}
              onChange={formik.handleChange}
              className=""
            />
            {userSearch && isSearch && (
              <ul className="bg-light rounded w-full absolute">
                <li
                  className="flex justify-between cursor-pointer"
                  onClick={() => handleClickUser(userSearch)}
                >
                  <div className="flex">
                    <div className="m-auto pr-4">
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={userSearch.photoURL}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-sm leading-6 font-semibold">{`${userSearch.fullname}`}</p>
                      <p className="text-sm leading-6">{userSearch.email}</p>
                    </div>
                  </div>
                </li>
              </ul>
            )}

            {!userSearch && isSearch && (
              <div className="bg-light p-4 text-sm text-gray-500 w-full absolute">
                No pad found.
              </div>
            )}
          </div>
        </OutsideClickHandler>
      </div>
      <div className="pb-10">
        <p className="text-lg leading-6 pb-4">People with access rights</p>
        <ul>
          {padShared?.uid === user?.uid && <li className="flex justify-between">
            <div className="flex">
              <div className="m-auto pr-4">
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src={info?.photoURL}
                  alt=""
                />
              </div>
              <div>
                <p className="text-sm leading-6 font-semibold">{`${info?.fullname} (you)`}</p>
                <p className="text-sm leading-6">{info?.email}</p>
              </div>
            </div>
            <div className="flex items-center text-sm leading-6 pb-4">
              Owner
            </div>
          </li>}
          {group.map((user, id) => (
            <li key={id} className="flex justify-between">
              <div className="flex">
                <div className="m-auto pr-4">
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={user.photoURL}
                    alt=""
                  />
                </div>
                <div>
                  <p className="text-sm leading-6 font-semibold">{user.fullName}</p>
                  <p className="text-sm leading-6">{user.email}</p>
                </div>
              </div>
              <ListBoxOptions
                options={rules}
                selected={user.isEdit ? Rules.Edit : Rules.View}
                data={user.email}
                customContainer="relative"
                customButton="btn btn-sm"
                customOptions="bg-light absolute right-0 w-36 rounded z-50 cursor-pointer"
                onSelected={handleSelectedRule}
              />
            </li>
          ))}
        </ul>
      </div>
      <div className="pb-10">
        <p className="text-lg leading-6 pb-4">General Access</p>
        <div className="flex justify-between">
          <div className="flex items-center">
            <div
              className={`w-8 h-8 rounded-full flex justify-center flex-col items-center back ${accessLevel === Rules.Anyone ? "bg-green-200" : "bg-slate-200"
                }`}
            >
              {accessLevel === Rules.Anyone ? (
                <IoEarth className="text-slate-950" />
              ) : (
                <AiTwotoneLock className="text-slate-950" />
              )}
            </div>
            <div className="ml-2">
              <div className="flex items-center">
                <p className="text-sm leading-6">{accessLevel}</p>
                <ListBoxOptions
                  options={accessOptions}
                  Icon={IoMdArrowDropdown}
                  customContainer="pl-2"
                  customButton="btn-rule rounded-sm"
                  customOptions="bg-light absolute w-36 rounded z-50 cursor-pointer"
                  onSelected={handleSelectedRule}
                />
              </div>
              <p className="text-xs leading-6">
                {accessLevel === Rules.Anyone
                  ? "Anyone with an Internet connection and this link can view it"
                  : "Only those who have access can open using this link"}
              </p>
            </div>
          </div>
          {accessLevel === Rules.Anyone && (
            <ListBoxOptions
              options={rules}
              selected={permissionLevel}
              customContainer="relative"
              customButton="btn btn-sm"
              customOptions="bg-light absolute right-0 w-36 rounded z-50 cursor-pointer"
              onSelected={handleSelectedRule}
            />
          )}
        </div>
      </div>
      <ButtonShareModal
        onClickShare={handleClickShare}
        onClickCopy={handleClickCopy}
      />
    </form>
  )
}

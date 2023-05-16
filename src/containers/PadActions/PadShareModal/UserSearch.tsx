import { useContext, useEffect, useState } from "react"
import { OutsideClickHandler } from "../../../components/OutsideClickHandler"
import { searchEmail } from "../../../libs/search"
import { IUserSearch, ProviderProps, Rules } from "./types"
import { Context } from "./context"
import { IUserShared } from "../../../services/pads"
import { checkUserSearchMatch } from "./utils"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { message } from "../../../components/message"

export const UserSearch = () => {
  const { setSharedUsers , sharedUsers, accessLevel } = useContext(Context) as ProviderProps
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [valueSearch, setValueSearch] = useState<string>("")
  const [usersSearch, setUsersSearch] = useState<IUserSearch[]>([])
  const { info } = useCurrentUser()

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setValueSearch(value)
    setIsSearch(true)
  }

  const handleClick = (user: IUserSearch) => {
    if(checkUserSearchMatch(user, info, sharedUsers)) {
      message.info('User already exists')
      return
    }
    if(accessLevel === Rules.Anyone) {
      message.info('Please select rule limit')
      return 
    }
    
    const updateUser: IUserShared = {
      ...user,
      isEdit: false,
    }
    setIsSearch(false)
    setSharedUsers((prev) => [...prev, updateUser])
  }

  useEffect(() => {
    void (async () => {
      const users = await searchEmail(valueSearch)
      console.log(users)
      setUsersSearch(users)
    })()
  }, [valueSearch])

  return (
    <div className="pb-4">
      <OutsideClickHandler onOutsideClick={() => setIsSearch(false)}>
        <div className="form-control no-icon">
          <input
            type="text"
            id="pad-share-user"
            placeholder="Add people and groups"
            value={valueSearch}
            onChange={handleChange}
            className=""
          />
          {isSearch && (
            <ul className="dropdown absolute w-full max-h-52">
              {usersSearch.map((user) => (
                <li
                  className="dropdown-content px-0 py-0"
                  onClick={() => handleClick(user)}
                >
                  <div className="flex ml-4">
                    <div className="m-auto pr-4">
                      <img
                        className="inline-block h-9 w-9 rounded-full"
                        src={user.photoURL}
                        alt=""
                      />
                    </div>
                    <div>
                      <p className="text-sm leading-6 font-semibold dropdown-text">{`${user.fullname}`}</p>
                      <p className="text-sm leading-6 dropdown-text">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </OutsideClickHandler>
    </div>
  )
}

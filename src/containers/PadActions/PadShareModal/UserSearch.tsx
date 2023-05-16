import { useState } from "react"
import { OutsideClickHandler } from "../../../components/OutsideClickHandler"
import { IUser } from "../../../services/users"

export const UserSearch = () => {
  const [isSearch, setIsSearch] = useState<boolean>(false)
  const [userSearch, setUserSearch] = useState<IUser | null>(null)

  return (
    <div className="pb-4">
    <OutsideClickHandler onOutsideClick={() => setIsSearch(false)}>
      <div className="form-control no-icon">
        <input
          type="text"
          name="email"
          id="pad-share-user"
          placeholder="Add people and groups"
          value={''}
          onChange={() => {}}
          className=""
        />
        {userSearch && isSearch && (
          <ul className="bg-light rounded w-full absolute">
            <li
              className="flex justify-between cursor-pointer"

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
            No user found.
          </div>
        )}
      </div>
    </OutsideClickHandler>
  </div>
  )
}
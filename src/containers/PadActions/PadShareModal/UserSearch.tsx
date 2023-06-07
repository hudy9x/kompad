import { useContext, useEffect, useRef, useState } from "react"
import { OutsideClickHandler } from "../../../components/OutsideClickHandler"
import { searchEmail } from "../../../libs/search"
import { IUserSearch, ProviderProps, Rules } from "./types"
import { Context } from "./context"
import { IUserShared } from "../../../services/pads"
import { checkUserSearchMatch } from "./utils"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { message } from "../../../components/message"

export const UserSearch = () => {
	const { setSharedUsers, sharedUsers, accessLevel, visible } = useContext(Context) as ProviderProps
	const [isSearch, setIsSearch] = useState<boolean>(false)
	const [valueSearch, setValueSearch] = useState<string>("")
	const [usersSearch, setUsersSearch] = useState<IUserSearch[]>([])
	const inputRef = useRef<HTMLInputElement | null>(null)
	const { info } = useCurrentUser()

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		setValueSearch(value)
		setIsSearch(true)
	}

	const handleClick = (user: IUserSearch) => {
		if (checkUserSearchMatch(user, info, sharedUsers)) {
			message.info('User already exists')
			return
		}
		if (accessLevel === Rules.Anyone) {
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
			setUsersSearch(users)
		})()
	}, [valueSearch])

	useEffect(() => {
		setTimeout(() => {
			if (!inputRef.current) return
			inputRef.current.select()
		}, 200)
	}, [visible])

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
						<ul className="dropdown absolute top-11 w-full max-h-52">
							{usersSearch.map((user) => {
								const noPhoto = !user.photoURL
								let shortName = user.fullname.split(/\s+/)

								shortName = shortName
									.slice(shortName.length - 2, shortName.length)
									.filter(Boolean)
									.map(n => n[0].toUpperCase())

								return (
									<li
										className="dropdown-content px-0 py-0"
										onClick={() => handleClick(user)}
									>
										<div className="flex ml-4">
											<div className="m-auto pr-4">
												{noPhoto ? <div
													className="inline-flex items-center justify-center h-9 w-9 rounded-full text-gray-50 bg-indigo-400">
													{shortName.join('')}</div>
													: <img
														className="inline-block h-9 w-9 rounded-full"
														src={user.photoURL}
														alt=""
													/>}
											</div>
											<div className="py-1">
												<p className="text-sm leading-6 font-semibold dropdown-text">{`${user.fullname}`}</p>
												<p className="text-sm leading-6 dropdown-text">
													{user.email}
												</p>
											</div>
										</div>
									</li>
								)
							})}
						</ul>
					)}
				</div>
			</OutsideClickHandler>
		</div>
	)
}

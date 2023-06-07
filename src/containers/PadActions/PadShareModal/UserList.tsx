import { useContext } from "react"
import { ListBoxOptions } from "../../../components/ListBox"
import { ProviderProps, Rules, permissionLevelOption } from "./types"
import { Context } from "./context"
import { useCurrentUser } from "../../../hooks/useCurrentUser"
import { message } from "../../../components/message"
import { useAuth } from "../../../hooks/useAuth"
import { AiOutlineUserDelete } from "react-icons/ai"

export const UserList = () => {
	const {
		padShared,
		sharedUsers,
		setSharedUsers,
	} = useContext(Context) as ProviderProps
	const { info } = useCurrentUser()
	const { user } = useAuth()

	const handleSelectedRule = async (rule: Rules, email: string) => {
		const updateUser = sharedUsers.map((user) => user.email === email ? {
			...user,
			isEdit: rule === Rules.Edit ? true : false,
		} : user)

		setSharedUsers(updateUser)
		message.success("Access privileges have been modified")
	}

	const handleDeleteUser = (index: number) => {
		if (!sharedUsers) return
		const newUsers = sharedUsers.filter((user, i) => i !== index)

		message.success("Delete user successfully")
		setSharedUsers(newUsers)
	}

	return (
		<div className="pb-10">
			<p className="leading-6 pb-3">People with access</p>
			<ul>
				{padShared?.uid === user?.uid && <li className="flex justify-between">
					<div className="flex">
						<div className="m-auto pr-3">
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
				{sharedUsers.map((user, id) => {

					const noPhoto = !user.photoURL
					let shortName = user.fullname.split(/\s+/)

					shortName = shortName
						.slice(shortName.length - 2, shortName.length)
						.filter(Boolean)
						.map(n => n[0].toUpperCase())

					return (
						<li key={id} className="flex justify-between">
							<div className="flex my-2">
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
								<div>
									<div className="flex items-center">
										<p className="text-sm leading-6 font-semibold">{user.fullname}</p>
									</div>
									<p className="text-sm leading-6">{user.email}</p>
								</div>
							</div>
							<div className="flex">
								<button className="btn btn-delete btn-sm mr-1" onClick={() => handleDeleteUser(id)}>
									<AiOutlineUserDelete />
								</button>
								<ListBoxOptions
									options={permissionLevelOption}
									selected={user.isEdit ? Rules.Edit : Rules.View}
									data={user.email}
									onSelected={handleSelectedRule}
									customOptions="container-permissionLevel"
								/>
							</div>
						</li>
					)
				})}
			</ul>
		</div>
	)
}

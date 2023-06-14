import dayjs from "dayjs"
import { Unsubscribe } from "firebase/firestore"
import { useEffect, useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { IPad, updatePadMetadata, watchPadById } from "../../services/pads"
import { getUser } from "../../services/users"
import { MobileDocListNavButton } from "../MobileNavigator"
import PadCoverImage from "./PadCoverImage"
import PadFolder from "./PadFolder"
import PadTag from "./PadTag"
import { Rules } from "../../containers/PadActions/PadShareModal/types"

let timeout: number

interface IPadInfoContentProps {
	info: IPad
}

export const EMPTY_TITLE = "Untitled"

function PadInfoContent({ info }: IPadInfoContentProps) {
	const inpRef = useRef<HTMLInputElement>(null)
	const { id } = useParams()
	const { user } = useAuth()
	const [sharedBy, setSharedBy] = useState<string>('')
	const updateTitle = () => {
		if (timeout) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => {
			if (!inpRef.current || !id) {
				return
			}
			updatePadMetadata({
				id,
				searchId: info.searchId,
				title: inpRef.current.value ? inpRef.current.value : EMPTY_TITLE,
			})
		}, 500) as unknown as number
	}

	useEffect(() => {
		if (inpRef.current && info) {
			inpRef.current.value = info.title === EMPTY_TITLE ? "" : info.title
		}
	}, [info])

	useEffect(() => {
		(async () => {
			if (info.uid !== user?.uid && info.shared.accessLevel !== Rules.None) {
				const sharedBy = await getUser(info.uid)
				if (!sharedBy) return

				setSharedBy(sharedBy.email)
				return
			}
			setSharedBy('')
		})()
	}, [info, user])

	const created = dayjs(info.createdAt.toDate()).format("YYYY/MM/DD")

	return (
		<div className="pad-info-wrapper relative">
			<MobileDocListNavButton />
			<PadCoverImage pad={info} />
			<div className="pad-infos relative" style={{ paddingTop: 70 }}>
				<input
					ref={inpRef}
					onChange={updateTitle}
					className="mb-5 h-12 sm:w-full md:w-[700px] xl:w-[800px] m-auto text-4xl font-extrabold outline-none bg-transparent text-gray-100"
					placeholder={EMPTY_TITLE}
				/>
				<div className="pad-details space-y-2 text-gray-600 grid grid-cols-2">
					<div className="flex items-center text-sm">
						<span className="text-gray-400 pr-3">Created at:</span>
						<span className="text-gray-500">{created}</span>
					</div>
					<div className="flex items-center text-sm">
						<span className="text-gray-400 pr-3">Tags:</span>
						<PadTag allowUpdateIfEmpty={true} selected={info.tags} />
					</div>
					<div className="flex items-center text-sm">
						<span className="text-gray-400 pr-3">Folder:</span>
						<div className="flex gap-2">
							<PadFolder
								allowUpdateIfEmpty={true}
								selected={info.folder || ""}
							/>
						</div>
					</div>
					{sharedBy && (
						<div className="flex items-center text-sm">
							<span className="text-gray-400 pr-3">Shared by:</span>
							<span className="text-gray-500">{sharedBy}</span>
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

function PadInfo() {
	const { id } = useParams()
	const [info, setInfo] = useState<IPad>()

	useEffect(() => {
		let unsub: Unsubscribe
		if (id) {
			unsub = watchPadById(id, (err, data) => {
				if (err) return

				setInfo(data)
			})
		}

		return () => {
			unsub && unsub()
		}
	}, [id])

	return info ? <PadInfoContent info={info} /> : null
}

export default PadInfo

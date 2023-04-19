import { Dispatch, SetStateAction } from "react"
import { IUserShare } from "../../../services/pads"
import { Editor } from "@tiptap/react"

export enum Rules {
 None = 'None',
 View = 'View',
 Edit = 'Edit',
 Limit = 'Limit',
 Anyone = 'Anyone',
}

export interface ProviderProps {
 setIsOpenUser: Dispatch<SetStateAction<boolean>>
 setSelectedUser: Dispatch<SetStateAction<IUserShare | null>>
 setIsOpenListUser: Dispatch<SetStateAction<boolean>>
 setVisible: Dispatch<SetStateAction<boolean>>
 setGroup: Dispatch<SetStateAction<IUserShare[]>>
 group: IUserShare[]
 isOpenUser: boolean
 isOpenListUser: boolean
 editor: Editor
 selectedUser: IUserShare | null
}

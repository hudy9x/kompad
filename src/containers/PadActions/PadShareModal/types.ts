import { Dispatch, SetStateAction } from "react"
import { IPad, IUserShare } from "../../../services/pads"

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
 padShared: IPad | undefined
 group: IUserShare[]
 isOpenUser: boolean
 isOpenListUser: boolean
 selectedUser: IUserShare | null
}

import { Dispatch, SetStateAction } from "react"
import { IPad, IUserShared } from "../../../services/pads"
import { IOption } from "../../../components/ListBox"

export const ALL_USERS_CAN_EDIT = 'ALL'

export enum Rules {
 None = 'None',
 View = 'View',
 Edit = 'Edit',
 Limit = 'Limit',
 Anyone = 'Anyone',
}

export interface ProviderProps {
  setIsOpenUser: Dispatch<SetStateAction<boolean>>
  setSharedUsers: Dispatch<SetStateAction<IUserShared[]>>
  setVisible: Dispatch<SetStateAction<boolean>>
  setAccessLevel: Dispatch<SetStateAction<Rules>>
  setPermissionLevel: Dispatch<SetStateAction<Rules>>
  permissionLevel: Rules
  accessLevel: Rules
  padShared: IPad | undefined
  sharedUsers: IUserShared[]
  isOpenUser: boolean
  visible: boolean
  hasBeenShared: boolean
 }

export interface IUserSearch {
  uid?: string
  fullname: string
  email: string
  photoURL: string
}

 export const permissionLevelOption: IOption[] = [
  {
    name: Rules.View,
    unavailable: true,
  },
  {
    name: Rules.Edit,
    unavailable: false,
  },
]

export const accessLevelOption: IOption[] = [
  {
    name: Rules.Limit,
    unavailable: true,
  },
  {
    name: Rules.Anyone,
    unavailable: false,
  },
]
import { IUserShare } from "../../../services/pads"
import { IUser } from "../../../services/users"
import { Rules } from "./types"

export const getCurrentURL = () => {
  return window.location.href
}

export const isSearchAndAccountSame = (user: IUser, info: IUser) => {
  return user.email === info?.email
}

export const isUserAlreadyInGroup = (user: IUser, group: IUserShare[]) => {
  return group.some((item) => item.email === user.email)
}

export const createNewUserShare = (user: IUser): IUserShare => {
  return {
    fullName: user.fullname,
    email: user.email,
    photoURL: user.photoURL,
    isEdit: false,
  }
}

export const updateUser = (group: IUserShare[], rule: string, email: string): IUserShare[] => {
  return group.map((user) => user.email === email ? {
    ...user,
    isEdit: rule === Rules.Edit ? true : false,
  } : user)
}

export const updateAllUser = (group: IUserShare[], rule: string): IUserShare[] => {
  return group.map((user) => ({
    ...user,
    isEdit: rule === Rules.Edit ? true : false,
  }))
}

export const getEdits = (group: IUserShare[]) => group.filter(user => user.isEdit).map((user) => user.email);

export const getIdUrl = (url: string) => {
  const urlShared = new URL(url);
  return urlShared.pathname.split("/").pop() || '';
}

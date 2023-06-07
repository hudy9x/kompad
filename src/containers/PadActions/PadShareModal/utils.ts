import { IUserShared } from "../../../services/pads"
import { IUser } from "../../../services/users"
import { IUserSearch, Rules } from "./types"

export const getCurrentURL = () => {
  return window.location.href
}

export const checkUserSearchMatch = (user: IUserSearch, info: IUser | null, sharedUsers: IUserShared[]) => {
  if(!info) return

  return sharedUsers.some((item) => item.email === user.email) || info.email === user.email
}

export const createNewUserShare = (user: IUser): IUserShared => {
  return {
    fullname: user.fullname,
    email: user.email,
    photoURL: user.photoURL,
    isEdit: false,
  }
}

export const updateUser = (group: IUserShared[], rule: string, email: string): IUserShared[] => {
  return group.map((user) => user.email === email ? {
    ...user,
    isEdit: rule === Rules.Edit ? true : false,
  } : user)
}

export const updateAllUser = (group: IUserShared[], rule: string): IUserShared[] => {
  return group.map((user) => ({
    ...user,
    isEdit: rule === Rules.Edit ? true : false,
  }))
}

export const getEmailsRuleEdit = (group: IUserShared[]): string[] => group.filter(user => user.isEdit).map((user) => user.email);

export const getIdUrl = (url: string) => {
  const urlShared = new URL(url);
  return urlShared.pathname.split("/").pop() || '';
}

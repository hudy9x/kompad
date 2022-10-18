
import { updatePassword } from "firebase/auth";
import { doc, getDoc, setDoc, Timestamp, updateDoc } from "firebase/firestore";
import { auth, db } from "../libs/firebase";
import { ITheme } from "./themes";

export enum EUserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IUserThemeSettings {
  name: string
  config: string
  active: boolean
  themeId: string
}

export interface IUserSettings {
  themes?: IUserThemeSettings[]
}

const COLLECTION_NAME = 'user-settings'

export const installTheme = async (theme: ITheme): Promise<number> => {
  const user = auth.currentUser
  if (!user?.uid) { return 0 }

  const { id: themeId, themes: themeList } = theme
  const uid = user.uid
  const docRef = doc(db, COLLECTION_NAME, uid);
  const userSetting = await getDoc(docRef);
  let settings: IUserSettings = { themes: [] }

  if (userSetting.exists()) {
    settings = userSetting.data()
  }

  themeList.forEach(t => {
    settings.themes?.push({
      name: t.name,
      config: t.config,
      active: false,
      themeId: themeId || ''
    })
  })

  await setDoc(docRef, settings)
  return 1;
};

export const uninstallTheme = async (themeId: string): Promise<number> => {
  const user = auth.currentUser
  if (!user?.uid) { return 0 }

  const uid = user.uid
  const docRef = doc(db, COLLECTION_NAME, uid);
  const userSetting = await getDoc(docRef);
  let settings: IUserSettings = { themes: [] }

  if (userSetting.exists()) {
    settings = userSetting.data()
  }

  if (settings.themes) {
    settings.themes = settings.themes.filter(t => t && t.themeId !== themeId)
  }

  await setDoc(docRef, settings)

  return 1;

}

export const getUserSetting = async (): Promise<IUserSettings> => {
  const user = auth.currentUser
  if (!user?.uid) return {};
  const uid = user.uid
  const ref = doc(db, COLLECTION_NAME, uid)
  const settingRef = await getDoc(ref)

  if (!settingRef.exists()) {
    return {}
  }

  return settingRef.data() as IUserSettings
}

// export const updateUserById = async (uid: string, user: Partial<IUser>) => {
//   try {
//     const { fullname, photoURL, dateOfBirth, address } = user;
//     await updateDoc(doc(db, "users", uid), {
//       fullname,
//       photoURL,
//       dateOfBirth,
//       address,
//     });
//
//     return 1;
//   } catch (error) {
//     console.log(error);
//   }
// };


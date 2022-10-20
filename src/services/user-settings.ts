
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../libs/firebase";
import { setCache, getCache } from "../libs/localCache";
import { ITheme } from "./themes";

export enum EUserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IUserThemeSettings {
  id: string
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
      id: t.id,
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

export const selectTheme = async (id: string): Promise<number> => {
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
    settings.themes = settings.themes.map(t => {
      t.active = t.id === id;
      return t;
    })
  }

  await setDoc(docRef, settings)
  return 1
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

export const getThemeConfigFromStorage = async () => {
  try {

    const theme = getCache('THEME');
    console.log('theme', theme)
    if (theme) return JSON.parse(theme)

    const setting = await getUserSetting()
    console.log(setting)
    if (!setting.themes) return {}

    const activeTheme = setting.themes.find(t => t.active === true)
    const config = activeTheme && activeTheme.config ? activeTheme.config : "{}"
    setThemeConfigToStorage(config)

    return JSON.parse(config) 

  } catch (error) {
    console.log('getThemeconfig Error', error)
    return {}
  }

}

export const setThemeConfigToStorage = (value: string) => {
  setCache("THEME", value)
}


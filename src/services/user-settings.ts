import { doc, getDoc, setDoc } from "firebase/firestore"
import { auth, db } from "../libs/firebase"
import { setCache, getCache } from "../libs/localCache"
import { IThemeInstall } from "./themes"

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

const COLLECTION_NAME = "user-settings"
const DEFAULT_THEME = `--common-text-color:  rgb(88 88 88);--common-semidark-text-color:  rgb(160 167 177);--common-dark-text-color:  rgb(107 114 128);--common-text-hover-color:  rgb(165 170 179);--common-bg-color:  rgb(255 255 255);--common-dark-bg-color:  rgb(255 255 255);--common-darker-bg-color:  rgb(227 227 227);--common-light-bg-color:  rgb(239 239 239);--common-border-hl-color:  rgb(253 227 124);--common-border-light-color:  rgb(231 231 231);--common-btn-bg-color:  rgb(255 255 255);--common-btn-bg-hover-color:  rgb(241 241 241);--common-btn-bg-active-color:  rgb(86 86 86);--common-primary-color:  rgb(234 179 8);--common-primary-hover-color:  rgb(253 224 71);--common-primary-text-color:  rgb(113 63 18);--common-border-color:  rgb(221 221 221);--sidebar-background-color:  rgb(249 249 249);--sidebar-text-color:  rgb(107 114 128);--sidebar-text-color-hover:  rgb(156 163 175);--sidebar-title-color:  rgb(74 74 74);--sidebar-user-setting-border-color:  rgb(225 225 225);--sidebar2-background-color:  rgb(255 255 255);--editor-text-color:  rgb(90 90 90);--editor-link-text-color:  rgb(213 184 93);--editor-quote-text-color:  rgb(234 179 8);--modal-bg-color:  rgb(255 255 255);--modal-footer-bg-color:  rgb(255 255 255);--setting-bg-color:  rgb(241 241 241)`

export const installTheme = async (theme: IThemeInstall): Promise<number> => {
  const user = auth.currentUser
  if (!user?.uid) {
    return 0
  }

  const { id: themeId, themes: themeList } = theme
  const uid = user.uid
  const docRef = doc(db, COLLECTION_NAME, uid)
  const userSetting = await getDoc(docRef)
  let settings: IUserSettings = { themes: [] }

  if (userSetting.exists()) {
    settings = userSetting.data()
  }

  themeList.forEach((t) => {
    settings.themes?.push({
      id: t.id,
      name: t.name,
      config: t.config,
      active: false,
      themeId: themeId || "",
    })
  })

  await setDoc(docRef, settings)
  return 1
}

export const getThemeSettingElem = () => {
  return document.querySelector("#css-variable")
}

export const uninstallTheme = async (themeId: string): Promise<number> => {
  const user = auth.currentUser
  if (!user?.uid) {
    return 0
  }

  const uid = user.uid
  const docRef = doc(db, COLLECTION_NAME, uid)
  const userSetting = await getDoc(docRef)
  let settings: IUserSettings = { themes: [] }

  if (userSetting.exists()) {
    settings = userSetting.data()
  }

  if (settings.themes) {
    settings.themes = settings.themes.filter((t) => t && t.themeId !== themeId)
  }

  await setDoc(docRef, settings)

  return 1
}

export const selectTheme = async (id: string): Promise<number> => {
  const user = auth.currentUser
  if (!user?.uid) {
    return 0
  }

  const uid = user.uid
  const docRef = doc(db, COLLECTION_NAME, uid)
  const userSetting = await getDoc(docRef)
  let settings: IUserSettings = { themes: [] }

  if (userSetting.exists()) {
    settings = userSetting.data()
  }

  if (settings.themes) {
    settings.themes = settings.themes.map((t) => {
      t.active = t.id === id
      return t
    })
  }

  await setDoc(docRef, settings)
  return 1
}

export const customThemeById = async (
  id: string,
  title: string,
  config: string
): Promise<number> => {
  const user = auth.currentUser
  if (!user?.uid) {
    return 0
  }

  const uid = user.uid
  const docRef = doc(db, COLLECTION_NAME, uid)
  const userSetting = await getDoc(docRef)
  let settings: IUserSettings = { themes: [] }

  if (userSetting.exists()) {
    settings = userSetting.data()
  }

  if (settings.themes) {
    settings.themes = settings.themes.map((t) => {
      if (t.id === id) {
        t.name = title
        t.config = config
      }
      return t
    })
  }

  await setDoc(docRef, settings)
  return 1
}

export const getUserSetting = async (): Promise<IUserSettings> => {
  const user = auth.currentUser
  if (!user?.uid) return {}
  const uid = user.uid
  const ref = doc(db, COLLECTION_NAME, uid)
  const settingRef = await getDoc(ref)

  if (!settingRef.exists()) {
    return {}
  }

  return settingRef.data() as IUserSettings
}

export const getThemeConfigFromStorage = (): string => {
  return getCache("THEME") || DEFAULT_THEME
}

export const updateThemeConfigFromUserSetting = async () => {
  try {
    const setting = await getUserSetting()
    if (!setting.themes) return {}

    const themeElem = getThemeSettingElem()
    const activeTheme = setting.themes.find((t) => t.active === true)
    const config = activeTheme && activeTheme.config ? activeTheme.config : "{}"

    setThemeConfigToStorage(config)
    themeElem && (themeElem.textContent = `:root { ${getCache("THEME")} }`)

    return JSON.parse(config)
  } catch (error) {
    console.log("getThemeconfig Error", error)
    return {}
  }
}

export const cvtThemeConfigToCssVars = (config: string) => {
  try {
    const cssVars = JSON.parse(config)
    const css = []
    for (let variable in cssVars) {
      css.push(`${variable}: ${cssVars[variable]}`)
    }

    return css.join(";")
  } catch (error) {
    console.log("setThemeSetting Error", error)
    return ""
  }
}

export const setThemeConfigToStorage = (value: string) => {
  setCache("THEME", cvtThemeConfigToCssVars(value))
}

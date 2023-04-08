import { create } from "zustand"
import produce from "immer"
import {
  DOCUMENT_ZOOM,
  getCache,
  LOCK_SCREEN_TIME,
  setCache,
} from "../libs/localCache"
import { isDesktopApp } from "../libs/utils"

export interface ISettingStore {
  secondSidebarVisibility: boolean
  toggleSecondSidebar: () => void
  screenLockTime: number
  updateScreenLocktime: (t: number) => void
  view: {
    sidebar: boolean
  }
  toggleSideBar: () => void
  documentZoom: number
  // updateDocumentZoom: (zoom: number) => void
  themeCustomModal: boolean
  themeCustomId: string
  toggleThemeCustomModal: (id?: string) => void
}

// default values
const sidebar = getCache("SETTING_VIEW_SIDEBAR") === "0" ? false : true

// configure store
export const useSettingStore = create<ISettingStore>((set) => ({
  themeCustomModal: false,
  themeCustomId: "",
  toggleThemeCustomModal: (id?: string) => {
    set(
      produce<ISettingStore>((state) => {
        state.themeCustomModal = !state.themeCustomModal
        state.themeCustomId = id ?? ""
      })
    )
  },
  secondSidebarVisibility: false,
  toggleSecondSidebar: () => {
    if (isDesktopApp()) {
      return
    }

    // ignore if the view is not mobile viewport
    if (document.body.offsetWidth > 900) {
      return
    }

    set(
      produce<ISettingStore>((state) => {
        state.secondSidebarVisibility = !state.secondSidebarVisibility
      })
    )
  },
  view: {
    sidebar: sidebar,
  },
  toggleSideBar: () =>
    set(
      produce<ISettingStore>((state) => {
        state.view.sidebar = !state.view.sidebar
      })
    ),
  screenLockTime: parseInt(getCache(LOCK_SCREEN_TIME) || "0", 10),
  updateScreenLocktime: (timer: number) =>
    set(
      produce<ISettingStore>((state) => {
        setCache(LOCK_SCREEN_TIME, timer.toString())
        state.screenLockTime = timer
      })
    ),
  documentZoom: parseInt(getCache(DOCUMENT_ZOOM) || "1", 10),
  // updateDocumentZoom: (zoom: number) => {
  //   set(
  //     produce<ISettingStore>((state) => {
  //       const oldDocZoom = state.documentZoom
  //       const newDocZoom = oldDocZoom + zoom
  //       state.documentZoom = newDocZoom <= 0 ? 0.5 : newDocZoom
  //     })
  //   )
  // },
}))

export const { getState: getSettingState, setState: setSettingState } =
  useSettingStore

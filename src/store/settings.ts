import create from "zustand"
import produce from "immer"
import { getCache } from "../libs/localCache"

export interface ISettingStore {
  secondSidebarVisibility: boolean
  toggleSecondSidebar: () => void
  view: {
    sidebar: boolean
  }
  toggleSideBar: () => void
}

// default values
const sidebar = getCache("SETTING_VIEW_SIDEBAR") === "0" ? false : true

// configure store
export const useSettingStore = create<ISettingStore>((set) => ({
  secondSidebarVisibility: false,
  toggleSecondSidebar: () => {
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
}))

export const { getState: getSettingState, setState: setSettingState } =
  useSettingStore

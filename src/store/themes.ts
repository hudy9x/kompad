import { create } from "zustand"
import { IUserThemeSettings } from "../services/user-settings"

export interface IThemeStore {
  config: string
  selectedTheme: string
  list: IUserThemeSettings[]
  visible: boolean
  setSelected: (id: string, config: string) => void
  setVisible: (visible: boolean) => void
  setThemeList: (themes: IUserThemeSettings[]) => void
}

export const useThemeStore = create<IThemeStore>((set) => ({
  config: "",
  visible: false,
  selectedTheme: "",
  list: [],
  setVisible: (visible: boolean) =>
    set((state) => ({
      ...state,
      ...{ visible },
    })),

  setThemeList: (themes: IUserThemeSettings[]) =>
    set((state) => {
      const active = themes.find((t) => t.active === true)
      return {
        ...state,
        ...{
          list: themes,
          config: active?.config || "",
          selectedTheme: active?.id || "",
        },
      }
    }),

  setSelected: (id: string, config: string) =>
    set((state) => ({
      ...state,
      ...{ config, selectedTheme: id },
    })),
}))

export const { setState: setThemeStoreState } = useThemeStore

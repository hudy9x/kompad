import create from "zustand";
import produce from "immer";
import { getCache } from "../libs/localCache";

export interface ISettingStore {
  view: {
    sidebar: boolean;
  };
  resizeWindow: () => void;
  toggleSideBar: () => void;
  defaultWindow: () => void;
}

// default values
const sidebar = getCache("SETTING_VIEW_SIDEBAR") === "0" ? false : true;


// configure store
export const useSettingStore = create<ISettingStore>((set) => ({
  view: {
    sidebar: sidebar,
  },
  resizeWindow : () => set(
    produce<ISettingStore>((state) => {
      state.view.sidebar = false;
    })
  ),
  defaultWindow: () => set(
    produce<ISettingStore>((state) => {
      state.view.sidebar = true;
    })
  ),
  toggleSideBar: () =>
    set(
      produce<ISettingStore>((state) => {
        state.view.sidebar = !state.view.sidebar;
      })
    ),
}));

export const { getState: getSettingState, setState: setSettingState} =
  useSettingStore;

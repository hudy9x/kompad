import create from "zustand";

export interface IThemeStore {
  config: string;
  setConfig: (config: string) => void
  visible: boolean
  setVisible: (visible: boolean) => void
}

export const useThemeStore = create<IThemeStore>((set) => ({
  config: '',
  visible: false,
  setVisible: (visible: boolean) => set((state) => ({
    ...state,
    ...{visible}
  })),

  setConfig: (config: string) =>
    set((state) => ({
      ...state,
      ...{ config },
    })),

}));


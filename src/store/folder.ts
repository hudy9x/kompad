import { create } from "zustand"
import produce from "immer"
import { IFolder } from "../services/folders"

export interface IFolderStore {
  folders: IFolder[]
  updateFolders: (data: IFolder[]) => void
}

// configure store
export const useFolderStore = create<IFolderStore>((set) => ({
  folders: [],
  updateFolders: (data: IFolder[]) =>
    set(
      produce<IFolderStore>((state) => {
        state.folders = data
      })
    ),
}))

import create from "zustand";
import produce from "immer";

interface IFolder {
  id?: string;
  title: string;
  color: string;
  uid: string;
}

export interface IFolderStore {
  folders: IFolder[];
  updateFolders: (data: IFolder[]) => void;
}

// default values

// configure store
export const useFolderStore = create<IFolderStore>((set) => ({
  folders: [],
  updateFolders: (data: IFolder[]) =>
    set(
      produce<IFolderStore>((state) => {
        state.folders = data;
      })
    ),
}));

// export const { getState: getSettingState, setState: setSettingState,  } =
//   useFolderStore;

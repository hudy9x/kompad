import create from "zustand";

export interface IPadStore {
  searchModalStatus: boolean;
  setSearchModalStatus: (status: boolean) => void;

  newPadModalStatus: boolean;
  setNewPadModalStatus: (status: boolean) => void;
  
  needToUpdate: number; // just notify to pad list that a new pad was created
  setNeedToUpdate: () => void;
}

export const usePadStore = create<IPadStore>((set) => ({
  searchModalStatus: false,
  setSearchModalStatus: (status: boolean) =>
    set((state) => ({
      ...state,
      ...{ searchModalStatus: status },
    })),

  newPadModalStatus: false,
  setNewPadModalStatus: (status: boolean) =>
    set((state) => ({
      ...state,
      ...{ newPadModalStatus: status },
    })),

  needToUpdate: 0,
  setNeedToUpdate: () =>
    set((state) => {
      return {
        needToUpdate: state.needToUpdate + 1,
      };
    }),
}));

export const { setState: setPadStoreState } = usePadStore;

import create from "zustand";

export interface IPadStore {
  newPadModalStatus: boolean;
  needToUpdate: number; // just notify to pad list that a new pad was created
  setNeedToUpdate: () => void;
  setNewPadModalStatus: (status: boolean) => void;
}

export const usePadStore = create<IPadStore>((set) => ({
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

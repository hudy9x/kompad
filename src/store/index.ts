import create from "zustand";

export interface IPadStore {
  newPadModalStatus: boolean;
  newPadAdded: number; // just notify to pad list that a new pad was created
  increaseNewPaddAdded: () => void;
  setNewPadModalStatus: (status: boolean) => void;
}

export const usePadStore = create<IPadStore>((set) => ({
  newPadModalStatus: false,
  setNewPadModalStatus: (status: boolean) =>
    set((state) => ({
      ...state,
      ...{ newPadModalStatus: status },
    })),

  newPadAdded: 0,
  increaseNewPaddAdded: () =>
    set((state) => {
      return {
        newPadAdded: state.newPadAdded + 1,
      };
    }),
}));

export const { setState: setPadStoreState } = usePadStore;

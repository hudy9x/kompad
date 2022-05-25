import create from "zustand";

interface IPadStore {
  newPadAdded: number;
  increaseNewPaddAdded: () => void;
}

export const usePadStore = create<IPadStore>((set) => ({
  newPadAdded: 0,
  increaseNewPaddAdded: () =>
    set((state) => {
      return {
        newPadAdded: state.newPadAdded + 1,
      };
    }),
}));

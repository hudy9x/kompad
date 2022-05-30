import create from "zustand";
import produce from "immer";

interface IModalList {
  shorcut: boolean;
  update: boolean;
}

type IModalKeys = keyof IModalList;

export interface IModalStore {
  modals: IModalList;
  setVisible: (type: IModalKeys, status: boolean) => void;
}

// configure store
export const useModalStore = create<IModalStore>((set) => ({
  modals: {
    shorcut: false,
    update: false,
  },
  setVisible: (type, status) =>
    set(
      produce<IModalStore>((state) => {
        state.modals[type] = status;
      })
    ),
}));

export const { getState: getModalState, setState: setModalState } =
  useModalStore;

export const showShortcutModal = () => {
  const modalState = getModalState();
  modalState.setVisible("shorcut", true);
};

export const showUpdateModal = () => {
  const modalState = getModalState();
  modalState.setVisible("update", true);
};

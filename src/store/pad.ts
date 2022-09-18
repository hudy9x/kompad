import create from "zustand";
import produce from "immer";
import { IPad } from "../services/pads";

export interface IPadQuery {
  tag: string;
  folder: string;
  recently?: boolean;
  important?: boolean;
}

export interface IPadStore {
  pads: IPad[];
  query: IPadQuery;
  clearFilter: () => void;
  filterByAll: (query: IPadQuery) => void;
  filterByTag: (id: string) => void;
  filterByFolder: (id: string) => void;
  filterByRecently: () => void;
  filterByImportant: () => void;
  updatePadList: (data: IPad[]) => void;
}

// configure store
export const usePadListStore = create<IPadStore>((set) => ({
  pads: [],
  query: {
    tag: "",
    folder: "",
    recently: true,
    important: false,
  },

  clearFilter: () =>
    set(
      produce<IPadStore>((state) => {
        state.query = {
          tag: "",
          folder: "",
          recently: false,
          important: false
        };
      })
    ),

  filterByTag: (id: string) =>
    set(
      produce<IPadStore>((state) => {
        state.query.tag = id;
      })
    ),

  filterByFolder: (id: string) =>
    set(
      produce<IPadStore>((state) => {
        state.query.folder = id;
      })
    ),

  filterByRecently: () => {
    set(produce<IPadStore>(state => {
      state.query.important = false;
      state.query.recently = !state.query.recently
    }))
  },
  filterByImportant: () => {
    set(
      produce<IPadStore>((state) => {
        state.query.recently = false;
        state.query.important = !state.query.important; // active important
      })
    );
  },
  filterByAll: (query: IPadQuery) =>
    set(
      produce<IPadStore>((state) => {
        state.query = query;
      })
    ),

  updatePadList: (data: IPad[]) =>
    set(
      produce<IPadStore>((state) => {
        state.pads = data;
      })
    ),
}));

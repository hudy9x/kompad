import create from "zustand";
import produce from "immer";
import { IPad } from "../services/pads";

export interface IPadQuery {
  tag: string;
  folder: string;
}

export interface IPadStore {
  pads: IPad[];
  query: IPadQuery;
  clearFilter: () => void;
  filterByAll: (query: IPadQuery) => void;
  filterByTag: (id: string) => void;
  filterByFolder: (id: string) => void;
  updatePadList: (data: IPad[]) => void;
}

// configure store
export const usePadListStore = create<IPadStore>((set) => ({
  pads: [],
  query: {
    tag: "",
    folder: "",
  },

  clearFilter: () =>
    set(
      produce<IPadStore>((state) => {
        state.query = {
          tag: "",
          folder: "",
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

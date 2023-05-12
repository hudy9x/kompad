import { create } from "zustand"
import produce from "immer"
import { IPad } from "../services/pads"
import { QueryDocumentSnapshot } from "firebase/firestore"

export interface IPadQuery {
  tag: string
  folder: string
  recently?: boolean
  startAfter?: QueryDocumentSnapshot<unknown>
  important?: boolean
  shared?: boolean
}

export interface IPadStore {
  pads: IPad[]
  query: IPadQuery
  clearFilter: () => void
  filterByAll: (query: IPadQuery) => void
  filterByTag: (id: string) => void
  filterByFolder: (id: string) => void
  filterByRecently: () => void
  updatePadList: (data: IPad[]) => void
  filterByImportant: () => void
  appendPads: (data: IPad[]) => void
  filterByShared: () => void
}

// configure store
export const usePadListStore = create<IPadStore>((set) => ({
  pads: [],
  query: {
    tag: "",
    folder: "",
    recently: true,
    important: false,
    shared: false,
  },

  clearFilter: () =>
    set(
      produce<IPadStore>((state) => {
        state.query = {
          tag: "",
          folder: "",
          recently: false,
          important: false,
        }
      })
    ),

  filterByTag: (id: string) =>
    set(
      produce<IPadStore>((state) => {
        state.query.tag = id
      })
    ),

  filterByFolder: (id: string) =>
    set(
      produce<IPadStore>((state) => {
        state.query.folder = id
      })
    ),

  filterByRecently: () => {
    set(
      produce<IPadStore>((state) => {
        state.query.important = false
        state.query.shared = false
        state.query.recently = !state.query.recently
      })
    )
  },

  filterByAll: (query: IPadQuery) =>
    set(
      produce<IPadStore>((state) => {
        state.query = query
      })
    ),

  updatePadList: (data: IPad[]) =>
    set(
      produce<IPadStore>((state) => {
        state.pads = data
      })
    ),

  appendPads: (data: IPad[]) =>
    set(
      produce<IPadStore>((state) => {
        state.pads = [...state.pads, ...data]
      })
    ),

  filterByImportant: () => {
    set(
      produce<IPadStore>((state) => {
        state.query.recently = false
        state.query.shared = false
        state.query.important = !state.query.important
      })
    )
  },

  filterByShared: () => {
    set(
      produce<IPadStore>((state) => {
        state.query.recently = false
        state.query.important = false
        state.query.shared = !state.query.shared
      })
    )
  },
}));

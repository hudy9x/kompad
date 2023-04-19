import { create } from "zustand"
import produce from "immer"
import { ITag } from "../services/tags"

export interface ITagStore {
  tags: ITag[]
  updateTags: (data: ITag[]) => void
}

// configure store
export const useTagStore = create<ITagStore>((set) => ({
  tags: [],
  updateTags: (data: ITag[]) =>
    set(
      produce<ITagStore>((state) => {
        state.tags = data
      })
    ),
}))

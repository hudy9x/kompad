import create from "zustand";
import produce from "immer";
//[{title,level}, {title, level}]
export interface Outline {
  title: string,
  level: string,
}

interface IOutline {
  outlineList: Outline[],
  setOutlines: (outlines: Outline[]) => void 
}

export const useOutlineStore = create<IOutline>((set) => ({
  outlineList: [],
  setOutlines: (outlines: Outline[]) =>
    set(
      produce<IOutline>((state) => {
        state.outlineList = outlines
      })
    ),
}))
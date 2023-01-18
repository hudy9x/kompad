import create from "zustand";
import produce from "immer";
export interface ContentOutline {
  id: string,
  title: string,
  level: number,
  isCheck?: boolean,
  isIcon?: boolean
}

interface IOutline {
  contentOutline: ContentOutline[],
  isOpen: boolean,
  setIsOpen: () => void,
  setOutlines: (outlines: ContentOutline[]) => void,
  setDropDownContent: (id: string, level: number) => void
}

const addIconContentOutline = (outlines: ContentOutline[]) => {
  return outlines.map((outline, id) => {
    const levelNext = outlines[id + 1]?.level;
    if ((outline.level === 2 && outline.level < levelNext) || (outline.level === 3 && outline.level < levelNext && outline.isCheck)) {
      return {
        ...outline,
        isIcon: true
      }
    } else {
      return outline;
    }
  });
}

export const useOutlineStore = create<IOutline>((set) => ({
  contentOutline: [],
  isOpen: true,
  setOutlines: (outlines: ContentOutline[]) =>
    set(
      produce<IOutline>((state) => {
        state.contentOutline = addIconContentOutline(outlines);
      })
    ),
  setIsOpen: () => {
    set(
      produce<IOutline>((state) => {
        state.isOpen = !state.isOpen;
      })
    )
  },
  setDropDownContent: (id: string, level: number) => {
    set(
      produce<IOutline>((state) => {
      })
    )
  }
}))
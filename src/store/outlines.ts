import create from "zustand";
import produce from "immer";
import { Editor } from "@tiptap/react";
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
  setDropDownContent: (id: string, level: number) => void,
  updateOutline: (editor: Editor) => any
}

export const getAllOutline = (): ContentOutline[] | undefined => {
  const els = document.querySelector('.tiptap-main-content')?.querySelectorAll<HTMLElement>("h2, h3, h4");
  const outlines: ContentOutline[] = [];

  if (!els) {
    return;
  }

  els.forEach((el) => {
    return outlines.push({
      id: el.id,
      title: el.innerText,
      level: Number(el.tagName.replace('H', '')),
      isCheck: true
    })
  })

  return outlines;
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
        //const result = handleContentOutline(id, state.contentOutline);
       // state.contentOutline = result;
      })
    )
  },
  updateOutline: (editor) => {
    set(
      produce<IOutline>((state) => {
        if (editor.isActive("heading", { level: 2 }) || editor.isActive("heading", { level: 3 }) || editor.isActive("heading", { level: 4 })) {
          const outlines = getAllOutline();
          if(!outlines) {
            return;
          }
          state.contentOutline = addIconContentOutline(outlines);
        }
      })
    )
  }
}))

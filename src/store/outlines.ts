import create from "zustand";
import produce from "immer";
export interface ContentOutline {
  id: string,
  title: string,
  level: number,
  isIcon?: boolean
}
interface HiddenOutline {
  childrenByParent: Record<string, Array<number>>,
  hiddenArr: Array<number>
}
interface IOutline {
  contentOutline: ContentOutline[],
  hiddenOutline: HiddenOutline
  isOpen: boolean,
  setIsOpen: () => void,
  setOutlines: () => void,
  setDropDownContent: (id: string, level: number, statusParent: boolean) => void,
}

export const getAllOutline = () => {
  const headingEls = document.querySelectorAll<HTMLElement>(".tiptap-main-content h1, .tiptap-main-content h2, .tiptap-main-content h3, .tiptap-main-content h4, .tiptap-main-content h5, .tiptap-main-content h6");

  return [...headingEls].map((el) => ({
    id: el.id,
    title: el.innerText,
    level: Number(el.tagName.replace('H', '')),
  }));

}

const addIconContentOutline = (outlines: ContentOutline[]): ContentOutline[] => {
  return outlines.map((outline, idx) => {
    const nextLevel = outlines[idx + 1]?.level;
    if (outline.level < nextLevel) {
      return {
        ...outline,
        isIcon: true
      }
    }
    return outline
  });
}

const dataChildByParent = (outlines: ContentOutline[], idx: string, level: number): number[] => {
  let indexChild = [];
  for (let index = 0; index <= outlines.length - 1; index++) {
    if (outlines[index].id === idx) {
      for (let idex = index + 1; idex <= outlines.length - 1; idex++) {
        if (outlines[idex].level <= level) {
          return indexChild;
        }
        indexChild.push(idex);
      }
    }
  }

  return indexChild;
}

const filterHidden = (idxChild: number[], hiddens: number[]): number[] => {
  return hiddens.filter((val) => !idxChild.includes(val));
}

const getDataChildByParent = (outlines: ContentOutline[], idx: string, level: number, childrenByParent: Record<string, Array<number>>, key: string): number[] => {

  return Object.keys(childrenByParent).length ?
    childrenByParent[key] || dataChildByParent(outlines, idx, level) :
    dataChildByParent(outlines, idx, level);
}

export const useOutlineStore = create<IOutline>((set) => ({
  contentOutline: [],
  isOpen: true,
  hiddenOutline: {
    childrenByParent: {},
    hiddenArr: []
  },
  setIsOpen: () => {
    set(
      produce<IOutline>((state) => {
        state.isOpen = !state.isOpen;
      })
    )
  },
  setDropDownContent: (idx: string, level: number, statusParent: boolean) => {
    set(
      produce<IOutline>((state) => {
        const { contentOutline, hiddenOutline } = state;
        const { childrenByParent, hiddenArr } = hiddenOutline;
        const key = `h${level}-${idx}`;
        const childIndexByParent = getDataChildByParent(contentOutline, idx, level, childrenByParent, key);

        const hidden = statusParent ? filterHidden(childIndexByParent, hiddenArr) : [...hiddenArr, ...childIndexByParent];

        state.hiddenOutline = {
          childrenByParent: {
            ...childrenByParent,
            [key]: childIndexByParent
          },
          hiddenArr: hidden
        };
      })
    )
  },
  setOutlines: () => {
    set(
      produce<IOutline>((state) => {
        // If outline open is update heading 
        if (!state.isOpen) {
          const outlines = getAllOutline();
          state.contentOutline = addIconContentOutline(outlines);
        }
      })
    )
  }
}))

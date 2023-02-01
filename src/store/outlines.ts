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
  hiddens: Array<number>
}
interface IOutline {
  contentOutline: ContentOutline[],
  hiddenOutline: HiddenOutline
  isOpen: boolean,
  setIsOpen: () => void,
  setOutlines: () => void,
  setDropDownContent: (id: string, level: number, statusParent: boolean) => void,
}

export const getAllOutline = (): ContentOutline[] => {
  const els = document.querySelector('.tiptap-main-content')?.querySelectorAll<HTMLElement>("h2, h3, h4");
  const outlines: ContentOutline[] = [];

  if (!els) {
    return outlines;
  }

  els.forEach((el) => {
    return outlines.push({
      id: el.id,
      title: el.innerText,
      level: Number(el.tagName.replace('H', '')),
    })
  })

  return outlines;
}

const addIconContentOutline = (outlines: ContentOutline[]): ContentOutline[] => {
  return outlines.map((outline, id) => {
    const levelNext = outlines[id + 1]?.level;
    if ((outline.level === 2 && outline.level < levelNext) || (outline.level === 3 && outline.level < levelNext)) {
      return {
        ...outline,
        isIcon: true
      }
    } else {
      return outline;
    }
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

const getDataChildByParent = (outlines: ContentOutline[], idx: string, level: number, childrenByParent: Record<string, Array<number>>, key: string): number[] | undefined => {

  if (!Object.keys(childrenByParent).length) {
    const data = dataChildByParent(outlines, idx, level);
    return data;
  }

  for (const property in childrenByParent) {
    if (key === property) {
      return childrenByParent[property];
    } else {
      const data = dataChildByParent(outlines, idx, level);
      return data;
    }
  }
}

export const useOutlineStore = create<IOutline>((set) => ({
  contentOutline: [],
  isOpen: true,
  hiddenOutline: {
    childrenByParent: {},
    hiddens: []
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
        const outlines = [...state.contentOutline];
        const childrenByParent = state.hiddenOutline.childrenByParent;
        const key = `h${level}-${idx}`;
        const childIndexByParent = getDataChildByParent(outlines, idx, level, childrenByParent, key)

        if (!childIndexByParent) {
          return;
        }

        if (statusParent) { // hien outline
          const hiddensChild = filterHidden(childIndexByParent, state.hiddenOutline.hiddens);
          state.hiddenOutline = {
            childrenByParent: {
              ...state.hiddenOutline.childrenByParent,
              [key]: childIndexByParent
            },
            hiddens: hiddensChild
          }
        } else { // an outline        
          state.hiddenOutline = {
            childrenByParent: {
              ...state.hiddenOutline.childrenByParent,
              [key]: childIndexByParent
            },
            hiddens: [
              ...state.hiddenOutline.hiddens, ...childIndexByParent
            ]
          }
        }
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

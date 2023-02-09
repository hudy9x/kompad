import create from "zustand";
import produce from "immer";

export interface IOutline {
  contentOutlines: OutlineItemTree[],
  isOpen: boolean,
  toggle: Record<string, boolean>,
  setToggle: (index: string) => void,
  setIsOpen: () => void,
  setOutlines: () => void,
}
export interface OutlineItemTree {
  id: string;
  title: string;
  level: number;
  parent?: string
  children: OutlineItemTree[] | [];
}
export interface OutlineItem {
  id: string;
  title: string;
  level: number;
  parent?: string
}

export const getAllOutline = () => {
  const headingEls = document.querySelectorAll<HTMLElement>(".tiptap-main-content h1, .tiptap-main-content h2, .tiptap-main-content h3, .tiptap-main-content h4, .tiptap-main-content h5, .tiptap-main-content h6");

  return [...headingEls].map((el) => ({
    id: el.id,
    title: el.innerText,
    level: Number(el.tagName.replace('H', '')),
  }));
}

/* It's adding a parentId to each item in the array. */
const addParentId = (outline: OutlineItem[]) => {
  const newOutline = [...outline];
  /* It's going through the array backwards. */
  for (let currentHeading = newOutline.length - 1; currentHeading >= 0; currentHeading--) {
    /* It's going through the array backwards. */
    for (let prevHeading = currentHeading - 1; prevHeading >= 0; prevHeading--) {
      /* It's checking if the current item has a parent. */
      if (newOutline[prevHeading].level < newOutline[currentHeading].level && !newOutline[currentHeading].hasOwnProperty("parent")) {
        newOutline[currentHeading] = {
          ...newOutline[currentHeading],
          parent: newOutline[prevHeading].id
        };
        break;
      }
    }
    /*Items without a parent should be assigned to "0"*/
    if (!newOutline[currentHeading].hasOwnProperty("parent")) {
      newOutline[currentHeading] = {
        ...newOutline[currentHeading],
        parent: "0"
      };
    }
  }
  return newOutline;
};

/* It's converting an array of objects into a tree structure. */
const arrayToTree = (arr: OutlineItem[], parent = "0"): OutlineItemTree[] => {
  return arr.filter((item) => item?.parent === parent) /* It's filtering the array by the parent. */
    .map((child) => ({ ...child, children: arrayToTree(arr, child.id) })); /* It's adding a children property to each item in the array. */
}

export const useOutlineStore = create<IOutline>((set) => ({
  contentOutlines: [],
  isOpen: true,
  toggle: {},
  setIsOpen: () => {
    set(
      produce<IOutline>((state) => {
        state.isOpen = !state.isOpen;
      })
    )
  },
  setToggle: (index) => {
    set(
      produce<IOutline>((state) => {
        const updateToggle = { ...state.toggle };
        updateToggle[index] = !updateToggle[index];
        state.toggle = updateToggle;
      })
    )
  },
  setOutlines: () => {
    set(
      produce<IOutline>((state) => {
        if (!state.isOpen) {
          const outlines = getAllOutline();
          const newOutlines = addParentId(outlines);
          state.contentOutlines = arrayToTree(newOutlines);
        }
      })
    )
  }
}))

export const { setState: setIsOpen } = useOutlineStore

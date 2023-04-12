import { create } from "zustand"
import produce from "immer"

export interface IOutline {
  contentOutlines: OutlineItemTree[]
  isOpen: boolean
  toggle: Record<string, boolean>
  setToggle: (index: string) => void
  setIsOpen: () => void
  setOutlines: () => void
}
export interface OutlineItemTree {
  id: string
  title: string
  level: number
  children: OutlineItemTree[]
}
export interface OutlineItem {
  id: string
  title: string
  level: number
}

export interface Queue {
  level: number
  item: OutlineItemTree
}

export const getAllOutline = () => {
  const headingEls = document.querySelectorAll<HTMLElement>(
    ".tiptap-main-content h1, .tiptap-main-content h2, .tiptap-main-content h3, .tiptap-main-content h4, .tiptap-main-content h5, .tiptap-main-content h6"
  )

  return [...headingEls].map((el) => ({
    id: el.id,
    title: el.innerText,
    level: Number(el.tagName.replace("H", "")),
  }))
}

const arrayToTree = (headings: OutlineItem[]) => {
  const tree: OutlineItemTree[] = []
  let queue: Queue[] = []

  for (let i = 0; i < headings.length; i++) {
    const head = headings[i]

    const level = head.level

    if (!queue.length) {
      const newItem = { ...head, ...{ children: [] } }

      tree.push(newItem)
      queue.push({ level, item: newItem })

      continue
    }

    let reset = false

    for (let i = queue.length - 1; i >= 0; i--) {
      const parent = queue[i]
      if (!parent) continue // run next item if null
      if (level > parent.level) {
        const child = { ...head, ...{ children: [] } }
        queue.push({ level, item: child })

        parent.item.children.push(child)
        break
      }

      if (level <= parent.level) {
        if (level === 1 || (i === 0 && level <= parent.level)) {
          reset = true
          break
        }
      }
    }

    if (reset) {
      const newItem = { ...head, ...{ children: [] } }

      tree.push(newItem)
      queue = [{ level, item: newItem }]

      continue
    }
  }

  return tree
}

export const useOutlineStore = create<IOutline>((set) => ({
  contentOutlines: [],
  isOpen: true,
  toggle: {},
  setIsOpen: () => {
    set(
      produce<IOutline>((state) => {
        state.isOpen = !state.isOpen
      })
    )
  },
  setToggle: (index) => {
    set(
      produce<IOutline>((state) => {
        const updateToggle = { ...state.toggle }
        updateToggle[index] = !updateToggle[index]
        state.toggle = updateToggle
      })
    )
  },
  setOutlines: () => {
    set(
      produce<IOutline>((state) => {
        if (!state.isOpen) {
          const outlines = getAllOutline()
          state.contentOutlines = arrayToTree(outlines)
        }
      })
    )
  },
}))

export const { setState: setIsOpen } = useOutlineStore

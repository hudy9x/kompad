// import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { Editor } from "@tiptap/react"
import produce from "immer"
import { setCache } from "../../libs/localCache"
import { IPadStore, setPadStoreState } from "../../store"
import { ISettingStore, setSettingState } from "../../store/settings"
import { IThemeStore, setThemeStoreState } from "../../store/themes"
import { IOutline, setIsOpen } from "../../store/outlines"
import { appWindow, LogicalSize } from "@tauri-apps/api/window"

export interface KeyBoardProps {
  shift: boolean
  control: boolean
  escape: boolean
  alt: boolean
  enter: boolean
  t: boolean
  b: boolean
  p: boolean
  i: boolean
  v: boolean
  c: boolean
  r: boolean
  n: boolean
  d: boolean
  o: boolean
  minus: boolean
  equal: boolean
  zero: boolean
}

const preventEvent = (
  ev: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent
) => {
  ev.stopPropagation()
  ev.preventDefault()
}

const markKeyPress = (
  pressed: KeyBoardProps,
  ev: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent
) => {
  const key = ev.key.toLowerCase()

  if (["-", "=", "0"].includes(key)) {
    pressed.minus = key === "-"
    pressed.equal = key === "="
    pressed.zero = key === "0"
    return
  }

  pressed[key as keyof typeof pressed] = ev.type === "keydown"
}

export const shortCutAction = (
  ev: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent,
  pressed?: KeyBoardProps,
  editor?: Editor
) => {
  const key = ev.key.toLowerCase()
  console.log(key)
  if (pressed && editor) {
    // pressed[key as keyof typeof pressed] = ev.type === "keydown"
    markKeyPress(pressed, ev)

    // Add Column Before
    if (pressed.alt && pressed.i && pressed.v) {
      preventEvent(ev)
      editor.chain().focus().addColumnBefore().run()
    }

    // Add Column After
    if (pressed.alt && pressed.i && pressed.c) {
      preventEvent(ev)
      editor.chain().focus().addColumnAfter().run()
    }

    // Add Row After
    if (pressed.alt && pressed.i && pressed.r) {
      preventEvent(ev)
      editor.chain().focus().addRowAfter().run()
    }

    // Add Row Before
    if (pressed.alt && pressed.i && pressed.t) {
      preventEvent(ev)
      editor.chain().focus().addRowBefore().run()
    }

    // Delete Column
    if (pressed.alt && pressed.d && pressed.c) {
      preventEvent(ev)
      editor.chain().focus().deleteColumn().run()
    }

    // Delete Row
    if (pressed.alt && pressed.d && pressed.r) {
      preventEvent(ev)
      editor.chain().focus().deleteRow().run()
    }

    // Delete Table
    if (pressed.alt && pressed.i && pressed.t) {
      preventEvent(ev)
      editor.chain().focus().deleteTable().run()
    }
  }

  if (pressed) {
    // pressed[key as keyof typeof pressed] = ev.type === "keydown"
    markKeyPress(pressed, ev)
    // Open/Close sidebar
    if (pressed.shift && pressed.control && pressed.b) {
      preventEvent(ev)
      setSettingState(
        produce<ISettingStore>((state) => {
          setCache("SETTING_VIEW_SIDEBAR", !state.view.sidebar ? "1" : "0")

          const mainContent = document.querySelector(
            ".main-content"
          ) as HTMLDivElement
          const w = mainContent.offsetWidth
          const h = document.body.offsetHeight

          // appWindow.size
          if (!state.view.sidebar === false) {
            appWindow.setSize(new LogicalSize(w, h))
          } else {
            appWindow.setSize(new LogicalSize(1360, h))
          }

          state.view.sidebar = !state.view.sidebar
        })
      )
    }

    //Open new pad modal
    if (pressed.control && pressed.n) {
      preventEvent(ev)
      setPadStoreState(
        produce<IPadStore>((state) => {
          state.newPadModalStatus = true
        })
      )
    }

    // Open search pallete
    if (pressed.alt && pressed.p) {
      preventEvent(ev)
      setPadStoreState(
        produce<IPadStore>((state) => {
          state.searchModalStatus = true
        })
      )
    }

    // Close search pallete if it visible
    if (pressed.escape && document.getElementById("pad-search")) {
      preventEvent(ev)
      setPadStoreState(
        produce<IPadStore>((state) => {
          state.searchModalStatus = false
        })
      )
    }

    if (pressed.control && pressed.t) {
      preventEvent(ev)
      setThemeStoreState(
        produce<IThemeStore>((state) => {
          state.visible = true
        })
      )
    }

    // Open/close outline
    if (pressed.alt && pressed.o) {
      preventEvent(ev)
      setIsOpen(
        produce<IOutline>((state) => {
          state.isOpen = !state.isOpen
        })
      )
    }

    // zoom out editor
    if (pressed.control && pressed.minus) {
      console.log("--")
      setSettingState(
        produce<ISettingStore>((state) => {
          // const oldDocZoom = state.documentZoom
          // const newDocZoom = oldDocZoom - 0.1
          // state.documentZoom = newDocZoom
        })
      )
    }

    // zoom in editor
    if (pressed.control && pressed.equal) {
      console.log("++")
      setSettingState(
        produce<ISettingStore>((state) => {
          // const oldDocZoom = state.documentZoom
          // const newDocZoom = oldDocZoom + 0.1
          // state.documentZoom = newDocZoom
        })
      )
    }

    // reset zoom mode
    if (pressed.control && pressed.zero) {
      setSettingState(
        produce<ISettingStore>((state) => {
          // state.documentZoom = 1
        })
      )
    }
  }
}

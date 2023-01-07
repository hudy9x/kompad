// import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import { Editor } from "@tiptap/react";
import produce from "immer";
import { setCache } from "../../libs/localCache";
import { IPadStore, setPadStoreState } from "../../store";
import { ISettingStore, setSettingState } from "../../store/settings";
import { IThemeStore, setThemeStoreState } from "../../store/themes";

export interface KeyBoardProps {
  shift: boolean,
  control: boolean,
  escape: boolean,
  alt: boolean,
  enter: boolean,
  t: boolean,
  b: boolean,
  p: boolean,
  i: boolean,
  v: boolean,
  c: boolean,
  r: boolean,
  d: boolean
}

export const shortCutAction = (ev: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent, pressed?: KeyBoardProps, editor?: Editor) => {


  if (pressed && editor) {
    // ev.stopPropagation();
    // ev.preventDefault();
    const key = ev.key.toLowerCase();
    pressed[key as keyof typeof pressed] = ev.type === 'keydown';

    if (pressed.control && pressed.enter) {
      console.log('Control enter pressed')
      editor.chain().focus().setHardBreak().run()
    }

    // Add Column Before
    if (pressed.alt && pressed.i && pressed.v) {
      editor.chain().focus().addColumnBefore().run()
    }

    // Add Column After
    if (pressed.alt && pressed.i && pressed.c) {
      editor.chain().focus().addColumnAfter().run()
    }

    // Add Row After
    if (pressed.alt && pressed.i && pressed.r) {
      editor.chain().focus().addRowAfter().run()
    }

    // Add Row Before
    if (pressed.alt && pressed.i && pressed.t) {
      editor.chain().focus().addRowBefore().run()
    }

    // Delete Column
    if (pressed.alt && pressed.d && pressed.c) {
      editor.chain().focus().deleteColumn().run()
    }

    // Delete Row
    if (pressed.alt && pressed.d && pressed.r) {
      editor.chain().focus().deleteRow().run()
    }

    // Delete Table
    if (pressed.alt && pressed.i && pressed.t) {
      editor.chain().focus().deleteTable().run()
    }

    // Open/Close sidebar
    if (pressed.shift && pressed.control && pressed.b) {
      setSettingState(
        produce<ISettingStore>((state) => {
          setCache("SETTING_VIEW_SIDEBAR", !state.view.sidebar ? "1" : "0");
          // appWindow.setSize(new LogicalSize(1200, 500))
          state.view.sidebar = !state.view.sidebar;
        })
      );
    }

    //Open new pad modal
    if (pressed.control && pressed.p) {
      setPadStoreState(
        produce<IPadStore>((state) => {
          state.newPadModalStatus = true;
        })
      );
    }

    // Open search pallete
    if (pressed.alt && pressed.p) {
      setPadStoreState(
        produce<IPadStore>((state) => {
          state.searchModalStatus = true;
        })
      );
    }

    // Close search pallete if it visible
    if (pressed.escape && document.getElementById("pad-search")) {
      setPadStoreState(
        produce<IPadStore>((state) => {
          state.searchModalStatus = false;
        })
      );
    }

    if (pressed.control && pressed.t) {
      setThemeStoreState(
        produce<IThemeStore>((state) => {
          state.visible = true
        })
      );
    }
  }

};

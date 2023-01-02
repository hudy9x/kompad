// import { appWindow, LogicalSize } from "@tauri-apps/api/window";
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
  t: boolean,
  b: boolean,
  p: boolean,
}

export const shortCutAcion = (
  ev: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent,
  pressed?: KeyBoardProps
  ) => {
  if(pressed === undefined) {
    return;
  }
  
  ev.stopPropagation();
  ev.preventDefault();

  const key = ev.key.toLowerCase();
  pressed[key as keyof typeof pressed] = ev.type === 'keydown';
  
  // Open/Close sidebar
  if(pressed.shift && pressed.control && pressed.b) {
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
};

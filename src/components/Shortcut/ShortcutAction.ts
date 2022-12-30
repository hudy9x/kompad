// import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import produce from "immer";
import { setCache } from "../../libs/localCache";
import { IPadStore, setPadStoreState } from "../../store";
import { ISettingStore, setSettingState } from "../../store/settings";
import { IThemeStore, setThemeStoreState } from "../../store/themes";

export const shortCutAcion = (
  ev: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent,
  map?: Record<string, boolean>
  ) => {
  if(map === undefined) {
    return;
  }
  ev.stopPropagation();
  ev.preventDefault();

  // Open/Close sidebar
  if(map['shift'] && map['control'] && map['u']) {
     setSettingState(
      produce<ISettingStore>((state) => {
        setCache("SETTING_VIEW_SIDEBAR", !state.view.sidebar ? "1" : "0");
        // appWindow.setSize(new LogicalSize(1200, 500))
        state.view.sidebar = !state.view.sidebar;
      })
    );
  }

  //Open new pad modal
  if (map['control'] && map['n']) {
    setPadStoreState(
      produce<IPadStore>((state) => {
        state.newPadModalStatus = true;
      })
    );
    map = {}
  }

  // Open search pallete
  if (map['alt'] && map['p']) {
    setPadStoreState(
      produce<IPadStore>((state) => {
        state.searchModalStatus = true;
      })
    );
  }

  // Close search pallete if it visible
  if (map['escape'] && document.getElementById("pad-search")) {
    setPadStoreState(
      produce<IPadStore>((state) => {
        state.searchModalStatus = false;
      })
    );
  }

  if (map['control'] && map['t']) {
    setThemeStoreState(
      produce<IThemeStore>((state) => {
        state.visible = true
      })
    );
  }
};

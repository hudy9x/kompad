// import { appWindow, LogicalSize } from "@tauri-apps/api/window";
import produce from "immer";
import { setCache } from "../../libs/localCache";
import { IPadStore, setPadStoreState } from "../../store";
import { ISettingStore, setSettingState } from "../../store/settings";
import { IThemeStore, setThemeStoreState } from "../../store/themes";

export const shortCutAcion = (
  ev: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent
) => {
  const ctrlKey = ev.ctrlKey;
  const key = ev.key.toLowerCase();
  const alt = ev.altKey;
  const shift = ev.shiftKey;
  const esc = key === "escape";

  ev.stopPropagation();
  ev.preventDefault();

  // Open/Close sidebar
  if (shift && ctrlKey && key === "b") {
    setSettingState(
      produce<ISettingStore>((state) => {
        setCache("SETTING_VIEW_SIDEBAR", !state.view.sidebar ? "1" : "0");
        // appWindow.setSize(new LogicalSize(1200, 500))
        state.view.sidebar = !state.view.sidebar;
      })
    );
  }

  // Open new pad modal
  if (ctrlKey && key === "n") {
    setPadStoreState(
      produce<IPadStore>((state) => {
        state.newPadModalStatus = true;
      })
    );
  }

  // Open search pallete
  if (alt && key === "p") {
    setPadStoreState(
      produce<IPadStore>((state) => {
        state.searchModalStatus = true;
      })
    );
  }

  // Close search pallete if it visible
  if (esc && document.getElementById("pad-search")) {
    setPadStoreState(
      produce<IPadStore>((state) => {
        state.searchModalStatus = false;
      })
    );
  }

  // Open Theme selection modal
  if (ctrlKey && key === "t") {
    setThemeStoreState(
      produce<IThemeStore>((state) => {
        state.visible = true
      })
    );

  }
};

import produce from "immer";
import { setCache } from "../../libs/localCache";
import { ISettingStore, setSettingState } from "../../store/settings";

export const shortCutAcion = (
  ev: React.KeyboardEvent<HTMLDivElement> | KeyboardEvent
) => {
  const ctrlKey = ev.ctrlKey;
  const key = ev.key.toLowerCase();
  // const alt = ev.altKey;
  const shift = ev.shiftKey;

  ev.stopPropagation();
  ev.preventDefault();

  if (shift && ctrlKey && key === "b") {
    setSettingState(
      produce<ISettingStore>((state) => {
        setCache("SETTING_VIEW_SIDEBAR", !state.view.sidebar ? "1" : "0");
        state.view.sidebar = !state.view.sidebar;
      })
    );
  }

  if (ctrlKey && key === "n") {
  }
};

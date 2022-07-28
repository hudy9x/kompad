import TitlebarAction from "./TitlebarAction";
import "./titlebar.css";
import { isDesktopApp } from "../../libs/utils";

function Titlebar({ children }: { children?: JSX.Element | JSX.Element[] }) {
  if (!isDesktopApp()) {
    return null;
  }

  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="flex gap-4">
        <span className="ttb-icon"></span>
        {children ? children : null}
      </div>
      <TitlebarAction />
    </div>
  );
}

export default Titlebar;

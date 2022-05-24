import TitlebarAction from "./TitlebarAction";
import "./titlebar.css";

function Titlebar({ children }: { children?: JSX.Element | JSX.Element[] }) {
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

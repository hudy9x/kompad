import { GoThreeBars } from "react-icons/go";
import TitlebarAction from "./TitlebarAction";
import "./titlebar.css";

function Titlebar({ children }: { children?: JSX.Element | JSX.Element[] }) {
  return (
    <div data-tauri-drag-region className="titlebar">
      <div className="flex gap-4">
        <span className="ttb-icon">
          {/* <GoThreeBars /> */}
          {/* <img src={logosvg} width={18} /> */}
        </span>
        {children ? children : null}
        {/* <FileName /> */}
        {/* <div className="filename">script.md</div> */}
        {/* <Toolbar /> */}
      </div>
      <TitlebarAction />
    </div>
  );
}

export default Titlebar;

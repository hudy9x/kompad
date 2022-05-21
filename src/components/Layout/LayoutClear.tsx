import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar";
import Titlebar from "../Titlebar";
import TitlebarAction from "../Titlebar/TitlebarAction";

export default function LayoutClear() {
  return (
    <main className="layout-clear">
      <Titlebar />
      <Outlet />
    </main>
  );
}

import { Outlet } from "react-router-dom";
import Titlebar from "../Titlebar";
export default function LayoutClear() {
  return (
    <main className="layout-clear">
      <Titlebar />
      <Outlet />
    </main>
  );
}

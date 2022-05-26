import { Outlet } from "react-router-dom";
import Sidebar from "../../containers/Sidebar";
import Shortcut from "../Shortcut/Shortcut";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Shortcut />
    </>
  );
}

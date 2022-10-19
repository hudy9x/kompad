import { Outlet } from "react-router-dom";
import Autoupdate from "../Autoupdate";
import Sidebar from "../../containers/Sidebar";
import Shortcut from "../Shortcut/Shortcut";
import { isDesktopApp } from "../../libs/utils";
import ThemeUser from "../../containers/Theme/ThemeUser";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Shortcut />
      <ThemeUser />
      {isDesktopApp() ? <Autoupdate /> : null}
    </>
  );
}

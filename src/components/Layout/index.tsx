import { Outlet } from "react-router-dom";
import Autoupdate from "../Autoupdate";
import Sidebar from "../../containers/Sidebar";
import Shortcut from "../Shortcut/Shortcut";
import { isDesktopApp } from "../../libs/utils";
import ThemeSelection from "../../containers/Theme/ThemeSelection";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
      <Shortcut />
      <ThemeSelection />
      {isDesktopApp() ? <Autoupdate /> : null}
    </>
  );
}

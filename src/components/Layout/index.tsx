import { Outlet } from "react-router-dom";
import Autoupdate from "../Autoupdate";
import Sidebar from "../../containers/Sidebar";
import Shortcut from "../Shortcut/Shortcut";
import { isDesktopApp } from "../../libs/utils";
import ThemeSelection from "../../containers/Theme/ThemeSelection";
import AppMiddleware from "../../providers/AppMiddleware";

export default function Layout() {
  return (
    <AppMiddleware>
      <>
        <Sidebar />
        <main className="main-content">
          <Outlet />
        </main>
        <Shortcut />
        <ThemeSelection />
        {isDesktopApp() ? <Autoupdate /> : null}
      </>
    </AppMiddleware>
  );
}

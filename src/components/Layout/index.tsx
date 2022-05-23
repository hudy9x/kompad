import { Outlet } from "react-router-dom";
import Sidebar from "../../containers/Sidebar";

export default function Layout() {
  return (
    <>
      <Sidebar />
      <main>
        <Outlet />
      </main>
    </>
  );
}

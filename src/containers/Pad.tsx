import { Outlet } from "react-router-dom";
import Titlebar from "../components/Titlebar";

function Pad() {
  return (
    <>
      <Titlebar />
      <Outlet />
    </>
  );
}

export default Pad;

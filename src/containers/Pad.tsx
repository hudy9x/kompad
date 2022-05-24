import { Outlet } from "react-router-dom";
import PadEditor from "../components/PadEditor/index";
import Titlebar from "../components/Titlebar";

function Pad() {
  return (
    <>
      <Titlebar />
      <Outlet />
      {/* <PadEditor /> */}
    </>
  );
}

export default Pad;

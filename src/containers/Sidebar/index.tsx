import { useEffect } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useSettingStore } from "../../store/settings";
import PadList from "../Pads/PadList";
import PadNew from "../Pads/PadNew";
import PadSearch from "../PadSearch";
import PadSearchIcon from "../PadSearch/PadSearchIcon";

import RootSidebar from "./RootSidebar";

export default function Sidebar() {
  const sidebar = useSettingStore((state) => state.view.sidebar);
  const {resizeWindow,defaultWindow} = useSettingStore();
  const [width, height] = useWindowSize();
  useEffect(() => {
    const heightBrowserTaskbar = window.screen.height - height;
    if(width === window.screen.width && (height + heightBrowserTaskbar) === window.screen.height) {
      defaultWindow();
      return;
    }
    resizeWindow();
  },[width,height])
  return (
    <>
      <aside className={`sidebar flex-shrink-0 ${sidebar ? "" : "hidden"}`}>
        <div className="flex">
          <RootSidebar />
          <div className="second-sidebar">
            <div className="flex items-center gap-2 px-4 py-4 border-b border-gray-200 dark:border-gray-900">
              <PadSearchIcon />
              <PadNew />
            </div>

            <PadList />
            <PadSearch />
          </div>
        </div>
      </aside>
    </>
  );
}

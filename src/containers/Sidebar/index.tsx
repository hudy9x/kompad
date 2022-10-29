import { useSettingStore } from "../../store/settings";
import PadList from "../Pads/PadList";
import PadNew from "../Pads/PadNew";
import PadSearch from "../PadSearch";
import PadSearchIcon from "../PadSearch/PadSearchIcon";

import RootSidebar from "./RootSidebar";

export default function Sidebar() {
  const sidebar = useSettingStore((state) => state.view.sidebar);

  return (
    <>
      <aside className={`sidebar flex-shrink-0 ${sidebar ? "" : "hidden"}`}>
        <div className="flex">
          <RootSidebar />
          <div className="second-sidebar">
            <div className="second-sidebar-header">
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

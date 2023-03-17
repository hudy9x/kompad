import useMobileNavigator from "../../components/MobileNavigator/useMobileNavigator";
import { useOutlineStore } from "../../store/outlines";
import { useSettingStore } from "../../store/settings";
import { Outline } from "../Outline";
import PadList from "../Pads/PadList";
import PadNew from "../Pads/PadNew";
import PadSearch from "../PadSearch";
import PadSearchIcon from "../PadSearch/PadSearchIcon";

import RootSidebar from "./RootSidebar";

export default function Sidebar() {
  const sidebar = useSettingStore((state) => state.view.sidebar);
  const isOpen = useOutlineStore((state) => state.isOpen);
  const { secondSidebarVisibility } = useMobileNavigator()
  const secondSidebarClasses = ["second-sidebar"]
  
  if (secondSidebarVisibility) {
    secondSidebarClasses.push("visible")
  }

  return (
    <>
      <aside className={`sidebar flex-shrink-0 ${sidebar ? "" : "hidden"}`}>
        <div className="flex">
          <RootSidebar />
          <div className={secondSidebarClasses.join(' ')}>
            <div className={`${isOpen ? "" : "hidden"}`}>
              <div className="second-sidebar-header">
                <PadSearchIcon />
                <PadNew />
              </div>
              <PadList />
              <PadSearch />
            </div>
            <div className={`${isOpen ? "hidden" : ""}`} >
              <Outline/>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

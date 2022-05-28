import { useSettingStore } from "../../store/settings";
import PadList from "../Pads/PadList";
import PadNew from "../Pads/PadNew";
import PadSearch from "../PadSearch";
import PadSearchIcon from "../PadSearch/PadSearchIcon";
import UserSection from "./UserSection";

export default function Sidebar() {
  const sidebar = useSettingStore((state) => state.view.sidebar);
  console.log(sidebar);

  return (
    <aside className={`sidebar ${sidebar ? "" : "hidden"}`}>
      <div className="flex justify-between items-center px-4">
        <h2 className="py-3 text-xl font-bold">Kompad</h2>
        <PadSearchIcon />
      </div>

      <PadNew />
      <PadList />
      <PadSearch />
      <UserSection />
    </aside>
  );
}

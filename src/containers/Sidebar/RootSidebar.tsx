import ScrollBar from "../../components/ScrollBar";
import Category from "../Category";
import Folders from "../Folders";
import ShortcutModal from "../Settings/ShortcutModal";
import Tags from "../Tags";
import UserSection from "./UserSection";

function RootSidebar() {
  return (
    <div className="root-sidebar">
      <div className="flex justify-between items-center px-4 h-[44px]">
        <h2 className="brand-name">Kompad</h2>
      </div>

      <ScrollBar height="calc(100vh - 61px - 44px)">
        <Category />
        <Folders />
        <Tags />
      </ScrollBar>

      <UserSection />
      <ShortcutModal />
    </div>
  );
}

export default RootSidebar;

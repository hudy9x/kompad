import Category from "../Category";
import Folders from "../Folders";
import ShortcutModal from "../Settings/ShortcutModal";
import Tags from "../Tags";
import UserSection from "./UserSection";

function RootSidebar() {
  return (
    <div className="root-sidebar">
      <div className="flex justify-between items-center px-4">
        {/* <div className="h-8 w-8 p-1 rounded bg-gray-500">
          <img src="/logo128.png" alt="" className="w-full" />
        </div> */}
        <h2 className="py-3 text-sm font-bold">Kompad</h2>
      </div>

      <div className="side-section">
        <Category /> 
        <Folders />
        <Tags />
      </div>

      <UserSection />
      <ShortcutModal />
    </div>
  );
}

export default RootSidebar;

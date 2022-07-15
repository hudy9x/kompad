import { BiPlus } from "react-icons/bi";
import { BsFolder } from "react-icons/bs";
import { FcFolder, FcKindle } from "react-icons/fc";
import { HiHashtag } from "react-icons/hi";
import Folders from "../Folders";
import ShortcutModal from "../Settings/ShortcutModal";
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
        <section className="sec-container">
          <h2 className="sec-title">
            <FcKindle />
            <span>All notes</span>
          </h2>
          <div className="sec-content"></div>
        </section>

        <Folders />

        <section className="sec-container">
          <h2 className="sec-title group relative">
            <HiHashtag className="text-blue-500" />
            <span>Tags</span>
            <BiPlus className="hidden group-hover:block absolute top-3 right-2 w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-500" />
          </h2>
          <div className="sec-content">
            <div className="sec-item">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
              <span>javascript</span>
            </div>
            <div className="sec-item">
              <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
              <span>css</span>
            </div>
          </div>
        </section>
      </div>

      <UserSection />
      <ShortcutModal />
    </div>
  );
}

export default RootSidebar;

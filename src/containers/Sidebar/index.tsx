import { HiOutlineSearch } from "react-icons/hi";
import PadList from "../Pads/PadList";
import PadNew from "../Pads/PadNew";
import UserSection from "./UserSection";

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="flex justify-between items-center px-4">
        <h2 className="py-3 text-xl font-bold">Kompad</h2>
        <HiOutlineSearch
          className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-500"
          aria-hidden="true"
        />
      </div>

      <PadNew />
      <PadList />
      <UserSection />
    </aside>
  );
}

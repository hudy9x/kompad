import { HiOutlineSearch } from "react-icons/hi";
import { usePadStore } from "../../store";

function PadSearchIcon() {
  const setSearchModalStatus = usePadStore(
    (state) => state.setSearchModalStatus
  );

  const displaySearchModal = () => {
    setSearchModalStatus(true);
  };

  return (
    <div className="relative " onClick={displaySearchModal}>
      <input
        type="text"
        readOnly
        className="shadow-sm py-1 pl-7 block w-full text-sm cursor-pointer border-gray-300 hover:bg-gray-50 rounded-md dark:bg-gray-900 dark:border-gray-800"
        placeholder="Search ..."
      />
      <HiOutlineSearch
        className="h-3.5 w-3.5 text-gray-400 cursor-pointer hover:text-gray-500 absolute top-2 left-2"
        aria-hidden="true"
      />
    </div>
  );
}

export default PadSearchIcon;

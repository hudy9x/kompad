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
        className="shadow-sm block w-full cursor-pointer sm:text-sm border-gray-300 hover:bg-gray-50 rounded-md dark:bg-gray-900 dark:border-gray-800"
        placeholder="Find your pad ..."
      />
      <HiOutlineSearch
        className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-500 absolute top-3 right-2"
        aria-hidden="true"
      />
    </div>
  );
}

export default PadSearchIcon;

import React from "react";
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
    <HiOutlineSearch
      onClick={displaySearchModal}
      className="h-4 w-4 text-gray-400 cursor-pointer hover:text-gray-500"
      aria-hidden="true"
    />
  );
}

export default PadSearchIcon;

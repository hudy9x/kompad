import { HiOutlineSearch } from "react-icons/hi"
import { usePadStore } from "../../store"

function PadSearchIcon() {
  const setSearchModalStatus = usePadStore(
    (state) => state.setSearchModalStatus
  )

  const displaySearchModal = () => {
    setSearchModalStatus(true)
  }

  return (
    <div className="relative pad-search-wrapper" onClick={displaySearchModal}>
      <input
        type="text"
        readOnly
        className="pad-search-btn"
        placeholder="Search ..."
      />
      <HiOutlineSearch
        className="h-3.5 w-3.5 text-gray-400 cursor-pointer hover:text-gray-500 absolute top-2 left-2"
        aria-hidden="true"
      />
    </div>
  )
}

export default PadSearchIcon

import { HiOutlineArchive } from 'react-icons/hi'

export const PadArchive = () => {
  return (
    <a
      href="#archive"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
    >
      <HiOutlineArchive className="dropdown-icon" aria-hidden="true" />
      <span className="dropdown-text">Archive</span>
    </a>
  )
}

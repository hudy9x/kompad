import { HiOutlineUserAdd } from 'react-icons/hi'

export const PadShare = () => {
  return (
    <a
      href="#share"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
    >
      <HiOutlineUserAdd className="dropdown-icon" aria-hidden="true" />
      <span className="dropdown-text">Share</span>
    </a>
  )
}

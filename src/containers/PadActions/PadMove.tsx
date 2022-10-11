import { HiOutlineArrowCircleRight } from 'react-icons/hi'

export const PadMove = () => {
  return (
    <a
      href="#move"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
    >
      <HiOutlineArrowCircleRight className="dropdown-icon" aria-hidden="true" />
      <span className="dropdown-text">Move</span>
    </a>
  )
}


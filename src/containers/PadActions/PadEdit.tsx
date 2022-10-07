import { HiOutlinePencilAlt } from 'react-icons/hi'

export const PadEdit = () => {
  return (
    <a
      href="#edit"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
    >
      <HiOutlinePencilAlt className="dropdown-icon" aria-hidden="true" />
      <span className="dropdown-text">Edit</span>
    </a>
  )
}

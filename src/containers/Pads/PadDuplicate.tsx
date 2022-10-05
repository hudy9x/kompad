import { HiOutlineDocumentDuplicate } from 'react-icons/hi'

export const PadDuplicate = () => {
  return (
    <a
      href="#duplicate"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
    >
      <HiOutlineDocumentDuplicate
        className="dropdown-icon"
        aria-hidden="true"
      />
      <span className="dropdown-text">Duplicate</span>
    </a>
  )
}
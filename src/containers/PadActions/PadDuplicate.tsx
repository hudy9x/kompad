import { HiOutlineDocumentDuplicate } from 'react-icons/hi'

export const PadDuplicate = () => {
  return (
    <a
      href="#duplicate"
      className="dropdown-content"
    >
      <HiOutlineDocumentDuplicate
        className="dropdown-icon"
        aria-hidden="true"
      />
      <span className="dropdown-text">Duplicate</span>
    </a>
  )
}

import { AiOutlineImport } from 'react-icons/ai'

export const PadImport = () => {
  return (
    <a
      href="#edit"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
    >
      <AiOutlineImport className="dropdown-icon" aria-hidden="true" />
      <span className="dropdown-text">Import</span>
    </a>
  )
}

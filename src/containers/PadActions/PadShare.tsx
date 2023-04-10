import { HiOutlineUserAdd } from 'react-icons/hi'
import { IPad } from '../../services/pads'
import { message } from '../../components/message'
import { useCopyToClipboard } from '../../hooks/useCopyToClipboard'

export const PadShare = ({ data }: { data: IPad }) => {
  const copy  = useCopyToClipboard()
  const handlePadShare = async () => {
    const url = window.location.href
    await copy(url)
    message.success("Copy pad content successfully");
    
  }

  return (
    <a
      href="#share"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
      onClick={handlePadShare}
    >
      <HiOutlineUserAdd className="dropdown-icon" aria-hidden="true" />
      <span className="dropdown-text">Share</span>
    </a>
  )
}

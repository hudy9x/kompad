import { HiOutlineUserAdd } from 'react-icons/hi'
import { usePadStore } from '../../store/index';

export const PadShare = () => {
  const { setIsPadShareModal } = usePadStore()
  const openModalPadShare = async () => {
    setIsPadShareModal(true)
  }

  return (
    <div>
      <a
        href="#share"
        className="group dropdown-content flex items-center px-4 py-2 text-sm"
        onClick={openModalPadShare}
      >
        <HiOutlineUserAdd className="dropdown-icon" aria-hidden="true" />
        <span className="dropdown-text">Share</span>
      </a>
    </div>
  )
}

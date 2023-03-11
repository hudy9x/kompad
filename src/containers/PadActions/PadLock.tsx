import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import { IPad, setLock } from '../../services/pads'

export const PadLock = ({ data }: { data: IPad }) => {
  const handleLockItem = async (e: { preventDefault: () => void }) => {
    e.preventDefault()
    await setLock(data.id!)
  }
  return (
    <a href="#lock"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
      onClick={handleLockItem}
    >
      {!data.lock ? <AiOutlineUnlock className="dropdown-icon dropdown-icon--active" /> : <AiOutlineLock className="dropdown-icon" />}
      <span className="dropdown-text">Lock</span>
    </a>
  )
}

import { HiOutlineStar, HiStar } from 'react-icons/hi'
import { IPad, setImportant } from '../../services/pads'

export const PadImportant = ({ data }: { data: IPad }) => {
  const handleImportantItem = async (e: any) => {
    e.preventDefault()
    await setImportant(data.id!)
  }
  return (
    <a href="#important"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"
      onClick={handleImportantItem}
    >
      {data.important ? <HiStar className="dropdown-icon dropdown-icon--active" /> : <HiOutlineStar className="dropdown-icon" />}
      <span className="dropdown-text">Important</span>
    </a>
  )
}



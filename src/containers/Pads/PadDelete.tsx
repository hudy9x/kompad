import { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'
import { delPad } from '../../services/pads'
import { usePadStore } from '../../store'
import { message } from '../../components/message'
import { decreasePlanRecord } from '../../services/plans'
import { useNavigate } from 'react-router-dom'

export const PadDelete = ({ id }: { id: string }) => {
  const [deleting, setDeleting] = useState(false)
  const navigate = useNavigate()
  const setNeedToUpdate = usePadStore((state) => state.setNeedToUpdate)
  const handleDeleteItem = async () => {
    if (deleting) {
      message.warning('The pad is in deleting process')
      return
    }
    setDeleting(true)

    await delPad(id)
    await decreasePlanRecord()

    setNeedToUpdate()
    setDeleting(false)
    navigate('/app/pad/')
    message.success('Deleted pad successfully')
  }
  return (
    <>
      <a
        href="#delete"
        onClick={handleDeleteItem}
        className="group dropdown-content flex items-center px-4 py-2 text-sm"
      >
        <HiOutlineTrash className="dropdown-icon" aria-hidden="true" />
        <span className="dropdown-text">Delete</span>
      </a>
    </>
  )
}

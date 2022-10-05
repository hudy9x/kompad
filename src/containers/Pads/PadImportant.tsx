import { HiOutlineStar } from 'react-icons/hi'
import { IPad, setImportant } from '../../services/pads'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}
export const PadImportant = ({ data }: { data: IPad }) => {
  const handleImportantItem = async (e: any) => {
    e.preventDefault()
    await setImportant(data.id!)
  }
  return (
    <>
      <a
        href="#important"
        className="group dropdown-content flex items-center px-4 py-2 text-sm"
        onClick={handleImportantItem}
      >
        <HiOutlineStar
          aria-hidden="true"
          // eslint-disable-next-line react/jsx-no-duplicate-props
          className={classNames(
            data.important ? 'dropdown-icon--active' : 'dropdown-icon',
            'groub dropdown-icon'
          )}
        />
        <span className="dropdown-text">Important</span>
      </a>
    </>
  )
}

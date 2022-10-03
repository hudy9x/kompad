/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { useNavigate } from 'react-router-dom'
import {
  HiOutlineArchive,
  HiOutlineArrowCircleRight,
  HiOutlineDocumentDuplicate,
  HiOutlineDotsVertical,
  HiOutlinePencilAlt,
  HiOutlineStar,
  HiOutlineTrash,
  HiOutlineUserAdd,
} from 'react-icons/hi'
import { usePadStore } from '../../store'
import { delPad, importantPad, statusImporantPad } from '../../services/pads'
import { message } from '../../components/message'
import { decreasePlanRecord } from '../../services/plans'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

export default function PadListFeature({
  id,
  statusImportant,
}: {
  id: string
  statusImportant: boolean
}) {
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

  const handleImportantItem = async () => {
    await importantPad(id)
    const notifyImportant = await statusImporantPad(id)
    navigate('/app/pad/important')
    if (notifyImportant) {
      message.success('Important pad successfully')
    } else {
      message.error('Remove important')
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="btn-dropdown justify-center rounded-md text-gray-500 px-4 py-2 text-sm font-medium">
          <HiOutlineDotsVertical
            className="-mr-1 ml-2 h-5 w-5"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="menuaction-items absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-999">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700'
                      : 'text-gray-700',
                    'group menuaction-hover flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <HiOutlinePencilAlt
                    className="menuaction-item menuaction-item-icon"
                    aria-hidden="true"
                  />
                  <span className="menuaction-item menuaction-item-text">
                    Edit
                  </span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700'
                      : 'text-gray-700',
                    'group menuaction-hover flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <HiOutlineDocumentDuplicate
                    className="menuaction-item menuaction-item-icon"
                    aria-hidden="true"
                  />
                  <span className="menuaction-item menuaction-item-text">
                    Duplicate
                  </span>
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700'
                      : 'text-gray-700',
                    'group menuaction-hover flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <HiOutlineArchive
                    className="menuaction-item menuaction-item-icon"
                    aria-hidden="true"
                  />
                  <span className="menuaction-item menuaction-item-text">
                    Archive
                  </span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700'
                      : 'text-gray-700',
                    'group menuaction-hover flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <HiOutlineArrowCircleRight
                    className="menuaction-item menuaction-item-icon"
                    aria-hidden="true"
                  />
                  <span className="menuaction-item menuaction-item-text">
                    Move
                  </span>
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700'
                      : 'text-gray-700',
                    'group menuaction-hover flex items-center px-4 py-2 text-sm'
                  )}
                >
                  <HiOutlineUserAdd
                    className="menuaction-item menuaction-item-icon"
                    aria-hidden="true"
                  />
                  <span className="menuaction-item menuaction-item-text">
                    Share
                  </span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700'
                      : 'text-gray-700',
                    'group menuaction-hover flex items-center px-4 py-2 text-sm'
                  )}
                  onClick={handleImportantItem}
                >
                  <HiOutlineStar
                    className="menuaction-item menuaction-item-icon"
                    aria-hidden="true"
                    style={
                      statusImportant
                        ? { color: 'red' }
                        : { color: 'text-gray-500' }
                    }
                  />
                  <span className="menuaction-item menuaction-item-text">
                    Important
                  </span>
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700'
                      : 'text-gray-700',
                    'group menuaction-hover flex items-center px-4 py-2 text-sm'
                  )}
                  onClick={handleDeleteItem}
                >
                  <HiOutlineTrash
                    className="menuaction-item menuaction-item-icon"
                    aria-hidden="true"
                  />
                  <span className="menuaction-item menuaction-item-text">
                    Delete
                  </span>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

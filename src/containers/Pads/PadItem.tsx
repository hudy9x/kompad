import dayjs from "dayjs"
import { Link } from "react-router-dom"
import { HiOutlineStar, HiStar } from "react-icons/hi"

import PadTag from "../../components/PadEditor/PadTag"
import PadFolder from "../../components/PadEditor/PadFolder"
import { IPad } from "../../services/pads"
import ContextMenu, { useContextMenu } from "../../components/ContextMenu"
import PadActions from "../PadActions/index"
import useMobileNavigator from "../../components/MobileNavigator/useMobileNavigator"

interface IPadItemProps {
  pad: IPad
  active: boolean
}

export default function PadItem({ active, pad }: IPadItemProps) {
  const { visible: isContextMenuDisplayed } = useContextMenu()
  const { setSecondSidebarVisible } = useMobileNavigator()
  const d = dayjs(pad.updatedAt.toDate())

  const onClick = () => {
    setSecondSidebarVisible()
  }

  return (
    <div
      className={`${active ? "active" : ""} ${
        isContextMenuDisplayed ? "context-menu-opened" : ""
      } pad-item group`}
    >
      <Link to={`/app/pad/${pad.id}`} onClick={onClick}>
        <div className="flex flex-col justify-between">
          <div className="min-w-0 flex-1">
            <div className="block focus:outline-none">
              <div className="flex items-center justify-between">
                <PadFolder selected={pad.folder || ""} />

                <time className="flex-shrink-0 whitespace-nowrap text-xs text-gray-500">
                  <i>{d.fromNow()}</i>
                </time>
              </div>

              <h2 className="pad-item-title mt-1" title={pad.title}>
                {pad.title}
              </h2>
              <p className="text-sm text-gray-500 truncate">
                {/* {pad.content} */}
              </p>
            </div>
          </div>
        </div>
        <PadTag className="mt-1" selected={pad.tags} />
        <div className="pad-as-important absolute bottom-5 right-4">
          {pad.important ? (
            <HiStar className="pad-important-icon" />
          ) : (
            <HiOutlineStar className="pad-unimportant-icon" />
          )}
        </div>
      </Link>
      <ContextMenu.Items>
        <PadActions data={pad} />
      </ContextMenu.Items>
    </div>
  )
}

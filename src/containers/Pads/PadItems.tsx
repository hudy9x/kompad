import { Link, useParams } from "react-router-dom";
import PadFolder from "../../components/PadEditor/PadFolder";
import PadTag from "../../components/PadEditor/PadTag";
import { IPad } from "../../services/pads"
import PadDelete from "./PadDelete";
import { PadImportant } from "./PadImportant";

export const PadItems = ({pad, day}: {pad: IPad, day: any}) => {
    const { id } = useParams();
    return (
      <li
      key={pad.id}
      className={`${
        id === pad.id ? "active" : "dark:bg-gray-800"
      } pad-item group`}
    >
      <Link to={`/app/pad/${pad.id}`}>
        <div className="flex flex-col justify-between">
          <div className="min-w-0 flex-1">
            <div className="block focus:outline-none">
              <div className="flex items-center justify-between">
                <PadFolder selected={pad.folder || ""} />
                <time className="flex-shrink-0 whitespace-nowrap text-xs text-gray-500">
                  <i>{day.fromNow()}</i>
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
      </Link>
      <div className="opacity-0 group-hover:opacity-100 transition-all absolute top-0 right-0 m-1">
        <PadDelete id={pad.id || ""} />
      </div>
      <div className="opacity-0 group-hover:opacity-100 transition-all absolute top-9 right-0 m-1">
        <PadImportant id={pad.id || ""} statusImportant = {pad.important || false } />
      </div>
    </li>
    )
  }
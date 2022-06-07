import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getPadsByUid, IPad } from "../../services/pads";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePadStore } from "../../store";
import PadDelete from "./PadDelete";

dayjs.extend(relativeTime);

function PadList() {
  const { user } = useAuth();
  const { id } = useParams();
  const newPadAdded = usePadStore((state) => state.needToUpdate);
  const [pads, setPads] = useState<IPad[]>([]);

  useEffect(() => {
    if (user?.uid) {
      getPadsByUid(user.uid).then((pads) => {
        if (!pads) {
          return;
        }

        setPads(pads);
      });
    }
  }, [user?.uid, newPadAdded]);

  return (
    <ul className="pad-list divide-y divide-gray-200 dark:divide-gray-900">
      {pads.map((pad) => {
        const d = dayjs(pad.updatedAt.toDate());
        return (
          <li
            key={pad.id}
            className={`${
              id === pad.id
                ? "bg-gray-100 dark:bg-gray-700"
                : "dark:bg-gray-800"
            } relative group cursor-pointer bg-white py-2 px-4 hover:bg-gray-50  dark:hover:bg-gray-700`}
          >
            <Link to={`/app/pad/${pad.id}`}>
              <div className="flex flex-col justify-between">
                <div className="min-w-0 flex-1">
                  <span className="block focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <time className="flex-shrink-0 whitespace-nowrap text-xs text-gray-500">
                      <i>{d.fromNow()}</i>
                    </time>
                    <h2 className="text-base font-medium text-gray-900 dark:text-gray-300 truncate">
                      {pad.title}
                    </h2>
                    <p className="text-sm text-gray-500 truncate">
                      {/* {pad.content} */}
                    </p>
                  </span>
                </div>
              </div>
              <div className="flex gap-1 mt-3">
                {/* <span className="pad-tag">
                  <i>#</i> Badge
                </span> */}
              </div>
            </Link>
            <div className="opacity-0 group-hover:opacity-100 transition-all absolute top-0 right-0 m-1">
              <PadDelete id={pad.id || ""} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export default PadList;

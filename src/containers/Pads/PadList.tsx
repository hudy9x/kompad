import dayjs from "dayjs";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { watchPads } from "../../services/pads";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePadListStore } from "../../store/pad";
import PadTag from "../../components/PadEditor/PadTag";
import PadFolder from "../../components/PadEditor/PadFolder";
import { Unsubscribe } from "firebase/firestore";
import PadActions from "../PadActions/index";
import ContextMenu from "../../components/ContextMenu";

dayjs.extend(relativeTime);

function PadList() {
  const { user } = useAuth();
  const { id } = useParams();
  const { pads, query, updatePadList } = usePadListStore();

  useEffect(() => {
    let unsub: Unsubscribe | null;
    if (user?.uid) {
      unsub = watchPads(query, (err, pads) => {
        if (err) {
          return;
        }

        updatePadList(pads);
      });
    }

    return () => {
      unsub && unsub();
    };

    // eslint-disable-next-line
  }, [user?.uid, query]);

  return (
    <ul className="pad-list divide-y divide-gray-200 dark:divide-gray-900">
      {pads.map((pad) => {
        const d = dayjs(pad.updatedAt.toDate());
        return (
          <li
            key={pad.id}
            className={`${id === pad.id
              ? "active"
              : "dark:bg-gray-800"
              } pad-item group`}
          >
            <ContextMenu>
              <Link to={`/app/pad/${pad.id}`}>
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
              </Link>
              <ContextMenu.Items>
                <PadActions data={pad} />
              </ContextMenu.Items>
            </ContextMenu>
          </li>
        );
      })}
    </ul>
  );
}

export default PadList;

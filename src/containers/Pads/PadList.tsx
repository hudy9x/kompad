import dayjs from "dayjs";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { watchPads } from "../../services/pads";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePadListStore } from "../../store/pad";
import { Unsubscribe } from "firebase/firestore";
import PadTag from "../../components/PadEditor/PadTag";
import PadFolder from "../../components/PadEditor/PadFolder";
import { Link, useParams } from "react-router-dom";
import PadListFeature from "./PadListFeature";

dayjs.extend(relativeTime);

function PadList() {
  const { user } = useAuth();
  const { pads, query, updatePadList } = usePadListStore();
  const { id } = useParams();
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
        <div className="opacity-0 group-hover:opacity-100 transition-all absolute top-0 right-0 m-1">
          <PadListFeature id={pad.id || ""} statusImportant = {pad.important || false } />
        </div>
      </li>
    )})}
    </ul>
  );
}

export default PadList;

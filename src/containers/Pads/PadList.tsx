import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { getPadsByUid, IPad } from "../../services/pads";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

function PadList() {
  const { user } = useAuth();
  const { id } = useParams();
  const messages = Array(12)
    .fill(1)
    .map((value, index) => ({
      id: index + 1,
      subject: "Velit placeat sit ducimus non sed",
      sender: "Gloria Roberston",
      time: "1d ago",
      datetime: "2021-01-27T16:35",
      preview:
        "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum",
    }));

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
  }, [user?.uid]);

  return (
    <ul className="pad-list divide-y divide-gray-200">
      {pads.map((pad) => {
        const d = dayjs(pad.updatedAt.toDate());
        return (
          <li
            key={pad.id}
            className={`${
              id === pad.id ? "bg-gray-100" : ""
            } relative cursor-pointer bg-white py-5 px-4 hover:bg-gray-50`}
          >
            <Link to={`/app/pad/${pad.id}`}>
              <div className="flex justify-between space-x-3">
                <div className="min-w-0 flex-1">
                  <span className="block focus:outline-none">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {pad.title}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {/* {pad.content} */}
                    </p>
                  </span>
                </div>
                <time
                  // dateTime={d.fromNow()}
                  className="flex-shrink-0 whitespace-nowrap text-xs text-gray-500"
                >
                  {d.fromNow()}
                </time>
              </div>
              <div className="flex gap-1 mt-3">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                  Badge
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                  Badge
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-yellow-100 text-yellow-800">
                  Badge
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default PadList;

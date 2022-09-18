import dayjs from "dayjs";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { watchPads } from "../../services/pads";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePadListStore } from "../../store/pad";
import { Unsubscribe } from "firebase/firestore";
import { PadItems } from "./PadItems";

dayjs.extend(relativeTime);

function PadList() {
  const { user } = useAuth();
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
      if(query.important && pad.important) {
        return <PadItems pad = {pad} day = {d}/>
        
      } else if(!query.important) {
        return <PadItems pad = {pad} day = {d}/>
      }
      return null;
    })}
    </ul>
  );
}

export default PadList;

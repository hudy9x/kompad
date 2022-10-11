import dayjs from "dayjs";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { watchPads } from "../../services/pads";
import relativeTime from "dayjs/plugin/relativeTime";
import { usePadListStore } from "../../store/pad";
import { Unsubscribe } from "firebase/firestore";
import ContextMenu from "../../components/ContextMenu";
import PadItem from "./PadItem";

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
    <div className="pad-list divide-y divide-gray-200 dark:divide-gray-900">
      {pads.map((pad) => {
        return (
          <ContextMenu key={pad.id}>
           <PadItem active={id===pad.id} pad={pad} />
         </ContextMenu>
        );
      })}
    </div>
  );
}

export default PadList;

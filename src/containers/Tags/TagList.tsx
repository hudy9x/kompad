import { Unsubscribe } from "firebase/firestore";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { watchTags } from "../../services/tags";
import { useTagStore } from "../../store/tags";
import TagItem from "./TagItem";

function TagList() {
  const { user } = useAuth();
  const { tags, updateTags } = useTagStore();

  useEffect(() => {
    let unsub: Unsubscribe | null;
    if (user) {
      unsub = watchTags((err, data) => {
        if (err) {
          return;
        }

        updateTags(data);
      });
    }

    return () => {
      unsub && unsub();
    };
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      {tags.map((tag) => {
        return <TagItem key={tag.id} tag={tag} />;
      })}
    </>
  );
}

export default TagList;

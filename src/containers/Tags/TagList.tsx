import { Unsubscribe } from "firebase/firestore";
import React, { useEffect } from "react";
import { HiX } from "react-icons/hi";
import { useAuth } from "../../hooks/useAuth";
import { delTag, watchTags } from "../../services/tags";
import { useTagStore } from "../../store/tags";

function TagList() {
  const { user } = useAuth();

  const { tags, updateTags } = useTagStore();

  const onDelete = (id: string) => {
    delTag(id);
  };

  useEffect(() => {
    let unsub: Unsubscribe | null;
    if (user) {
      unsub = watchTags((err, data) => {
        console.log(err);
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
        return (
          <div key={tag.id} className="flex items-center justify-between group">
            <div className="sec-item">
              <span
                style={{ backgroundColor: tag.color }}
                className="w-1.5 h-1.5  rounded-full"
              ></span>
              <span>{tag.title}</span>
            </div>
            <HiX
              onClick={() => onDelete(tag.id || "")}
              className="mr-5 group-hover:block hidden text-gray-400 cursor-pointer"
            />
          </div>
        );
      })}
    </>
  );
}

export default TagList;

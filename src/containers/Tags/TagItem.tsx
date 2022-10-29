import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { HiX } from "react-icons/hi";
import { delTag, ITag } from "../../services/tags";
import { usePadListStore } from "../../store/pad";
import TagEdit from "./TagEdit";

interface ITagItemProps {
  tag: ITag;
}

function TagItem({ tag }: ITagItemProps) {
  const [editMode, setEditMode] = useState(false);

  const { filterByTag, query } = usePadListStore();
  const isActive = tag.id === query.tag ? "font-bold" : "";

  const onDelete = (id: string) => {
    delTag(id);
  };

  const onSelectTag = () => {
    if (!tag.id) return;

    tag.id === query.tag && filterByTag("");
    tag.id !== query.tag && filterByTag(tag.id);
  };

  return (
    <>
      <div className="relative flex items-center justify-between group cursor-pointer">
        <div className="sec-item" onClick={onSelectTag}>
          <span
            style={{ backgroundColor: tag.color }}
            className={`w-1.5 h-1.5 rounded-full ml-1`}
          ></span>
          <span
            className={`${isActive} whitespace-nowrap w-32 text-ellipsis overflow-hidden ml-1`}
          >
            {tag.title}
          </span>
        </div>

        <div className="absolute top-1.5 right-0 group-hover:flex hidden gap-1 px-1 mr-5">
          <FiEdit3
            onClick={() => setEditMode(true)}
            className="w-3 text-color-base"
          />
          <HiX
            onClick={() => onDelete(tag.id || "")}
            className="text-color-base"
          />
        </div>
      </div>
      <TagEdit
        setVisible={setEditMode}
        visible={editMode}
        id={tag.id || ""}
        title={tag.title}
        color={tag.color}
      />
    </>
  );
}

export default TagItem;

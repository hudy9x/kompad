import { HiX } from "react-icons/hi";
import { delTag, ITag } from "../../services/tags";
import { usePadListStore } from "../../store/pad";

interface ITagItemProps {
  tag: ITag;
}

function TagItem({ tag }: ITagItemProps) {
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
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="sec-item" onClick={onSelectTag}>
        <span
          style={{ backgroundColor: tag.color }}
          className={`w-1.5 h-1.5 rounded-full `}
        ></span>
        <span className={isActive}>{tag.title}</span>
      </div>
      <HiX
        onClick={() => onDelete(tag.id || "")}
        className="mr-5 group-hover:block hidden text-gray-400 cursor-pointer"
      />
    </div>
  );
}

export default TagItem;

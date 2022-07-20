import { useParams } from "react-router-dom";
import TagDelete from "../../containers/Tags/TagDelete";
import TagSelect from "../../containers/Tags/TagSelect";
import { updatePadMetadata } from "../../services/pads";
import { useTagStore } from "../../store/tags";

interface IPadTagsProps {
  allowUpdateIfEmpty?: boolean;
  className?: string;
  selected: string[];
}

function PadTag({
  selected,
  className = "",
  allowUpdateIfEmpty = false,
}: IPadTagsProps) {
  const { id } = useParams();
  const { tags } = useTagStore();
  const s = [...selected];
  const filteredTags = tags.filter((t) => t.id && s.includes(t.id));

  const onTagSelect = (tagId: string) => {
    if (!allowUpdateIfEmpty || !id) return;

    if (selected.includes(tagId)) {
      return;
    }

    updatePadMetadata({ id, tags: [...selected, tagId] });
  };

  return (
    <div className={`flex gap-2 ${className}`}>
      {filteredTags.map((tag) => {
        return (
          <div
            key={tag.id}
            className="flex gap-1 items-center bg-gray-100 dark:bg-gray-700 px-1 rounded-md group relative"
          >
            <span
              style={{ backgroundColor: tag.color }}
              className="w-2 h-2 rounded-full"
            ></span>
            <span className="text-xs text-gray-400 ">{tag.title}</span>
            {allowUpdateIfEmpty ? (
              <TagDelete
                className="absolute top-1 right-1 hidden group-hover:block"
                pid={id || ""}
                tid={tag.id || ""}
              />
            ) : null}
          </div>
        );
      })}
      {allowUpdateIfEmpty ? <TagSelect onChange={onTagSelect} /> : null}
    </div>
  );
}

export default PadTag;

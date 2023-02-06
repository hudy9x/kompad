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
  const s = selected ? [...selected] : [];
  const filteredTags = tags.filter((t) => t.id && s.includes(t.id));

  const onTagSelect = (tagId: string) => {
    if (!allowUpdateIfEmpty || !id) return;

    if (selected.includes(tagId)) {
      return;
    }

    updatePadMetadata({ id, tags: [...selected, tagId] });
  };

  return (
    <div className={`tag-container flex gap-2 ${className}`}>
      {filteredTags.map((tag) => {
        return (
          <div
            key={tag.id}
            className="tag-item group"
          >
            <span
              style={{ backgroundColor: tag.color }}
              className="tag-icon w-2 h-2 rounded-full"
            ></span>
            <span className="tag-title text-xs">{tag.title}</span>
            {allowUpdateIfEmpty ? (
              <TagDelete
                className="tag-del absolute top-1 right-1 hidden group-hover:block"
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

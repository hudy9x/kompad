import { useTagStore } from "../../store/tags";

interface IPadTagsProps {
  className?: string;
  selected: string[];
}

function PadTag({ selected, className = "" }: IPadTagsProps) {
  const { tags } = useTagStore();
  const s = [...selected];

  const filteredTags = tags.filter((t) => t.id && s.includes(t.id));

  if (!filteredTags.length) {
    return null;
    // return (
    //   <div className="inline-flex gap-1 items-center bg-gray-100 px-1 rounded-md cursor-pointer hover:bg-gray-200">
    //     <span className="w-2 h-2 rounded-full bg-gray-300"></span>
    //     <span className="text-xs text-gray-400">new tag</span>
    //   </div>
    // );
  }

  return (
    <div className={`flex gap-2 ${className}`}>
      {filteredTags.map((tag) => {
        return (
          <div
            key={tag.id}
            className="flex gap-1 items-center bg-gray-100 px-1 rounded-md"
          >
            <span
              style={{ backgroundColor: tag.color }}
              className="w-2 h-2 rounded-full"
            ></span>
            <span className="text-xs text-gray-400">{tag.title}</span>
          </div>
        );
      })}
    </div>
  );
}

export default PadTag;

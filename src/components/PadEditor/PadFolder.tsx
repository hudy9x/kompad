import { BsFolder } from "react-icons/bs";
import { useFolderStore } from "../../store/folder";

interface IPadFolderProps {
  selected: string;
}

function PadFolder({ selected }: IPadFolderProps) {
  const { folders } = useFolderStore();
  const folder = folders.find((f) => f.id === selected);

  if (!folder) {
    return null;
  }

  return (
    <div className="flex gap-2 items-center text-xs text-gray-500">
      <BsFolder style={{ color: folder.color }} />
      <span>{folder.title}</span>
    </div>
  );
}

export default PadFolder;

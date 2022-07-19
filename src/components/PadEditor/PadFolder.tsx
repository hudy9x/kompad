import { BsFolder } from "react-icons/bs";
import { useParams } from "react-router-dom";
import FolderDelete from "../../containers/Folders/FolderDelete";
import FolderSelect from "../../containers/Folders/FolderSelect";
import { updatePadMetadata } from "../../services/pads";
import { useFolderStore } from "../../store/folder";

interface IPadFolderProps {
  allowUpdateIfEmpty?: boolean;
  selected: string;
}

function PadFolder({ selected, allowUpdateIfEmpty = false }: IPadFolderProps) {
  const { id } = useParams();
  const { folders } = useFolderStore();
  const folder = folders.find((f) => f.id === selected);

  const onFolderSelect = (folderId: string) => {
    if (!allowUpdateIfEmpty || !id) return;

    updatePadMetadata({ id, folder: folderId });
  };

  return (
    <>
      {folder ? (
        <div className="flex gap-2 items-center text-xs text-gray-500 group">
          <BsFolder style={{ color: folder.color }} />
          <span>{folder.title}</span>
          {allowUpdateIfEmpty ? (
            <FolderDelete pid={id || ""} className="hidden group-hover:block" />
          ) : null}
        </div>
      ) : null}
      {allowUpdateIfEmpty && !folder ? (
        <FolderSelect onChange={onFolderSelect} />
      ) : null}
    </>
  );
}

export default PadFolder;

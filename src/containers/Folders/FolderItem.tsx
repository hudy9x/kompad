import { HiX } from "react-icons/hi";
import { FaRegFolder } from "react-icons/fa";
import { delFolder, IFolder } from "../../services/folders";
import { usePadListStore } from "../../store/pad";
import { FiEdit3 } from "react-icons/fi";
import FolderItemAction from "./FolderItemAction/index";
import { useState } from "react";
import { AiOutlineFolderAdd } from "react-icons/ai";

interface IFolderItemProps {
  folder: IFolder;
}

export enum EFolderMode {
  CREATE = 'CREATE',
  EDIT = 'EDIT',
  CLOSE = 'CLOSE'
}

function FolderItem({ folder }: IFolderItemProps) {
  const [mode, setMode] = useState<EFolderMode>(EFolderMode.CLOSE);
  const { filterByFolder, query } = usePadListStore();

  const isActive = folder.id === query.folder ? "font-bold" : "";

  const onDelete = (id: string) => {
    delFolder(id);
  };

  const onSelectFolder = () => {
    if (!folder.id) return;

    folder.id === query.folder && filterByFolder("");
    folder.id !== query.folder && filterByFolder(folder.id);
  };

  return (
    <>
      <div className="relative flex items-center justify-between group cursor-pointer">
        <div className="sec-item" onClick={onSelectFolder}>
          <FaRegFolder style={{ color: folder.color }} />
          <span className={`${isActive} whitespace-nowrap w-32 text-ellipsis overflow-hidden`}>{folder.title}</span>
        </div>
        <div className="absolute top-1.5 right-0 group-hover:flex hidden gap-1 px-1 mr-5">
          <FiEdit3
            onClick={() => setMode(EFolderMode.EDIT)}
            className="w-3 text-color-base"
          />
          <AiOutlineFolderAdd
            onClick={() => setMode(EFolderMode.CREATE)}
            className="w-3 text-color-base"
          />
          <HiX
            onClick={() => onDelete(folder.id || "")}
            className="text-color-base"
          />
        </div>
      </div>
      <FolderItemAction
        setMode={setMode}
        mode={mode}
        id={folder.id || ""}
        title={folder.title}
        color={folder.color}
      />
    </>
  );
}

export default FolderItem;

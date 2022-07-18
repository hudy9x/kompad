import React from "react";
import { BsFolder } from "react-icons/bs";
import { HiX } from "react-icons/hi";
import { delFolder, IFolder } from "../../services/folders";
import { usePadListStore } from "../../store/pad";

interface IFolderItemProps {
  folder: IFolder;
}

function FolderItem({ folder }: IFolderItemProps) {
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
    <div className="flex items-center justify-between group cursor-pointer">
      <div className="sec-item" onClick={onSelectFolder}>
        <BsFolder style={{ color: folder.color }} />
        <span className={isActive}>{folder.title}</span>
      </div>
      <HiX
        onClick={() => onDelete(folder.id || "")}
        className="mr-5 group-hover:block hidden text-gray-400"
      />
    </div>
  );
}

export default FolderItem;

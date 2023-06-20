import React, { useState } from "react";
import { editFolder } from "../../../services/folders";
import ColorSelection from "../../../components/ColorSelection";
import { EFolderMode } from "../FolderItem";


interface IFolderEditProps {
  setMode?: React.Dispatch<React.SetStateAction<EFolderMode>>;
  mode?: EFolderMode;
  id: string;
  title: string;
  color: string;
}

function FolderItemAction({
  mode = EFolderMode.CLOSE,
  setMode,
  id,
  title,
  color,
}: IFolderEditProps) {
  const [text, setText] = useState(title);
  const [newColor, setNewColor] = useState(color);
  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const target = ev.target;
    setText(target.value);
  };

  const onNewColor = (color: string) => {
    setNewColor(color);
  };

  const onAction = () => {
    if (!id) return;
    
    if (mode === EFolderMode.EDIT) {
     editFolder({ id, title: text, color: newColor })
    } else {
     
    }
    setMode && setMode(mode)
  };

  const onClose = () => {
    setMode && setMode(EFolderMode.CLOSE);
  };

  return (
    <div
      className={`${mode === EFolderMode.CLOSE ? "hidden" : ""
        } form-edit`}
    >
      <input
        className=""
        type="text"
        value={mode === EFolderMode.EDIT ? text : ''}
        onChange={onChange}
      />

      <ColorSelection
        selected={newColor}
        onChange={onNewColor}
        className={`border-t border-color-base left-0 px-4 pt-4 pb-1`}
      />
      <div className="flex justify-end gap-2 px-4 py-2">
        <button
          onClick={onClose}
          type="button"
          className="btn btn-xs"
        >
          Cancel
        </button>
        <button
          onClick={onAction}
          type="button"
          className="btn btn-xs"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default FolderItemAction;

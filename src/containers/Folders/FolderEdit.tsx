import React, { useState } from "react";
import ColorSelection from "../../components/ColorSelection";
import { editFolder } from "../../services/folders";

interface IFolderEditProps {
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  visible?: boolean;
  id: string;
  title: string;
  color: string;
}

function FolderEdit({
  visible = false,
  setVisible,
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

  const onEdit = () => {
    if (!id) return;

    editFolder({ id, title: text, color: newColor }).finally(() => {
      setVisible && setVisible(false);
    });
  };

  const onClose = () => {
    setVisible && setVisible(false);
  };

  return (
    <div
      className={`${visible ? "" : "hidden"
        } form-edit`}
    >
      <input
        className=""
        type="text"
        value={text}
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
          onClick={onEdit}
          type="button"
          className="btn btn-xs"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default FolderEdit;

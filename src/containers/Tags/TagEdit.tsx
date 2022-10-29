import React, { useState } from "react";
import ColorSelection from "../../components/ColorSelection";
import { editTag } from "../../services/tags";

interface ITagEditProps {
  setVisible?: React.Dispatch<React.SetStateAction<boolean>>;
  visible?: boolean;
  id: string;
  title: string;
  color: string;
}

function TagEdit({
  visible = false,
  setVisible,
  id,
  title,
  color,
}: ITagEditProps) {
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

    editTag({ id, title: text, color: newColor }).finally(() => {
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
      <div className="flex justify-end gap-2  px-4 py-2">
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

export default TagEdit;

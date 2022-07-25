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
      className={`${
        visible ? "" : "hidden"
      } w-44 ml-4 rounded-md border  bg-white shadow-sm dark:bg-gray-800 dark:border-gray-800`}
    >
      <input
        className="py-2 block w-full text-xs border-transparent rounded-md dark:bg-gray-800"
        type="text"
        value={text}
        onChange={onChange}
      />

      <ColorSelection
        selected={newColor}
        onChange={onNewColor}
        className={`bg-white border-t border-gray-100 dark:border-gray-700 left-0 px-4 pt-4 pb-1 dark:bg-gray-800 `}
      />
      <div className="flex justify-end gap-2  px-4 py-2">
        <button
          onClick={onClose}
          type="button"
          className="inline-flex items-center px-2 py-0.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={onEdit}
          type="button"
          className="inline-flex items-center px-2 py-0.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-700 dark:text-gray-400"
        >
          Ok
        </button>
      </div>
    </div>
  );
}

export default TagEdit;

import { Editor } from "@tiptap/react";
import { TbColumnInsertRight } from "react-icons/tb"

export const AddColumnAfter = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#addColumnAfter"
      className="group dropdown-content flex px-4 py-2 text-sm">
      <TbColumnInsertRight className="dropdown-icon" />
      <span className="dropdown-text" onClick={() => editor.chain().focus().addColumnAfter().run()} >
        Add Column After
      </span>
    </a>
  )
}

import { Editor } from "@tiptap/react"
import { RiDeleteRow } from "react-icons/ri"

export const DeleteColumn = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#deleteColumn"
      className="group dropdown-content flex px-4 py-2 text-sm">
      <RiDeleteRow className="dropdown-icon" />
      <span className="dropdown-text" onClick={() => editor.chain().focus().deleteColumn().run()} >
        Delete Column
      </span>
    </a >
  )
}

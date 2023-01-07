import { Editor } from "@tiptap/react"
import { RiDeleteRow } from "react-icons/ri"

export const DeleteRow = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#deleteRow"
      className="group dropdown-content flex px-4 py-2 text-sm">
      <RiDeleteRow className="dropdown-icon" />
      <span className="dropdown-text" onClick={() => editor.chain().focus().deleteRow().run()} >
        Delete Row
      </span>
    </a >
  )
}

import { Editor } from "@tiptap/react"
import { TbTableOff } from "react-icons/tb"

export const DeleteTable = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#deletetable"
      className="group dropdown-content flex px-4 py-2 text-sm" >
      <TbTableOff className="dropdown-icon" />
      <span className="dropdown-text" onClick={() => editor.chain().focus().deleteTable().run()}>
        Delete Table
      </span>
    </a>
  )
}

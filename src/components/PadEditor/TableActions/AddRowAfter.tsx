import { Editor } from "@tiptap/react"
import { TbRowInsertTop } from "react-icons/tb"

export const AddRowAfter = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#addColumnAfter"
      className="group dropdown-content flex items-center px-4 py-2 text-sm">
      <TbRowInsertTop className="dropdown-icon" />
      <span className="dropdown-text" onClick={() => editor.chain().focus().addRowAfter().run()} >
        Add Row After
      </span>
    </a>
  )
}

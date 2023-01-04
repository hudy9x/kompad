import { Editor } from "@tiptap/react"
import { TbRowInsertBottom } from "react-icons/tb"

export const AddRowAfter = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#addColumnAfter"
      className="group dropdown-content flex justify-between items-center px-4 py-2 text-sm">
      <TbRowInsertBottom className="dropdown-icon"/>
      <span className="dropdown-text" onClick={() => editor.chain().focus().addRowAfter().run()} >
        Add Row After
      </span>
    </a>
  )
}

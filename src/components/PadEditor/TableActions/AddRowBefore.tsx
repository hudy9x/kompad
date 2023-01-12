import { Editor } from "@tiptap/react"
import { TbRowInsertBottom } from "react-icons/tb"

export const AddRowBefore = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#addRowBefore"
      className="group dropdown-content flex px-4 py-2 text-sm">
      <TbRowInsertBottom className="dropdown-icon" />
      <span className="dropdown-text" onClick={() => editor.chain().focus().addRowBefore().run()}>
        Add Row Before
      </span>
    </a  >
  )
}

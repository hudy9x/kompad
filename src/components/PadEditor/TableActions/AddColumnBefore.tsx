import { Editor } from "@tiptap/react"
import { TbColumnInsertLeft } from "react-icons/tb"

export const AddColumnBefore = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#addColumnBefore"
      className="group dropdown-content flex px-4 py-2 text-sm">
      <TbColumnInsertLeft className="dropdown-icon" />
      <span className="dropdown-text" onClick={() => editor.chain().focus().addColumnBefore().run()}>
        Add Column Before
      </span>
    </a >
  )
}

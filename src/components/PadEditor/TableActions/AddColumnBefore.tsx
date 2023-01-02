import { Editor } from "@tiptap/react"

export const AddColumnBefore = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#addColumnBefore"
      className="group dropdown-content flex items-center px-4 py-2 text-sm"> 
      <button onClick={() => editor.chain().focus().addColumnBefore().run()} >
        Add Column Before
      </button>
    </a > 
  )
}

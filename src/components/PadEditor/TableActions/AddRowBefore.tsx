import { Editor } from "@tiptap/react"

export const AddRowBefore = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#addRowBefore"
      className="group dropdown-content flex items-center px-4 py-2 text-sm">
      <button onClick={() => editor.chain().focus().addRowBefore().run()}>
        Add Row Before
      </button>
    </a  >
  )
}

import { Editor } from "@tiptap/react"

export const AddRowAfter = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#addColumnAfter"
      className="group dropdown-content flex items-center px-4 py-2 text-sm">
      <button onClick={() => editor.chain().focus().addRowAfter().run()} >
        Add Row After
      </button>
    </a>
  )
}

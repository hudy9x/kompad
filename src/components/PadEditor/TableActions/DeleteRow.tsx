import { Editor } from "@tiptap/react"

export const DeleteRow = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#deleteRow"
      className="group dropdown-content flex items-center px-4 py-2 text-sm">
      <button onClick={() => editor.chain().focus().deleteRow().run()} >
        Delete Row
      </button>
    </a >
  )
}

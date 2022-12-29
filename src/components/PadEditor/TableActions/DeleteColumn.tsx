import { Editor } from "@tiptap/react"

export const DeleteColumn = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#deleteColumn"
      className="group dropdown-content flex items-center px-4 py-2 text-sm">
      <button onClick={() => editor.chain().focus().deleteColumn().run()} >
        Delete Column
      </button>
    </a >
  )
}

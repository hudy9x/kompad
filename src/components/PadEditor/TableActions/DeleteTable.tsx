import { Editor } from "@tiptap/react"

export const DeleteTable = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#deletetable"
      className="group dropdown-content flex items-center px-4 py-2 text-sm" >
      <button onClick={() => editor.chain().focus().deleteTable().run()}>
        Delete Table
      </button>
    </a  >
  )
}

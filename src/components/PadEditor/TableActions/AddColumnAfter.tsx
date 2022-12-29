import { Editor } from "@tiptap/react";

export const AddColumnAfter = ({ editor }: { editor: Editor }) => {
  return (
    <a href="#addColumnAfter"
      className="group dropdown-content flex items-center px-4 py-2 text-sm">
      <button onClick={() => editor.chain().focus().addColumnAfter().run()} >
        Add Column After
      </button>
    </a>
  )
}

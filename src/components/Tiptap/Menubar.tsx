import { BubbleMenu, Editor } from "@tiptap/react";

interface IMenuBarProps {
  editor: Editor | null;
}
const MenuBar = ({ editor }: IMenuBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      {editor ? (
        <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
          <div className="tiptab-format-actions">
            <button
              className={`btn ${editor.isActive("bold") ? "is-active" : ""}`}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              bold
            </button>
            <button
              onClick={() =>
                editor.chain().focus().toggleHeading({ level: 2 }).run()
              }
              className={`btn ${
                editor.isActive("heading", { level: 2 }) ? "is-active" : ""
              }`}
            >
              h2
            </button>
            <button
              className="btn"
              onClick={() => editor.chain().focus().undo().run()}
            >
              undo
            </button>
            <button
              className="btn"
              onClick={() => editor.chain().focus().redo().run()}
            >
              redo
            </button>
          </div>
        </BubbleMenu>
      ) : null}
    </>
  );
};

export default MenuBar;

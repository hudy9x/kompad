import { BubbleMenu, Editor } from "@tiptap/react";
import {
  AiOutlineBold,
  AiOutlineCheckSquare,
  AiOutlineHighlight,
  AiOutlineItalic,
  AiOutlineStrikethrough,
} from "react-icons/ai";

interface IControlBarProps {
  editor: Editor | null;
}

const ControlBar = ({ editor }: IControlBarProps) => {
  if (!editor) {
    return null;
  }

  return (
    <>
      {editor ? (
        <BubbleMenu editor={editor} tippyOptions={{ duration: [500, 200] }}>
          <div className="tiptab-format-actions divide-x divide-gray-700">
            <div className="tiptap-action-group">
              <button
                className={`${editor.isActive("bold") ? "is-active" : ""}`}
                onClick={() => editor.chain().focus().toggleBold().run()}
              >
                <AiOutlineBold className="w-8 h-8 p-2 rounded-md text-white hover:bg-gray-800" />
              </button>
              <button
                className={`${editor.isActive("bold") ? "is-active" : ""}`}
                onClick={() => editor.chain().focus().toggleItalic().run()}
              >
                <AiOutlineItalic className="w-8 h-8 p-2 rounded-md text-white hover:bg-gray-800" />
              </button>
              <button
                className={`${editor.isActive("bold") ? "is-active" : ""}`}
                onClick={() => editor.chain().focus().toggleStrike().run()}
              >
                <AiOutlineStrikethrough className="w-8 h-8 p-2 rounded-md text-white hover:bg-gray-800" />
              </button>
            </div>

            {/* <div className="tiptap-action-group">
              <button
                className={`${editor.isActive("bold") ? "is-active" : ""}`}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <AiOutlineOrderedList className="w-8 h-8 p-2 rounded-md text-white hover:bg-gray-800" />
              </button>
              <button
                className={`${editor.isActive("bold") ? "is-active" : ""}`}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <AiOutlineUnorderedList className="w-8 h-8 p-2 rounded-md text-white hover:bg-gray-800" />
              </button>
            </div> */}

            <div className="tiptap-action-group">
              <button
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                className={`w-8 h-8 flex items-center justify-center rounded-md text-white hover:bg-gray-800 ${
                  editor.isActive("heading", { level: 2 }) ? "is-active" : ""
                }`}
              >
                <span className=" whitespace-nowrap ">H2</span>
              </button>
            </div>

            <div className="tiptap-action-group gap-2">
              <button
                onClick={() => {
                  editor.commands.toggleHighlight({ color: "#fef08a" });
                }}
              >
                <AiOutlineHighlight className="w-8 h-8 p-2 rounded-md text-gray-700 bg-yellow-200 hover:bg-yellow-300" />
              </button>

              <button
                onClick={() => {
                  editor.commands.toggleHighlight({ color: "#99f6e4" });
                }}
              >
                <AiOutlineHighlight className="w-8 h-8 p-2 rounded-md text-gray-700 bg-green-200 hover:bg-green-300" />
              </button>
            </div>

            <div className="tiptap-action-group">
              <button
                onClick={() => {
                  editor.commands.toggleTaskList();
                }}
              >
                <AiOutlineCheckSquare className="w-8 h-8 p-2 rounded-md text-white hover:bg-gray-800" />
              </button>
            </div>
          </div>
        </BubbleMenu>
      ) : null}
    </>
  );
};

export default ControlBar;

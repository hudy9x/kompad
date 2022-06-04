import { Editor } from "@tiptap/react";
import { useCallback } from "react";
import {
  AiOutlineBold,
  AiOutlineCheckSquare,
  AiOutlineDash,
  AiOutlineHighlight,
  AiOutlineItalic,
  AiOutlineOrderedList,
  AiOutlineStrikethrough,
  AiOutlineUnorderedList,
} from "react-icons/ai";
import { BsCardImage, BsCodeSlash } from "react-icons/bs";
import { IoLinkOutline } from "react-icons/io5";
// import { MdRedo, MdUndo } from "react-icons/md";
import { RiDoubleQuotesL, RiSingleQuotesL } from "react-icons/ri";

export default function FixedControlBar({ editor }: { editor: Editor | null }) {
  const setLink = useCallback(() => {
    if (editor) {
      const previousUrl = editor.getAttributes("link").href;
      const url = window.prompt("URL", previousUrl);

      // cancelled
      if (url === null) {
        return;
      }

      // empty
      if (url === "") {
        editor.chain().focus().extendMarkRange("link").unsetLink().run();

        return;
      }

      // update link
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: url })
        .run();
    }
  }, [editor]);

  if (!editor) {
    return null;
  }

  const addImage = () => {
    const url = window.prompt("URL");

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  return (
    <div className="fixed-controlbar">
      <div className="controlbar-container flex flex-wrap gap-1">
        <button
          className={`${editor.isActive("bold") ? "is-active" : ""}`}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <AiOutlineBold className="control-icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <AiOutlineItalic className="control-icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <AiOutlineStrikethrough className="control-icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <RiSingleQuotesL className="control-icon" />
        </button>

        {/* <Heading /> */}

        {/* <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={`control-icon flex items-center text-xs justify-center ${
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }`}
        >
          <span>h1</span>
        </button> */}
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`control-icon flex items-center text-xs justify-center ${
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }`}
        >
          <span>h2</span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={`control-icon flex items-center text-xs justify-center ${
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }`}
        >
          <span>h3</span>
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={`control-icon flex items-center text-xs justify-center ${
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }`}
        >
          <span>h4</span>
        </button>

        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <AiOutlineUnorderedList className="control-icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <AiOutlineOrderedList className="control-icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <BsCodeSlash className="control-icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <RiDoubleQuotesL className="control-icon" />
        </button>
        <button
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <AiOutlineDash className="control-icon" />
        </button>
        {/* <button onClick={() => editor.chain().focus().undo().run()}>
          <MdUndo className="control-icon" />
        </button>
        <button onClick={() => editor.chain().focus().redo().run()}>
          <MdRedo className="control-icon" />
        </button> */}

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

        <button
          onClick={() => {
            editor.commands.toggleTaskList();
          }}
        >
          <AiOutlineCheckSquare className="control-icon" />
        </button>

        <button onClick={addImage}>
          <BsCardImage className="control-icon" />
        </button>
        <button onClick={setLink}>
          <IoLinkOutline className="control-icon" />
        </button>
      </div>
    </div>
  );
}

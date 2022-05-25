import {
  useEditor,
  EditorContent,
  Editor,
  EditorOptions,
  EditorEvents,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";

import MenuBar from "./Menubar";
import { updatePad } from "../../services/pads";
import { useCallback, useEffect, useState } from "react";

interface IPadEditorProp {
  id: string;
  content: string;
}

const PlaceholderConfig = Placeholder.configure({
  placeholder: "Write something …",
});

let timer = 0;

export default function PadEditor({ id, content }: IPadEditorProp) {
  const [update, setUpdate] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit, Highlight, Typography, PlaceholderConfig],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-2xl focus:outline-none m-auto",
      },
    },
    content: content,
    onUpdate: ({ editor }) => {
      setUpdate((prevUpdate) => prevUpdate + 1);
    },
  });

  useEffect(() => {
    console.log(editor);
    if (editor) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        const { content } = editor.getJSON();
        const title = content ? content[0] : null;
        let newTitle = "";

        if (title && title.content) {
          newTitle = title.content.reduce((prev, next) => {
            prev += next.text || "";
            return prev;
          }, "");
        }

        updatePad({ id, title: newTitle, content: editor.getHTML() });
      }, 600) as unknown as number;
    }
  }, [update]);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
  }, [content]);

  return (
    <div className="tiptap-container">
      <EditorContent editor={editor} className="tiptap-main-content" />
      <MenuBar editor={editor} />
    </div>
  );
}

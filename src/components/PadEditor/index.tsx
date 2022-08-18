import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Typography from "@tiptap/extension-typography";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import ListItem from "@tiptap/extension-list-item";
import CharacterCount from "@tiptap/extension-character-count";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import * as lowlight from "lowlight";

import ControlBar from "./ControlBar";
import { IPad, updatePad } from "../../services/pads";
import { useEffect, useState } from "react";
import { shortCutAcion } from "../Shortcut/ShortcutAction";
import FixedControlBar from "./FixedControlBar";
import ErrorCapture from "../ErrorCapture";
import PadInfo from "./PadInfo";
// import Diagram from "../"
import NodeDiagram from '../../nodes/NodeDiagram'

interface IPadEditorProp {
  id: string;
  content: string;
  data: IPad;
}

const PlaceholderConfig = Placeholder.configure({
  placeholder: "Write something …",
});

let timer = 0;

const HighlightConfigure = Highlight.configure({
  multicolor: true,
});

const TaskListConfigure = TaskList.configure({
  HTMLAttributes: {
    class: "task-list",
  },
});

const limit = 20000;
const CharacterCountConfigure = CharacterCount.configure({
  limit,
});

const CodeBlockLowlightConfigure = CodeBlockLowlight.configure({
  // @ts-ignore
  lowlight: lowlight.lowlight,
});

const extensions = [
  StarterKit,
  HighlightConfigure,
  Typography,
  PlaceholderConfig,
  TaskListConfigure,
  TaskItem.configure({
    nested: true,
  }),
  ListItem,
  CharacterCountConfigure,
  Image,
  Link.configure({
    openOnClick: false,
  }),
  CodeBlockLowlightConfigure,
  NodeDiagram,
];

export default function PadEditor({ id, content, data }: IPadEditorProp) {
  const [update, setUpdate] = useState(0);

  const editor = useEditor({
    extensions: extensions,
    editorProps: {
      attributes: {
        class: "",
      },
    },
    //    content: content,
    content: `<react-component></react-component>`,
    onUpdate: ({ editor }) => {
      setUpdate((prevUpdate) => prevUpdate + 1);
    },
  });

  useEffect(() => {
    if (editor) {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        updatePad({ id, content: editor.getHTML() });
      }, 600) as unknown as number;
    }

    // eslint-disable-next-line
  }, [update]);

  useEffect(() => {
    if (editor) {
      editor.commands.setContent(content);
    }
    // eslint-disable-next-line
  }, [content]);

  return (
    <ErrorCapture>
      <div className="tiptap-container">
        <FixedControlBar editor={editor} />
        <div className="tiptap-box">
          <PadInfo />
          <EditorContent
            editor={editor}
            className="tiptap-main-content"
            spellCheck={false}
            onKeyUp={(ev: React.KeyboardEvent<HTMLDivElement>) => {
              shortCutAcion(ev);
            }}
          />
        </div>
        <ControlBar editor={editor} />
        <div className="character-count">
          {editor && editor.storage.characterCount.words()} words
        </div>
      </div>
    </ErrorCapture>
  );
}

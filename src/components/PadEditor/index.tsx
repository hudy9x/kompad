import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import Highlight from "@tiptap/extension-highlight"
import Typography from "@tiptap/extension-typography"
import Placeholder from "@tiptap/extension-placeholder"
import TaskList from "@tiptap/extension-task-list"
import TaskItem from "@tiptap/extension-task-item"
import ListItem from "@tiptap/extension-list-item"
import Table from "@tiptap/extension-table"
import TableHeader from "@tiptap/extension-table-header"
import TableRow from "@tiptap/extension-table-row"
import TableCell from "@tiptap/extension-table-cell"
import { Extension } from "@tiptap/core"
import CharacterCount from "@tiptap/extension-character-count"
import Image from "@tiptap/extension-image"
import Link from "@tiptap/extension-link"
import Youtube from "@tiptap/extension-youtube"
import { lowlight } from "lowlight"

import ControlBar from "./ControlBar"
import { IPad, updatePad } from "../../services/pads"
import { useEffect, useState } from "react"
import { shortCutAction } from "../Shortcut/ShortcutAction"
import FixedControlBar from "./FixedControlBar"
import ErrorCapture from "../ErrorCapture"
import PadInfo from "./PadInfo"

import ScrollBar from "../ScrollBar"
import PadDropZone from "./PadDropZone"
import ContextMenu from "../ContextMenu"
import { TableActions } from "./TableActions"
import { useOutlineStore } from "../../store/outlines"
import { pressed } from "../Shortcut/Shortcut"
import { guidGenerator } from "../../libs/utils"
import { OutlineButton } from "../../containers/Outline/OutlineButton"
import { WordCounter } from "../../containers/WordCounter"
import { encryptText } from "../../services/encryption"
// language
import { mermaid } from "../../extensions/CustomCodeBlock/language"
import { getCache, LOCKING_SCREEN_STATUS } from "../../libs/localCache"
import { CustomCodeBlock } from "../../extensions/CustomCodeBlock"
import { useSettingStore } from "../../store/settings"
import { UploadingImage } from "../../extensions/UploadingImage"
import { useAuth } from "../../hooks/useAuth"
import { ALL_USERS_CAN_EDIT, Rules } from "../../containers/PadActions/PadShareModal/types"

interface IPadEditorProp {
  id: string
  content: string
  data: IPad
}

const PlaceholderConfig = Placeholder.configure({
  placeholder: "Write something …",
})

let timer = 0

const HighlightConfigure = Highlight.configure({
  multicolor: true,
})

const TaskListConfigure = TaskList.configure({
  HTMLAttributes: {
    class: "task-list",
  },
})

const limit = 20000
const CharacterCountConfigure = CharacterCount.configure({
  limit,
})

const CustomTableCell = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes …
      ...this.parent?.(),

      // and add a new one …
      backgroundColor: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-background-color"),
        renderHTML: (attributes) => {
          return {
            "data-background-color": attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})

const Heading = Extension.create({
  addGlobalAttributes() {
    return [
      {
        // Extend the following extensions
        types: ["heading"],
        // … with those attributes
        attributes: {
          id: {
            renderHTML: () => ({
              id: guidGenerator(),
            }),
          },
        },
      },
    ]
  },
})

lowlight.registerLanguage("mermaid", mermaid)

const extensions = [
  StarterKit,
  Table.configure({
    resizable: true,
  }),
  TableRow,
  TableHeader,
  Heading,
  CustomTableCell,
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
  CustomCodeBlock.configure({
    // @ts-ignore
    lowlight,
  }),
  Youtube.configure({}),
  UploadingImage,
]

export default function PadEditor({ id, content, data }: IPadEditorProp) {
  const { documentZoom } = useSettingStore()
  const isLockingScreen = getCache(LOCKING_SCREEN_STATUS) || ""
  const [update, setUpdate] = useState(0)
  const { setOutlines } = useOutlineStore()
  const { user } = useAuth();
  const editor = useEditor({
    extensions: extensions,
    content: content,
    //     content: `<diagram-component graph="stateDiagram-v2
    //     [*] --> Still
    //     Still --> [*]

    //     Still --> Moving
    //     Moving --> Still
    //     Moving --> Crash
    //     Crash --> [*]
    // "></diagram-component>`,
    onUpdate: () => {
      setOutlines()
      setUpdate((prevUpdate) => prevUpdate + 1)
    },
  })

  useEffect(() => {
    if (editor) {
      if (timer) {
        clearTimeout(timer)
      }

      timer = setTimeout(() => {
        const html = editor.getHTML()
        const cipherContent = encryptText(html)

        updatePad({ id, content: html, cipherContent })
      }, 600) as unknown as number
    }

    // eslint-disable-next-line
  }, [update])

  useEffect(() => {
    if (editor) {
      editor.commands.clearContent()
      editor.commands.setContent(content)
      setTimeout(() => {
        editor.commands.focus()
        setOutlines()
      }, 200)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [content])

  useEffect(() => {
    if (editor) {
      setTimeout(() => {
        // make sure that editor is not focus automatically
        // when screen is locking
        // if it does, we can not active the unlocking form by keyboard event
        !isLockingScreen && editor.commands.focus()
      }, 250)
    }
    // eslint-disable-next-line
  }, [editor])

  return (
    <ErrorCapture>
      <div className="tiptap-container">
        <FixedControlBar editor={editor} />
        {editor ? <PadDropZone id={id} editor={editor} /> : null}
        <div className={`tiptap-box zoom-level-${documentZoom}`}>
          <ScrollBar height="calc(100vh - 64px - 20px)">
            <PadInfo />
            <ContextMenu
              condition={(ev) =>
                (ev.target as HTMLElement).closest("table") ? true : false
              }
            >
              <EditorContent
                editor={editor}
                className="tiptap-main-content"
                spellCheck={false}
                onKeyDown={(ev: React.KeyboardEvent<HTMLDivElement>) => {
                  if (!editor) {
                    return
                  }

                  const limitDisabledEdit =
                    data.shared &&
                    data.shared.editedUsers.length <= 0 &&
                    data.shared.accessLevel === Rules.Limit &&
                    data.uid !== user?.uid
                  const anyOneDisabledEdit =
                    data.shared &&
                    data.shared.editedUsers !== ALL_USERS_CAN_EDIT &&
                    data.shared.accessLevel === Rules.Anyone &&
                    data.uid !== user?.uid
                  if (limitDisabledEdit || anyOneDisabledEdit) {
                    ev.preventDefault()
                  }
                  shortCutAction(ev, pressed, editor)
                }}
              />
              <TableActions editor={editor} />
            </ContextMenu>
          </ScrollBar>
        </div>
        <ControlBar editor={editor} />
        <div className="character-count">
          <div className="bottom-bar">
            <OutlineButton />
            <div>{documentZoom > 1 ? documentZoom * 0.1 * 100 + 100 : 100}%</div>
            {editor && <WordCounter editor={editor} />}
          </div>
        </div>
      </div>
    </ErrorCapture>
  )
}

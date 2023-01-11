import { Menu, Transition } from "@headlessui/react";
import { Editor } from "@tiptap/react";
import ContextMenu from "../../ContextMenu";
import { AddColumnAfter } from "./AddColumnAfter";
import { AddColumnBefore } from "./AddColumnBefore";
import { AddRowAfter } from "./AddRowAfter";
import { AddRowBefore } from "./AddRowBefore";
import { DeleteColumn } from "./DeleteColumn";
import { DeleteRow } from "./DeleteRow";
import { DeleteTable } from "./DeleteTable";

export const TableActions = ({ editor }: { editor: Editor | null }) => {

  if (!editor) {
    return null;
  }

  return (
    <ContextMenu.Items>
      <Menu as="div" className="relative inline-block text-left z-10">
        <Transition show={true}
          enter="transition duration-100 ease-out"
          enterFrom="transform scale-95 opacity-0"
          enterTo="transform scale-100 opacity-100"
          leave="transition duration-75 ease-out"
          leaveFrom="transform scale-100 opacity-100"
          leaveTo="transform scale-95 opacity-0">
          <Menu.Items className="dropdown div-y absolute left-0 mt-2 w-56 origin-top-right ">
            <div className="py-1">
              <Menu.Item as="div">
                <AddColumnBefore editor={editor} />
              </Menu.Item>
              <Menu.Item as="div">
                <AddColumnAfter editor={editor} />
              </Menu.Item>
              <Menu.Item as="div">
                <AddRowAfter editor={editor} />
              </Menu.Item>
              <Menu.Item as="div">
                <AddRowBefore editor={editor} />
              </Menu.Item>
            </div>
            <div className="py-1">
              <Menu.Item as="div">
                <DeleteColumn editor={editor} />
              </Menu.Item>
              <Menu.Item as="div">
                <DeleteRow editor={editor} />
              </Menu.Item>
              <Menu.Item as="div">
                <DeleteTable editor={editor} />
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </ContextMenu.Items>
  )
}

import { Menu, Transition } from "@headlessui/react";
import { IPad } from "../../services/pads";
import { PadImportant } from "./PadImportant";
import { PadShare } from "./PadShare";
import { PadMove } from "./PadMove";
import { PadArchive } from "./PadArchive";
import { PadDuplicate } from "./PadDuplicate";
import { PadEdit } from "./PadEdit";
import PadDelete from "./PadDelete";

export default function PadActions({ data }: { data: IPad }) {
  return (
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
              <PadEdit />
            </Menu.Item>
            <Menu.Item as="div">
              <PadDuplicate data={data} />
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item as="div">
              <PadArchive />
            </Menu.Item>
            <Menu.Item as="div">
              <PadMove />
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item as="div">
              <PadShare id={data.id!}/>
            </Menu.Item>
            <Menu.Item>
              <PadImportant data={data} />
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item as="div">
              <PadDelete idx={data.id!} />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}


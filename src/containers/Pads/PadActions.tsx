import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
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
    <Menu as="div" className="relative inline-block text-left">
      <Menu.Button className="btn-dropdown justify-center rounded-md text-gray-500 px-4 py-2 text-sm font-medium">
        <HiOutlineDotsVertical
          className="-mr-1 ml-2 h-5 w-5"
          aria-hidden="true"
        />
      </Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="dropdown absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md shadow-lg focus:outline-none z-999">
          <div className="py-1">
            <Menu.Item>
              <PadEdit />
            </Menu.Item>
            <Menu.Item>
              <PadDuplicate />
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              <PadArchive />
            </Menu.Item>
            <Menu.Item>
              <PadMove />
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              <PadShare />
            </Menu.Item>
            <Menu.Item>
              <PadImportant data={data} />
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              <PadDelete idx={data.id!} />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

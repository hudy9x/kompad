/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ArchiveBoxIcon,
  ArrowRightCircleIcon,
  ChevronDownIcon,
  DocumentDuplicateIcon,
  HeartIcon,
  PencilSquareIcon,
  TrashIcon,
  UserPlusIcon,
} from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import { usePadStore } from "../../store";
import { delPad, importantPad, statusImporantPad } from "../../services/pads";
import { message } from "../../components/message";
import { decreasePlanRecord } from "../../services/plans";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PadListFeature({
  id,
  statusImportant,
}: {
  id: string;
  statusImportant: boolean;
}) {
  const [deleting, setDeleting] = useState(false);
  const navigate = useNavigate();
  const setNeedToUpdate = usePadStore((state) => state.setNeedToUpdate);

  const handleDeleteItem = async () => {
    if (deleting) {
      message.warning("The pad is in deleting process");
      return;
    }

    setDeleting(true);

    await delPad(id);
    await decreasePlanRecord();

    setNeedToUpdate();
    setDeleting(false);
    navigate("/app/pad/");
    message.success("Deleted pad successfully");
  };

  const handleImportantItem = async () => {
    await importantPad(id);
    const notifyImportant = await statusImporantPad(id);
    navigate("/app/pad/important");
    if (notifyImportant) {
      message.success("Important pad successfully");
    } else {
      message.error("Remove important");
    }
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className=" justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 ">
          <ChevronDownIcon className="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <PencilSquareIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span>Edit</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <DocumentDuplicateIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span>Duplicate</span>
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <ArchiveBoxIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span>Archive</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <ArrowRightCircleIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span>Move</span>
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                >
                  <UserPlusIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span>Share</span>
                </a>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                  onClick={handleImportantItem}
                >
                  <HeartIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                    style={statusImportant ? {color:"red"} : {color: "#4B5563"}}
                  />
                  <span>Add to favoirites</span>
                </a>
              )}
            </Menu.Item>
          </div>
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                // eslint-disable-next-line jsx-a11y/anchor-is-valid
                <a
                  href="#"
                  className={classNames(
                    active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "group flex items-center px-4 py-2 text-sm"
                  )}
                  onClick={handleDeleteItem}
                >
                  <TrashIcon
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span>Delete</span>
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

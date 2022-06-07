import { Fragment } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import {
  HiOutlineLightningBolt,
  HiOutlineUserCircle,
} from "react-icons/hi";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import DarkMode from "./DarkMode";
import { showShortcutModal } from "../../store/modal";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Settings() {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="bg-gray-100 dark:bg-gray-700 rounded-full flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
          <span className="sr-only">Open options</span>
          <IoSettingsOutline />
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
        <Menu.Items className="-right-3 absolute bottom-8 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <div
                  onClick={() => {
                    showShortcutModal();
                  }}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-300"
                      : "text-gray-700 dark:text-gray-300",
                    "group flex items-center px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  <HiOutlineLightningBolt
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                  Shortcut keys
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to="/setting/profile"
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-300"
                      : "text-gray-700 dark:text-gray-300",
                    "group flex items-center px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  <HiOutlineUserCircle
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                  User profile
                </Link>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <div
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-300"
                      : "text-gray-700 dark:text-gray-300",
                    "group flex items-center justify-between px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  <DarkMode />
                </div>
              )}
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <Link
                  to={"/signout"}
                  className={classNames(
                    active
                      ? "bg-gray-100 text-gray-900 dark:bg-gray-600 dark:text-gray-300"
                      : "text-gray-700 dark:text-gray-300",
                    "group flex items-center px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  <MdOutlinePowerSettingsNew
                    className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500 dark:group-hover:text-gray-300"
                    aria-hidden="true"
                  />
                  <span>Sign out</span>
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

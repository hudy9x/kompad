import { Fragment } from "react";
import { IoSettingsOutline } from "react-icons/io5";
import { BiCommentError } from "react-icons/bi";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { HiOutlineColorSwatch, HiOutlineLightningBolt, HiOutlineCog } from "react-icons/hi";
import { MdOutlinePowerSettingsNew } from "react-icons/md";
import { showShortcutModal } from "../../store/modal";
import { useThemeStore } from "../../store/themes";

export default function Settings() {
  const { setVisible: setThemeVisible } = useThemeStore()

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="rounded-full flex items-center">
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
        <Menu.Items className="dropdown -right-16 absolute bottom-8 mt-2 w-64 ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          <div className="py-1">
            <Menu.Item>
              <div
                onClick={() => showShortcutModal()}
                className="dropdown-content"
              >
                <HiOutlineLightningBolt
                  className="dropdown-icon"
                  aria-hidden="true"
                />
                <span className="dropdown-text">Shortcut keys</span>
              </div>
            </Menu.Item>
            <Menu.Item>
              <a
                rel="noreferrer"
                target={"_blank"}
                href={"https://github.com/hudy9x/kompad-homepage/issues"}
                className="dropdown-content"
              >
                <BiCommentError
                  className="dropdown-icon"
                  aria-hidden="true"
                />
                <span className="dropdown-text">Feedback</span>
              </a>
            </Menu.Item>
            <Menu.Item>
              <div
                onClick={() => {
                  setThemeVisible(true)
                }}
                className="dropdown-content" >
                <HiOutlineColorSwatch
                  className="dropdown-icon"
                  aria-hidden="true"
                />
                <div className="dropdown-text flex-grow flex items-center justify-between">
                  <span className="dropdown-text whitespace-nowrap">Theme color</span>
                  <div className="flex items-center gap-1">
                    <button className="kbd-btn kbd-sm">CTRL</button>
                    <button className="kbd-btn kbd-sm">T</button>
                  </div>
                </div>
              </div>
            </Menu.Item>
            <Menu.Item>
              <Link to="/setting/profile"
                className="dropdown-content">
                <HiOutlineCog
                  className="dropdown-icon"
                  aria-hidden="true"
                />
                <span className="dropdown-text">Settings</span>
              </Link>
            </Menu.Item>

            <Menu.Item>
              <Link to={"/signout"} className="dropdown-content">
                <MdOutlinePowerSettingsNew
                  className="dropdown-icon"
                  aria-hidden="true"
                />
                <span className="dropdown-text">Sign out</span>
              </Link>
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

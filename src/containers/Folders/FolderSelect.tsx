import { Unsubscribe } from "firebase/firestore";
import { useEffect } from "react";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { useAuth } from "../../hooks/useAuth";
import { useFolderStore } from "../../store/folder";
import { watchFolders } from "../../services/folders";
import { FaRegFolder } from "react-icons/fa";

interface IFolderSelectProps {
  onChange?: (id: string) => void;
}

function FolderSelect({ onChange }: IFolderSelectProps) {
  const { user } = useAuth();
  const { folders, updateFolders } = useFolderStore();

  useEffect(() => {
    let unsub: Unsubscribe | null;
    if (user) {
      unsub = watchFolders((err, data) => {
        if (err) {
          return;
        }
        updateFolders(data);
      });
    }

    return () => {
      unsub && unsub();
    };
    // eslint-disable-next-line
  }, [user]);

  const onSelect = (id: string) => {
    onChange && onChange(id);
  };

  return (
    <>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="bg-black rounded-full flex items-center text-gray-400 hover:text-gray-600 ">
            <span className="sr-only">Open options</span>
            <FaRegFolder className="h-5 w-5 p-1" aria-hidden="true" />
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
          <Menu.Items className="z-10 origin-top-right absolute left-0 mt-2 w-44 dropdown">
            <div className="py-1">
              {folders.map((folder) => {
                return (
                  <Menu.Item key={folder.id}>
                    {({ active }) => (
                      <div
                        onClick={() => onSelect(folder.id || "")}
                        className="dropdown-content"
                      >
                        <FaRegFolder className="dropdown-icon w-3.5" style={{ color: folder.color }} />
                        <span className="dropdown-text">{folder.title}</span>
                      </div>
                    )}
                  </Menu.Item>
                );
              })}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
}

export default FolderSelect;

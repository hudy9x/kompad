import { Unsubscribe } from "firebase/firestore";
import { useEffect } from "react";

import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { useAuth } from "../../hooks/useAuth";
import { watchTags } from "../../services/tags";
import { useTagStore } from "../../store/tags";
import { classNames } from "../../libs/utils";
import { IoPricetagsOutline } from "react-icons/io5";

interface ITagSelectProps {
  onChange?: (id: string) => void;
}

function TagSelect({ onChange }: ITagSelectProps) {
  const { user } = useAuth();
  const { tags, updateTags } = useTagStore();

  useEffect(() => {
    let unsub: Unsubscribe | null;
    if (user) {
      unsub = watchTags((err, data) => {
        if (err) {
          return;
        }

        updateTags(data);
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
          <Menu.Button className="bg-gray-100 dark:bg-gray-900 rounded-full flex items-center text-gray-400 hover:text-gray-600">
            <span className="sr-only">Open options</span>
            <IoPricetagsOutline className="h-5 w-5 p-1" aria-hidden="true" />
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
          <Menu.Items className="z-10 origin-top-right absolute left-0 mt-2 w-44 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              {tags.map((tag) => {
                return (
                  <Menu.Item key={tag.id}>
                    {({ active }) => (
                      <div
                        onClick={() => onSelect(tag.id || "")}
                        className={classNames(
                          "cursor-pointer text-gray-400 hover:text-gray-700 dark:hover:text-gray-400 block px-4 py-2 text-sm space-x-3 hover:bg-gray-50 dark:hover:bg-gray-800"
                        )}
                      >
                        <span
                          style={{ backgroundColor: tag.color }}
                          className={`w-2 h-2 rounded-full inline-block`}
                        ></span>
                        <span>{tag.title}</span>
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

export default TagSelect;

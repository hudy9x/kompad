import { Fragment, useEffect, useState } from "react";
import { HiOutlineCheck, HiOutlineSearch } from "react-icons/hi";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { useAuth } from "../../hooks/useAuth";
import { IPad, getPadsByUid } from "../../services/pads";
import { useNavigate } from "react-router-dom";
import { usePadStore } from "../../store";

export default function PadSearch() {
  const { user } = useAuth();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [pads, setPads] = useState<IPad[]>([]);

  const navigate = useNavigate();
  const searchModalStatus = usePadStore((state) => state.searchModalStatus);
  const setSearchModalStatus = usePadStore(
    (state) => state.setSearchModalStatus
  );

  const filteredPads =
    query === ""
      ? []
      : pads.filter((pad) => {
          return pad.title.toLowerCase().includes(query.toLowerCase());
        });

  useEffect(() => {
    setOpen(searchModalStatus);
  }, [searchModalStatus]);

  useEffect(() => {
    setSearchModalStatus(open);

    // eslint-disable-next-line
  }, [open]);

  useEffect(() => {
    if (user?.uid) {
      getPadsByUid(user.uid).then((pads) => {
        if (!pads) {
          return;
        }

        setPads(pads);
      });
    }
  }, [user?.uid]);

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-25 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 dark:divide-gray-900 overflow-hidden rounded-xl bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox
                onChange={(value) => {
                  const pad = value as unknown as IPad;
                  setOpen(false);
                  navigate(`/app/pad/${pad.id}`);
                }}
                value={``}
              >
                <div id="pad-search" className="relative">
                  <HiOutlineSearch
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 dark:text-gray-300 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredPads.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {filteredPads.map((pad) => (
                      <Combobox.Option key={pad.id} value={pad}>
                        {/* {person.name} */}
                        {({ active, selected }) => (
                          <div
                            className={`${
                              active
                                ? "bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-white"
                                : "bg-white text-black dark:bg-gray-800 dark:text-gray-300"
                            } px-4 py-2`}
                          >
                            {selected && <HiOutlineCheck />}
                            {pad.title}
                          </div>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredPads.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">No pad found.</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

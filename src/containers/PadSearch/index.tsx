import { Fragment, useState } from "react";
import { HiOutlineCheck, HiOutlineSearch } from "react-icons/hi";
import { Combobox, Dialog, Transition } from "@headlessui/react";

interface IPeo {
  id: number;
  name: string;
  url: string;
}

const people: IPeo[] = [
  { id: 1, name: "Leslie Alexander", url: "#" },
  { id: 2, name: "Kenton Towne", url: "#" },
  { id: 3, name: "Therese Wunsch", url: "#" },
  { id: 4, name: "Benedict Kessler", url: "#" },
  { id: 5, name: "Katelyn Rohan", url: "#" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function PadSearch() {
  const [query, setQuery] = useState("");

  const [open, setOpen] = useState(true);

  const filteredPeople =
    query === ""
      ? []
      : people.filter((person) => {
          return person.name.toLowerCase().includes(query.toLowerCase());
        });

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
            <Dialog.Panel className="mx-auto max-w-xl transform divide-y divide-gray-100 overflow-hidden rounded-xl bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox
                onChange={(value) => {
                  console.log(value);
                }}
                value={``}
              >
                <div className="relative">
                  <HiOutlineSearch
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 text-gray-800 placeholder-gray-400 focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {filteredPeople.length > 0 && (
                  <Combobox.Options
                    static
                    className="max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {filteredPeople.map((person) => (
                      <Combobox.Option key={person.id} value={person}>
                        {/* {person.name} */}
                        {({ active, selected }) => (
                          <li
                            className={`${
                              active
                                ? "bg-blue-500 text-white"
                                : "bg-white text-black"
                            }`}
                          >
                            {selected && <HiOutlineCheck />}
                            {person.name}
                          </li>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && filteredPeople.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">No people found.</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

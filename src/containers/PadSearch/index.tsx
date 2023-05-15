import { Fragment, useEffect, useState } from "react"
import { HiOutlineCheck, HiOutlineSearch } from "react-icons/hi"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import { useAuth } from "../../hooks/useAuth"
import { IPad } from "../../services/pads"
import { useNavigate } from "react-router-dom"
import { usePadStore } from "../../store"
import useMobileNavigator from "../../components/MobileNavigator/useMobileNavigator"
import { IPadFromSearch, searchByUser } from "../../libs/search"

let timeout = 0
export default function PadSearch() {
  const { user } = useAuth()
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState(false)
  const [pads, setPads] = useState<IPadFromSearch[]>([])

  const navigate = useNavigate()
  const { setSecondSidebarVisible } = useMobileNavigator()
  const searchModalStatus = usePadStore((state) => state.searchModalStatus)
  const setSearchModalStatus = usePadStore(
    (state) => state.setSearchModalStatus
  )

  useEffect(() => {
    if (user && user.uid) {
      timeout && clearTimeout(timeout)
      timeout = setTimeout(() => {
        searchByUser(query, user.uid).then((result) => {
          setPads(result)
        })
      }, 250) as unknown as number
    }
  }, [query, user])

  useEffect(() => {
    setOpen(searchModalStatus)
  }, [searchModalStatus])

  useEffect(() => {
    setSearchModalStatus(open)

    // eslint-disable-next-line
  }, [open])

  return (
    <Transition.Root
      show={open}
      as={Fragment}
      afterLeave={() => setQuery("")}
      appear
    >
      <Dialog as="div" className="relative z-40" onClose={setOpen}>
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
            <Dialog.Panel className="modal mx-auto max-w-xl div-y">
              <Combobox
                onChange={(value) => {
                  const pad = value as unknown as IPad
                  console.log("select", pad)
                  setOpen(false)
                  navigate(`/app/pad/${pad.id}`)
                  setSecondSidebarVisible()
                }}
                value={``}
              >
                <div id="pad-search" className="relative">
                  <HiOutlineSearch
                    className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent pl-11 pr-4 sm:text-sm"
                    placeholder="Search..."
                    onChange={(event) => setQuery(event.target.value)}
                  />
                </div>

                {pads.length > 0 && (
                  <Combobox.Options
                    static
                    className="bg max-h-72 scroll-py-2 overflow-y-auto py-2 text-sm text-gray-800"
                  >
                    {pads.map((pad) => (
                      <Combobox.Option key={pad.id} value={pad}>
                        {/* {person.name} */}
                        {({ active, selected }) => (
                          <div
                            className={`${
                              active
                                ? "bg-light text-color-base"
                                : "bg text-color-light"
                            } px-4 py-2 cursor-pointer`}
                          >
                            {selected && <HiOutlineCheck />}
                            {pad.title}
                          </div>
                        )}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                )}

                {query !== "" && pads.length === 0 && (
                  <p className="p-4 text-sm text-gray-500">No pad found.</p>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

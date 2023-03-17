/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

interface IModalProps {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  children: JSX.Element | JSX.Element[]
  padding?: string
}

export default function Modal({
  visible,
  children,
  setVisible,
  padding,
}: IModalProps) {
  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog as="div" className="main-modal relative z-40" onClose={setVisible}>
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

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div
            className={`flex items-center justify-center min-h-full p-4 text-center sm:p-0`}
          >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className={`modal ${
                  padding ? padding : "px-4 pt-5 pb-4 sm:my-8 sm:p-6"
                }`}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

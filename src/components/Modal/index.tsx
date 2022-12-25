/* This example requires Tailwind CSS v2.0+ */
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


interface IModalProps {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children: JSX.Element | JSX.Element[];
  padding?: string;
  type?: string;
}

export default function Modal({ visible, children, setVisible, padding, type }: IModalProps) {

  const bgrColor = () => {
    return type === "EDITOR" ? '' : 'bg-gray-500';
  }

  const alignItem = () => {
    return type === "EDITOR" ? 'sm:items-baseline' : 'sm:items-center';
  }

  return (
    <Transition.Root show={visible} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setVisible}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className={`${bgrColor()} fixed inset-0 bg-opacity-25 transition-opacity`} />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className={`${alignItem()} flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={`modal ${padding ? padding : 'px-4 pt-5 pb-4 sm:my-8 sm:p-6'}`}>
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

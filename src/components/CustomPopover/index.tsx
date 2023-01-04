import { Popover, Transition } from "@headlessui/react";
import { Fragment } from "react";

interface IPopoverProps {
  children: JSX.Element | JSX.Element[];
}

export const CustomPopover = ({ children }: IPopoverProps) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-200"
      enterFrom="opacity-0 translate-y-1"
      enterTo="opacity-100 translate-y-0"
      leave="transition ease-in duration-150"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-1"
    >
      <Popover.Panel className="absolute w-44 z-10 mt-3 px-4 sm:px-0 dropdown translate-y-9 right-0">
        {children}
      </Popover.Panel>
    </Transition>
  )
}

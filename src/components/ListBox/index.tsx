import { Listbox } from "@headlessui/react"
import { IoMdArrowDropdown } from "react-icons/io"
import { Rules } from "../../containers/PadActions/PadShareModal/types"

export interface IOption {
  name: Rules
  unavailable: boolean
}

interface IListBoxOptions {
  options: IOption[]
  data?: string
  selected?: string
  customContainer?: string
  customOptions?: string
  children?: JSX.Element | JSX.Element[],
  onSelected: (rule: Rules, data: string) => void
}

export const ListBoxOptions = ({
  options,
  data,
  selected,
  customContainer,
  customOptions,
  onSelected,
  children,
}: IListBoxOptions) => {
  return (
    <div className={customContainer ?? "relative"}>
      <Listbox>
        {children}
        <Listbox.Options
          className={`${customOptions} dropdown absolute w-36 rounded z-50 cursor-pointer mt-1`}
        >
          {options.map((option, index) => (
            <Listbox.Option
              key={index}
              value={selected}
              className="dropdown-content px-2 py-2 text-xs leading-6"
              onClick={() => onSelected(option.name, data!)}
            >
              <p className="dropdown-text">{option.name}</p>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

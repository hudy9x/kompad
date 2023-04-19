import { Listbox } from "@headlessui/react"
import { IconType } from "react-icons/lib"
import { Rules } from "../../containers/PadActions/PadShareModal/types"

export interface IOption {
  name: Rules
  unavailable: boolean
}

interface IListBoxOptions {
  options: IOption[]
  data?: string
  selected?: string
  customContainer: string
  customButton: string
  customOptions: string
  Icon?: IconType
  onSelected: (rule: Rules, data: string) => void
}

export const ListBoxOptions = ({
  options,
  data,
  selected,
  customContainer,
  customButton,
  customOptions,
  onSelected,
  Icon,
}: IListBoxOptions) => {
  return (
    <div className={customContainer}>
      <Listbox>
        <Listbox.Button className={customButton}>
          {selected ? selected : Icon && <Icon />}
        </Listbox.Button>
        <Listbox.Options className={customOptions}>
          {options.map((option, index) => (
            <Listbox.Option
              key={index}
              value={selected}
              className="option px-2 py-2 text-xs leading-6"
              onClick={() => onSelected(option.name, data!)}
            >
              {option.name}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  )
}

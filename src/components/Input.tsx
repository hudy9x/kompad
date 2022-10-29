import { BiSearch } from "react-icons/bi";

interface Props {
  name?: string;
  placeholder?: string;
}

export default function Input({ name, placeholder }: Props) {
  return <div className="relative rounded-md shadow-sm">
    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
      <BiSearch className="h-5 w-5" aria-hidden="true" />
    </div>
    <input
      type="text"
      name={name}

      className="block w-full rounded-md border-gray-300 pl-10 focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm"
      placeholder={placeholder}
    />
  </div>
}

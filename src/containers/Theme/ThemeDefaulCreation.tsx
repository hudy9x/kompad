import { HiOutlineColorSwatch } from "react-icons/hi";
import Button from "../../components/Button";
import { addTheme } from "../../services/themes";
import { defaultThemes } from "./defaultThemes";

export default function ThemeDefaultCreation({ updateHandler }: { updateHandler: () => void }) {
  const onImport = async () => {
    const promise: Promise<string | null>[] = []
    defaultThemes.forEach(theme => {
      promise.push(addTheme(theme))
    })

    Promise.allSettled(promise).then(res => {
      updateHandler()
    })
  }

  return <div className="mx-auto py-14 w-full text-center">

    <HiOutlineColorSwatch className="w-12 h-12 mx-auto" />
    <p className="text-sm py-4">No default themes found</p>
    <Button
      className="px-1.5 py-0.5 text-xs"
      onClick={onImport}
    >Import default theme</Button>
  </div>
}

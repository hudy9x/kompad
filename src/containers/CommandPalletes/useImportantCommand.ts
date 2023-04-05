import { useParams } from "react-router-dom"
import { setImportant } from "../../services/pads"
import { CommandFunc, ICommand } from "../../types"
import { isOptionNMatchedPreset } from "./util"

// duplicate command
export const useImportantCommand: CommandFunc = () => {
  const { id: currentPadId } = useParams()
  const extractOptions = (commands: ICommand[]) => {
    const options = {
      id: "",
    }

    const len = commands.length

    // commands.forEach((cmd) => {})
    let i = 0
    while (i < len) {
      const item = commands[i]

      if (isOptionNMatchedPreset(item, ["--id", "-I"])) {
        const nextItem = commands[++i]
        options.id = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      ++i
    }

    return options
  }

  const execute = async (commands: ICommand[]) => {
    const options = extractOptions(commands)
    const padId = options.id ? options.id : currentPadId

    if (!padId) {
      return
    }

    await setImportant(padId)
  }

  return { execute }
}

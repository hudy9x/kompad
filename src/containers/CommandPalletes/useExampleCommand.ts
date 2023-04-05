import { CommandFunc, ICommand } from "../../types"
import { isOptionNMatchedPreset } from "./util"

// duplicate command
export const useExampleCommand: CommandFunc = () => {
  const extractOptions = (commands: ICommand[]) => {
    const options = {
      edit: false,
      title: "Untitled",
    }

    const len = commands.length

    // commands.forEach((cmd) => {})
    let i = 0
    while (i < len) {
      const item = commands[i]

      if (isOptionNMatchedPreset(item, ["--title", "-t"])) {
        const nextItem = commands[++i]
        options.title = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      if (isOptionNMatchedPreset(item, ["--edit", "-e"])) {
        options.edit = true
      }

      ++i
    }

    return options
  }

  const execute = async (commands: ICommand[]) => {
    const options = extractOptions(commands)
    // put your code here
  }

  return { execute }
}

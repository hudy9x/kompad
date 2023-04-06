import { CommandFunc, ICommand, ICommandOptions } from "../../types"
import { isOptionNMatchedPreset } from "./util"

const commandOptions: ICommandOptions = {
  title: ["--title", "-t"],
  edit: ["--edit", "-e"],
}

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

      if (isOptionNMatchedPreset(item, commandOptions.title)) {
        const nextItem = commands[++i]
        options.title = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      if (isOptionNMatchedPreset(item, commandOptions.edit)) {
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

  const needSuggestValue = (command: ICommand) => {}

  return { execute, commandOptions }
}

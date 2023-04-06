import { useFolderStore } from "../../store/folder"
import { usePadListStore } from "../../store/pad"
import { useTagStore } from "../../store/tags"
import {
  CommandFunc,
  ECommandType,
  ICommand,
  ICommandOptions,
  ICommandSuggestItem,
} from "../../types"
import { isOptionNMatchedPreset } from "./util"

const commandOptions: ICommandOptions = {
  tag: ["--tag"],
  folder: ["--folder"],
  clear: ["--clear"],
  all: ["--all"],
  recent: ["--recent"],
  important: ["--important", "-i"],
}

export const useFilterCommand: CommandFunc = () => {
  const { tags } = useTagStore()
  const { folders } = useFolderStore()
  const {
    filterByTag,
    filterByFolder,
    filterByRecently,
    filterByImportant,
    clearFilter,
  } = usePadListStore()

  const extractOptions = (commands: ICommand[]) => {
    const options = {
      tag: "",
      folder: "",
      clear: false,
      all: false,
      recent: false,
      important: false,
    }

    const len = commands.length

    // commands.forEach((cmd) => {})
    let i = 0
    while (i < len) {
      const item = commands[i]

      if (isOptionNMatchedPreset(item, commandOptions.tag)) {
        const nextItem = commands[++i]
        options.tag = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      if (isOptionNMatchedPreset(item, commandOptions.folder)) {
        const nextItem = commands[++i]
        options.folder = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      console.log("commandOptions.clear", commandOptions.clear)
      if (isOptionNMatchedPreset(item, commandOptions.clear)) {
        options.clear = true
      }

      if (isOptionNMatchedPreset(item, commandOptions.all)) {
        options.all = true
      }

      if (isOptionNMatchedPreset(item, commandOptions.recent)) {
        options.recent = true
      }

      if (isOptionNMatchedPreset(item, commandOptions.important)) {
        options.important = true
      }

      ++i
    }

    return options
  }

  const execute = async (commands: ICommand[]) => {
    const options = extractOptions(commands)

    console.log("options", options)

    if (options.clear) {
      console.log("clear called")
      clearFilter()
      return
    }

    if (options.all) {
      clearFilter()
    }

    if (options.important) {
      filterByImportant()
    }

    if (options.recent) {
      filterByRecently()
    }

    // console.log(options, tags, folders)
    if (options.tag) {
      const selectedTag = tags.find(
        (t) => t.title.toLowerCase() === options.tag.toLowerCase()
      )

      selectedTag && selectedTag.id && filterByTag(selectedTag.id)
    }

    if (options.folder) {
      const selectedFolder = folders.find(
        (f) => f.title.toLowerCase() === options.folder.toLowerCase()
      )

      selectedFolder && selectedFolder.id && filterByFolder(selectedFolder.id)
    }
  }

  const hasSuggestValue = (command: ICommand) => {
    if (command.type !== ECommandType.OPTION) {
      return ""
    }

    if (commandOptions.tag.some((o) => o.includes(command.text))) {
      return "tag"
    }

    if (commandOptions.folder.some((o) => o.includes(command.text))) {
      return "folder"
    }

    return ""
  }

  const suggestOptionValue = (option: string, value: string) => {
    let suggestedOptionValue: ICommandSuggestItem[] = []

    if (option === "tag") {
      tags.forEach((t) => {
        if (t.title.toLowerCase().includes(value.toLowerCase())) {
          suggestedOptionValue.push({
            title: t.title,
            desc: "",
          })
        }
      })
    }

    option === "folder" &&
      folders.forEach((f) => {
        if (f.title.toLowerCase().includes(value.toLowerCase())) {
          suggestedOptionValue.push({
            title: f.title,
            desc: "",
          })
        }
      })

    return suggestedOptionValue
  }

  return { execute, commandOptions, hasSuggestValue, suggestOptionValue }
}

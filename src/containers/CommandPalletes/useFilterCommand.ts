import { useFolderStore } from "../../store/folder"
import { usePadListStore } from "../../store/pad"
import { useTagStore } from "../../store/tags"
import { CommandFunc, ICommand } from "../../types"
import { isOptionNMatchedPreset } from "./util"

export const useFilterCommand: CommandFunc = () => {
  const { tags } = useTagStore()
  const { folders } = useFolderStore()
  const {
    query,
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

      if (isOptionNMatchedPreset(item, ["--tag"])) {
        const nextItem = commands[++i]
        options.tag = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      if (isOptionNMatchedPreset(item, ["--folder"])) {
        const nextItem = commands[++i]
        options.folder = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      if (isOptionNMatchedPreset(item, ["--clear"])) {
        options.clear = true
      }

      if (isOptionNMatchedPreset(item, ["--all"])) {
        options.all = true
      }

      if (isOptionNMatchedPreset(item, ["--recent"])) {
        options.recent = true
      }

      if (isOptionNMatchedPreset(item, ["--important", "-i"])) {
        options.important = true
      }

      ++i
    }

    return options
  }

  const execute = async (commands: ICommand[]) => {
    const options = extractOptions(commands)

    if (options.clear) {
      filterByTag("")
      filterByFolder("")
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

  return { execute }
}

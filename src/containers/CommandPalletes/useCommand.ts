import { message } from "../../components/message"
import {
  CommandFunc,
  ICommand,
  ICommandOptions,
  ICommandSuggestItem,
} from "../../types"
import { useDeleteCommand } from "./useDeleteCommand"
import { useDocCommand } from "./useDocCommand"
import { useDupCommand } from "./useDupCommand"
import { useFilterCommand } from "./useFilterCommand"
import { useImportantCommand } from "./useImportantCommand"

// const commands = [
//   "doc",
//   "doc document",
//   'doc --title "Document 1"',
//   "doc -t hello2",
//   "doc --title hello --folder HR",
//   'doc --title doc1 --tag auth --folder "Video Scripts"',
//   'doc --edit "new document title"',
//   'del',
//   'del --yes'
//
//   "dup",
//   "important",
//
//   'filter --tag auth,aws-s3 --folder "Recruiment"',
//
//   "folder newFolder",
//   'folder "mobile app"',
//
//   "tag android",
//   "tag android,ios",
//   'tag "dall-e, công thức"',
// ]

interface ICommandList {
  [key: string]: {
    cmd: ReturnType<CommandFunc>
    desc: string
  }
}
export const useCommand = () => {
  const cmdDoc = useDocCommand()
  const cmdDup = useDupCommand()
  const cmdDel = useDeleteCommand()
  const cmdImportant = useImportantCommand()
  const cmdFilter = useFilterCommand()

  const commands: ICommandList = {
    doc: { cmd: cmdDoc, desc: "create or update a document" },
    dup: { cmd: cmdDup, desc: "make a copy of document" },
    del: { cmd: cmdDel, desc: "to delete a document" },
    important: {
      cmd: cmdImportant,
      desc: "toggle a document to important and vice versa",
    },
    filter: {
      cmd: cmdFilter,
      desc: "sort for documents by tags, folders, categories",
    },
  }

  const suggestOptions = (
    value: string,
    commandOptions: ICommandOptions
  ): ICommandSuggestItem[] => {
    const suggestedOptions: ICommandSuggestItem[] = []
    for (const key in commandOptions) {
      const { options, desc } = commandOptions[key]
      if (options.some((o) => o.includes(value))) {
        suggestedOptions.push({
          title: options[0],
          desc,
        })
      }
    }

    return suggestedOptions
  }

  const suggestKeyword = (
    cmds: ICommand[],
    value: string
  ): ICommandSuggestItem[] => {
    const len = cmds.length

    if (!len && value) {
      const commandKeywords = Object.keys(commands)
      const suggestedKeywords: ICommandSuggestItem[] = []
      commandKeywords.forEach((keyword) => {
        if (keyword.includes(value)) {
          suggestedKeywords.push({
            title: keyword,
            desc: commands[keyword].desc,
          })
        }
      })
      return suggestedKeywords
    }

    if (!len) return []

    const cmdKeyword = cmds[0].text
    if (!(cmdKeyword in commands)) return []

    const command = commands[cmdKeyword]
    const cmd = command.cmd
    const lastCmd = cmds[cmds.length - 1]

    const option = cmd.hasSuggestValue ? cmd.hasSuggestValue(lastCmd) : ""
    console.log("option", option)
    if (option && cmd.suggestOptionValue) {
      return cmd.suggestOptionValue(option, value)
    }

    return suggestOptions(value, cmd.commandOptions)
  }

  const executeCommand = (cmds: ICommand[]) => {
    console.log("execute command ! ------------------")
    const cmdKeyword = cmds[0].text
    if (cmdKeyword in commands) {
      const command = commands[cmdKeyword]
      command.cmd.execute(cmds.slice(1))

      // commands[cmdKeyword]
    } else {
      message.warning("Command not found !")
    }
  }

  return { executeCommand, suggestKeyword }
}

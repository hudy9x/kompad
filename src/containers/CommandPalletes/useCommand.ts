import { message } from "../../components/message"
import { CommandFunc, ICommand } from "../../types"
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
  [key: string]: ReturnType<CommandFunc>
}
export const useCommand = () => {
  const cmdDoc = useDocCommand()
  const cmdDup = useDupCommand()
  const cmdDel = useDeleteCommand()
  const cmdImportant = useImportantCommand()
  const cmdFilter = useFilterCommand()

  const commands: ICommandList = {
    doc: cmdDoc,
    dup: cmdDup,
    del: cmdDel,
    important: cmdImportant,
    filter: cmdFilter
  }

  const executeCommand = (cmds: ICommand[]) => {
    console.log("execute command ! ------------------")
    const cmdKeyword = cmds[0].text
    if (cmdKeyword in commands) {
      console.log("command:", cmdKeyword)

      commands[cmdKeyword].execute(cmds.slice(1))

      // commands[cmdKeyword]
    } else {
      message.warning("Command not found !")
    }
  }
  return { executeCommand }
}

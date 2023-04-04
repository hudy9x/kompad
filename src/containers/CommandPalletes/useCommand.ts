import { CommandFunc, ICommand } from "../../types"
import { useDocCommand } from "./useDocCommand"

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
  const commands: ICommandList = {
    doc: cmdDoc,
  }

  const executeCommand = (cmds: ICommand[]) => {
    console.log("execute command ! ------------------")
    const cmdKeyword = cmds[0].text
    if (cmdKeyword in commands) {
      console.log("command:", cmdKeyword)
      
      commands[cmdKeyword].execute(cmds.slice(1))

      // commands[cmdKeyword]
    }
  }
  return { executeCommand }
}

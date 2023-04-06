import { useNavigate, useParams } from "react-router-dom"
import { confirmDanger } from "../../components/Confirm"
import { message } from "../../components/message"
import { deleteAllImageInOnePad } from "../../services/files"
import { delPad } from "../../services/pads"
import { decreasePlanRecord } from "../../services/plans"
import { usePadStore } from "../../store"
import { CommandFunc, ICommand, ICommandOptions } from "../../types"
import { isOptionNMatchedPreset } from "./util"

const commandOptions: ICommandOptions = {
  yes: { options: ["--yes", "-y"], desc: "delete document without confirmation" },
  id: { options: ["--id", "-I"], desc: "document's id" },
}

// duplicate command
export const useDeleteCommand: CommandFunc = () => {
  const navigate = useNavigate()
  const setNeedToUpdate = usePadStore((state) => state.setNeedToUpdate)
  const { id: currentPadId } = useParams()
  const extractOptions = (commands: ICommand[]) => {
    const options = {
      id: "",
      yes: false,
    }

    const len = commands.length

    // commands.forEach((cmd) => {})
    let i = 0
    while (i < len) {
      const item = commands[i]

      if (isOptionNMatchedPreset(item, commandOptions.yes.options)) {
        options.yes = true
      }

      if (isOptionNMatchedPreset(item, commandOptions.id.options)) {
        const nextItem = commands[++i]
        options.id = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      ++i
    }

    return options
  }

  const deletePad = async (idx: string) => {
    await Promise.all([delPad(idx), deleteAllImageInOnePad(idx)])
    // await Promise.all([deleteAllImageInOnePad(idx)]);
    await decreasePlanRecord()

    setNeedToUpdate()
    navigate("/app/pad/")
    message.success("Deleted pad successfully")
  }

  const execute = async (commands: ICommand[]) => {
    const options = extractOptions(commands)
    const padId = options.id ? options.id : currentPadId

    if (!padId) return

    // delete without confirmation
    if (options.yes) {
      deletePad(padId)
      return
    }

    confirmDanger({
      title: "Delete this note",
      desc: "Are you sure to delete this note ? All of your content will be delete permanently removed from our servers. This action cannot be undone.",
      yes: () => {
        deletePad(padId)
      },
    })
  }

  return { execute, commandOptions }
}

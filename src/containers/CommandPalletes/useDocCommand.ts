import { useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { addPad, updatePadMetadata } from "../../services/pads"
import { IPlan, isPlanExceed, updatePlanByUid } from "../../services/plans"
import { usePadStore } from "../../store"
import {
  CommandFunc,
  ECommandType,
  ICommand,
  ICommandOptions,
} from "../../types"
import { isOptionNMatchedPreset } from "./util"

const commandOptions: ICommandOptions = {
  title: { options: ["--title", "-t"], desc: "the title of document" },
  desc: { options: ["--desc", "-d"], desc: "give document some description" },
  edit: { options: ["--edit", "-e"], desc: "switch to edit mode" },
}

export const useDocCommand: CommandFunc = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const increaseNewPaddAdded = usePadStore((state) => state.setNeedToUpdate)
  const { id: currentPadId } = useParams()

  const extractOptions = (commands: ICommand[]) => {
    const options = {
      edit: false,
      title: "Untitled",
      desc: "",
    }

    const len = commands.length

    if (len === 1 && commands[0].type === ECommandType.CONTENT) {
      options.title = commands[0].text
    }

    // commands.forEach((cmd) => {})
    let i = 0
    while (i < len) {
      const item = commands[i]

      if (isOptionNMatchedPreset(item, commandOptions.title.options)) {
        const nextItem = commands[++i]
        options.title = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      if (isOptionNMatchedPreset(item, commandOptions.desc.options)) {
        const nextItem = commands[++i]
        options.desc = nextItem.text
        // ignore the next item and jump to next option
        continue
      }

      if (isOptionNMatchedPreset(item, commandOptions.edit.options)) {
        options.edit = true
      }

      ++i
    }

    return options
  }

  const updatePad = (title: string) => {
    if (!currentPadId) {
      console.log("padId is not exist, the command doesn't work")
      return
    }

    updatePadMetadata({
      id: currentPadId,
      title: title,
    })
  }

  const execute = async (commands: ICommand[]) => {
    console.log("running")
    if (!user) return

    const options = extractOptions(commands)

    if (options.edit) {
      updatePad(options.title)
      return
    }

    console.log("calling addPad", options)
    const planData = (await isPlanExceed()) as IPlan
    const id = await addPad({
      uid: user.uid,
      title: options.title,
      shortDesc: options.desc,
    })

    console.log("update plan by user and redirecting to pad")

    updatePlanByUid({ currentRecord: planData.currentRecord + 1 })
    navigate(`/app/pad/${id}`)
    increaseNewPaddAdded()

    console.log("end -------------")
  }

  return {
    execute,
    commandOptions: commandOptions,
  }
}

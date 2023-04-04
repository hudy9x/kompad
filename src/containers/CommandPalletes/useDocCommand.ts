import { useNavigate } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { addPad } from "../../services/pads"
import { IPlan, isPlanExceed, updatePlanByUid } from "../../services/plans"
import { usePadStore } from "../../store"
import { CommandFunc, ICommand } from "../../types"



export const useDocCommand: CommandFunc = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const increaseNewPaddAdded = usePadStore((state) => state.setNeedToUpdate)

  const execute = async (commands: ICommand[]) => {
    console.log('running')
    if (!user) return

    console.log('calling addPad')
    const planData = (await isPlanExceed()) as IPlan
    const id = await addPad({
      uid: user.uid,
      title: "Untitled",
      shortDesc: "descriptiont",
    })

    console.log('update plan by user and redirecting to pad')

    updatePlanByUid({ currentRecord: planData.currentRecord + 1 })
    navigate(`/app/pad/${id}`)
    increaseNewPaddAdded()

    console.log('end -------------')

  
  }

  return {
    execute,
  }
}

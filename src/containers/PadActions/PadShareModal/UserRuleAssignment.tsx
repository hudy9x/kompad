import { AiTwotoneLock } from "react-icons/ai"
import { IoEarth } from "react-icons/io5"
import { ListBoxOptions } from "../../../components/ListBox"
import { ProviderProps, Rules, accessLevelOption, permissionLevelOption } from "./types"
import { useContext } from "react"
import { Context } from "./context"
import { message } from "../../../components/message"
import { getPadById } from "../../../services/pads"
import { usePadStore } from "../../../store"

export const UserRuleAssignment = () => {
  const {
    permissionLevel,
    accessLevel,
    setAccessLevel,
    setPermissionLevel,
    setSharedUsers,
  } = useContext(Context) as ProviderProps
  const { idShared } = usePadStore()

  const handlePermissionLevel = async (rule: Rules, email: string) => {
    setPermissionLevel(rule)
    message.success("Access privileges have been modified")
  }

  const handleAccessLevel = async (rule: Rules) => {
    if (rule === Rules.Anyone) {
      setSharedUsers([])
      setAccessLevel(rule)
    } else {
      const pad = await getPadById(idShared!)
      if(!pad) return
      
      pad.shared.sharedUsers
        ? setSharedUsers([...pad.shared.sharedUsers])
        : setSharedUsers([])
      setAccessLevel(rule)
    }
    message.success("Access privileges have been modified")
  }

  return (
    <div className="pb-10">
      <p className="leading-6 pb-3">General Access</p>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div
            className={`w-9 h-9 rounded-full flex justify-center flex-col items-center back ${
              accessLevel === Rules.Anyone ? "bg-green-200" : "bg-slate-200"
            }`}
          >
            {accessLevel === Rules.Anyone ? (
              <IoEarth className="text-slate-950" />
            ) : (
              <AiTwotoneLock className="text-slate-950" />
            )}
          </div>
          <div className="pl-3">
            <div className="flex items-center">
              <p className="text-sm leading-6">{accessLevel}</p>
              <ListBoxOptions
                options={accessLevelOption}
                customContainer="container-accessLevel"
                customButton="btn-accessLevel"
                onSelected={handleAccessLevel}
              />
            </div>
            <p className="text-xs leading-6">
              {accessLevel === Rules.Anyone
                ? "Anyone with an Internet connection and this link can view it"
                : "Only those who have access can open using this link"}
            </p>
          </div>
        </div>
        {accessLevel === Rules.Anyone && (
          <ListBoxOptions
            options={permissionLevelOption}
            selected={permissionLevel}
            onSelected={handlePermissionLevel}
            customOptions="container-permissionLevel"
          />
        )}
      </div>
    </div>
  )
}

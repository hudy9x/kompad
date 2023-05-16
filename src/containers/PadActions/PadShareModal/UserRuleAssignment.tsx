import { AiTwotoneLock } from "react-icons/ai"
import { IoEarth } from "react-icons/io5"
import { IoMdArrowDropdown } from "react-icons/io"
import { ListBoxOptions } from "../../../components/ListBox"
import { ProviderProps, Rules, accessLevelOption, permissionLevelOption } from "./types"
import { useContext } from "react"
import { Context } from "./context"
import { message } from "../../../components/message"

export const UserRuleAssignment = () => {
  const {
    permissionLevel,
    setAccessLevel,
    setPermissionLevel,
    accessLevel,
  } = useContext(Context) as ProviderProps

  const handlePermissionLevel = async (rule: Rules, email: string) => {
    setPermissionLevel(rule)
    message.success("Access privileges have been modified")
  }

  const handleAccessLevel = (rule: Rules) => {
    setAccessLevel(rule)
    message.success("Access privileges have been modified")
  }

  return (
    <div className="pb-10">
      <p className="text-lg leading-6 pb-4">General Access</p>
      <div className="flex justify-between">
        <div className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex justify-center flex-col items-center back ${
              accessLevel === Rules.Anyone ? "bg-green-200" : "bg-slate-200"
            }`}
          >
            {accessLevel === Rules.Anyone ? (
              <IoEarth className="text-slate-950" />
            ) : (
              <AiTwotoneLock className="text-slate-950" />
            )}
          </div>
          <div className="ml-2">
            <div className="flex items-center">
              <p className="text-sm leading-6">{accessLevel}</p>
              <ListBoxOptions
                options={accessLevelOption}
                Icon={IoMdArrowDropdown}
                customContainer="pl-2"
                customButton="btn-rule rounded-sm"
                customOptions="bg-light absolute w-36 rounded z-50 cursor-pointer"
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
            customContainer="relative"
            customButton="btn btn-sm"
            customOptions="bg-light absolute right-0 w-36 rounded z-50 cursor-pointer"
            onSelected={handlePermissionLevel}
          />
        )}
      </div>
    </div>
  )
}

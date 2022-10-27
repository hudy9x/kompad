import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getThemeConfigFromStorage, updateThemeConfigFromUserSetting } from "../../services/user-settings"

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function ThemeSetting({ children }: Props) {
  const { user } = useAuth()

  useEffect(() => {
    if (user?.uid) {
      updateThemeConfigFromUserSetting()
    }
  }, [user])
  
  return <div id="theme-setting" className="flex transition">
    { children }
  </div>
}

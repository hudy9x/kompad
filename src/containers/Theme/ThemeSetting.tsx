import { CSSProperties, useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getThemeConfigFromStorage } from "../../services/user-settings"
import { useThemeStore } from "../../store/themes"

interface Props {
  children: JSX.Element | JSX.Element[]
}

interface cssVars {
  [key: string]: string
}

export default function ThemeSetting({ children }: Props) {
  const { user } = useAuth()
  const { config } = useThemeStore()
  const [cssVars, setCssVars] = useState<CSSProperties>({})
  const getThemeConfig = async () => {
    const themeConfig = await getThemeConfigFromStorage()
    const cssVars: cssVars = {}

    for (const cssVar in themeConfig) {
      const cssValue = themeConfig[cssVar];
      cssVars[`${cssVar}`] = cssValue;
    }

    setCssVars(cssVars as CSSProperties)
  }

  useEffect(() => {
    if (user?.uid) {
      getThemeConfig()
    }
  }, [user, config])

  return <div id="theme-setting" className="flex" style={cssVars}>
    {children}
  </div>
}

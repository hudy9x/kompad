import { colord } from "colord"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { getUserSetting } from "../../services/user-settings"
import { ICSSVariable } from "../../types"
import ThemeUpdateForm from "./ThemeUpdateForm"

interface IThemeCustomState {
  variables: ICSSVariable[]
  name: string
}

export default function ThemeCustom() {
  const [searchParams] = useSearchParams()
  const [theme, settheme] = useState<IThemeCustomState>({
    variables: [],
    name: "",
  })
  const themeId = searchParams.get("theme-id")
  const { user } = useAuth()

  const getCurrentCssVariable = () => {
    const cssVarElem = document.querySelector(
      "#css-variable"
    ) as HTMLStyleElement
    const cssVarText =
      cssVarElem && cssVarElem.textContent
        ? cssVarElem.textContent.replace(/(:root\s+{)|}/g, "")
        : ""

    const cssVarList = cssVarText.split(";").map((item) => {
      const splitted = item.split(":")
      return {
        name: splitted[0].trim(),
        value: colord(splitted[1]).toHex(),
      }
    })

    settheme({
      variables: cssVarList,
      name: "",
    })
  }

  const getCssVariableByThemeId = async (themeId: string) => {
    getUserSetting().then((settings) => {
      if (!settings.themes) return

      const themeSetting = settings.themes.find((theme) => theme.id === themeId)
      if (!themeSetting) return

      const cssVarObj = JSON.parse(themeSetting.config)

      const variables: ICSSVariable[] = []
      for (const key in cssVarObj) {
        variables.push({
          name: key,
          value: cssVarObj[key],
        })
      }

      settheme({
        variables,
        name: themeSetting.name,
      })
    })
  }

  useEffect(() => {
    if (user) {
      if (themeId) {
        getCssVariableByThemeId(themeId)
      } else {
        getCurrentCssVariable()
      }
    }
  }, [themeId, user])

  if (!theme.variables) return <div>Loading ...</div>

  return (
    <ThemeUpdateForm
      cssVariables={theme.variables}
      themeTitle={theme.name}
      themeId={themeId || ""}
    />
  )
}

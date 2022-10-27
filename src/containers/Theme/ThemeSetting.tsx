import { useEffect, useState } from "react"
import { useAuth } from "../../hooks/useAuth"
import { getThemeConfigFromStorage, updateThemeConfigFromUserSetting } from "../../services/user-settings"

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function ThemeSetting({ children }: Props) {
  const { user } = useAuth()

  // const getThemeConfig = async () => {
  //   // updateThemeConfigFromUserSetting()
  //
  //   // const themeConfig = await getThemeConfigFromUserSetting()
  //
  //   // const cssVarArr: string[] = []
  //   // for (const cssVar in themeConfig) {
  //   //   const cssValue = themeConfig[cssVar];
  //   //   cssVarArr.push(`${cssVar}:${cssValue}`)
  //   // }
  //   //
  //   // setCssVars(cssVarArr.join(";"))
  // }

  useEffect(() => {
    // if (user?.uid) {
    //   updateThemeConfigFromUserSetting()
    // }
  }, [user])

  // useEffect(() => {
  //   const themeSettingElem = document.querySelector('.theme-setting-variables');
  //   if (themeSettingElem) {
  //     themeSettingElem.textContent = `:root { ${cssVars} }`;
  //   }
  // }, [cssVars])

  return <div id="theme-setting" className="flex transition">
    { children }
  </div>
}

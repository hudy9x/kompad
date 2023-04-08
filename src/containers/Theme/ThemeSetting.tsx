import { listen } from "@tauri-apps/api/event"
import { WebviewWindow } from "@tauri-apps/api/window"
import { useEffect } from "react"
import { useAuth } from "../../hooks/useAuth"
import {
  getUserSetting,
  updateThemeConfigFromUserSetting,
} from "../../services/user-settings"
import { useSettingStore } from "../../store/settings"
import { useThemeStore } from "../../store/themes"

interface Props {
  children: JSX.Element | JSX.Element[]
}

export default function ThemeSetting({ children }: Props) {
  const { user } = useAuth()
  const { setThemeList } = useThemeStore()
  const { themeCustomModal, toggleThemeCustomModal, themeCustomId } =
    useSettingStore()

  const updateUserThemeList = () => {
    console.log("updating theme list")
    getUserSetting().then((setting) => {
      console.log(setting)
      if (!setting || !setting.themes) return
      console.log("update theme")
      setThemeList(setting.themes)
    })
  }

  useEffect(() => {
    if (user?.uid) {
      updateThemeConfigFromUserSetting()
    }
  }, [user])

  useEffect(() => {
    listen("theme-preview", ({ payload }) => {
      const data = payload as { cssVar: string }
      if (!data || !data.cssVar) return

      const themeSettingElem = document.querySelector(
        "#css-variable"
      ) as HTMLStyleElement

      themeSettingElem.textContent = data.cssVar
    })
  }, [])

  useEffect(() => {
    let webview: WebviewWindow
    if (themeCustomModal) {
      webview = new WebviewWindow("theUniqueLabel", {
        url: `/theme-customization?theme-id=${themeCustomId}`,
        title: "Theme Customization Modal",
        center: true,
        minWidth: 500,
        width: 500,
        minHeight: 700,
        focus: true,
        theme: "dark",
      })

      // window closed
      webview.once("tauri://destroyed", function () {
        themeCustomModal && toggleThemeCustomModal()
      })

      listen("theme-update", () => {
        updateThemeConfigFromUserSetting()
        // reset theme list when a new theme created
        !themeCustomId && updateUserThemeList()
        webview.close()
      })
    }

    // eslint-disable-next-line
  }, [themeCustomModal, toggleThemeCustomModal, themeCustomId])

  return (
    <div id="theme-setting" className="flex transition">
      {children}
    </div>
  )
}

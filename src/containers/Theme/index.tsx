import { useEffect, useState } from "react"

import { getThemes, ITheme } from "../../services/themes"
import ScrollBar from "../../components/ScrollBar"
import { HiOutlineCloudDownload } from "react-icons/hi"
// import { IoMdStar } from 'react-icons/io'
import Button from "../../components/Button"
import { BiSearch } from "react-icons/bi"
import {
  getUserSetting,
  installTheme,
  uninstallTheme,
} from "../../services/user-settings"
import { useSettingStore } from "../../store/settings"
import ThemeDefaultCreation from "./ThemeDefaulCreation"
import { isDesktopApp } from "../../libs/utils"
import { message } from "../../components/message"

interface IInstalledTheme {
  [key: string]: number
}

export default function ThemeListing() {
  const [themes, setThemes] = useState<ITheme[]>([])
  const [installed, setInstalled] = useState<IInstalledTheme>({})
  const [searchKey, setSearchKey] = useState("")
  const [updateCounter, setUpdateCounter] = useState(0)
  const { themeCustomModal, toggleThemeCustomModal } = useSettingStore()

  const onInstall = (theme: ITheme) => {
    installTheme(theme).then(() => setUpdateCounter(updateCounter + 1))
  }

  const onUninstall = (id: string) => {
    uninstallTheme(id).then(() => setUpdateCounter(updateCounter + 1))
  }

  const onSearch = (value: string) => {
    setSearchKey(value)
  }

  const onCreate = () => {
    if (themeCustomModal) {
      return
    }

    if (!isDesktopApp()) {
      message.warning('Only support Desktop App')
      return
    }

    toggleThemeCustomModal()
  }

  const updateThemeList = () => {
    getThemes().then((themes) => {
      setThemes(themes)
    })
  }

  useEffect(() => {
    getUserSetting().then((setting) => {
      if (!setting || !setting.themes) return

      const installedThemes: IInstalledTheme = {}
      setting.themes.forEach((theme) => {
        installedThemes[theme.themeId] = 1
      })

      setInstalled(installedThemes)
    })
  }, [updateCounter])

  useEffect(() => {
    getThemes().then((themes) => {
      setThemes(themes)
    })
  }, [])

  return (
    <div className="rounded-md border border-color-base shadow-sm advanced-setting-card no-space p-0 ">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
          <BiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          onChange={(ev) => onSearch(ev.target.value)}
          type="text"
          className="theme-listing-search rounded-t-md block w-full border-none py-4 pl-14 sm:text-sm shadow-sm"
          placeholder={"Find you theme"}
        />
        {themeCustomModal ? null : (
          <Button
            className="absolute top-3 right-5 px-1.5 py-0.5 text-xs"
            onClick={onCreate}
          >
            Create
          </Button>
        )}
      </div>

      <div className="" style={{ minHeight: 100 }}>
        {!themes.length ?
          <ThemeDefaultCreation updateHandler={updateThemeList} />
          : null
        }
        <ScrollBar height="600px">
          {themes.map((theme) => {
            if (
              searchKey &&
              !theme.name.toLowerCase().includes(searchKey.toLowerCase().trim())
            ) {
              return <></>
            }

            const installAlready =
              theme.id && theme.id in installed ? true : false

            return (
              <div
                className="theme-item px-5 py-5 flex items-start gap-5"
                key={theme.id}
              >
                <img
                  src={theme.icon}
                  alt=""
                  style={{ width: 150 }}
                  className="rounded-lg shadow-sm bg-black"
                />
                <div className="theme-content space-y-0.5 -mt-1 w-full">
                  <div className="theme-header flex items-center justify-between">
                    <h2 className="text-base font-semibold">{theme.name}</h2>
                    <div className="theme-counter flex items-center justify-between gap-2">
                      <span className="flex gap-1 items-center">
                        <HiOutlineCloudDownload className="text-gray-500" />{" "}
                        <small>{theme.downloadCounter}</small>
                      </span>
                      {/*<span className="flex gap-1 items-center"><IoMdStar className="text-yellow-600" /> <small>{theme.rating}</small></span>*/}
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 truncate">{theme.desc}</p>
                  <div className="flex items-center justify-between gap-1.5">
                    <span className="text-xs text-color-dark">
                      @{theme.author}
                    </span>
                    {installAlready ? (
                      <Button
                        secondary
                        onClick={() => theme.id && onUninstall(theme.id)}
                        className="px-1.5 py-0.5 text-xs"
                      >
                        Uninstall
                      </Button>
                    ) : (
                      <Button
                        onClick={() => onInstall(theme)}
                        className="px-1.5 py-0.5 text-xs"
                      >
                        Install
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </ScrollBar>
      </div>
    </div>
  )
}

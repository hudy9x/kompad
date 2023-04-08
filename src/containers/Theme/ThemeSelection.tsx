import { useEffect, useState } from "react"
import { useThemeStore } from "../../store/themes"
import Modal from "../../components/Modal"
import ScrollBar from "../../components/ScrollBar"
import { HiCheckCircle, HiOutlineMinusCircle } from "react-icons/hi"
import { BiSearch } from "react-icons/bi"
import {
  getThemeSettingElem,
  getUserSetting,
  selectTheme,
  setThemeConfigToStorage,
  uninstallTheme,
} from "../../services/user-settings"
import { useAuth } from "../../hooks/useAuth"
import { Link } from "react-router-dom"
import { useSettingStore } from "../../store/settings"
import { confirmDanger } from "../../components/Confirm"
import { TbPencil } from "react-icons/tb"
import { RiCloseFill } from "react-icons/ri"

let currentTheme = ""
let markAsThemeSelected = false
export default function ThemeUser() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const { toggleThemeCustomModal, themeCustomModal } = useSettingStore()
  const {
    visible,
    selectedTheme,
    list: themes,
    setVisible,
    setSelected,
    setThemeList,
  } = useThemeStore()
  const [searchKey, setSearchKey] = useState("")
  const [preview, setPreview] = useState(selectedTheme)
  const [updateCounter, setUpdateCounter] = useState(0)

  const setThemeSetting = (config: string) => {
    const themeSettingElem = getThemeSettingElem()
    if (!themeSettingElem) return

    try {
      const cssVars = JSON.parse(config)
      const css = []
      for (let variable in cssVars) {
        css.push(`${variable}: ${cssVars[variable]}`)
      }

      themeSettingElem.textContent = `:root { ${css.join(";")} }`
    } catch (error) {
      console.log("setThemeSetting Error", error)
    }
  }

  const onSelect = (id: string, config: string) => {
    markAsThemeSelected = true
    setOpen(false)
    setSearchKey("")
    setThemeConfigToStorage(config)
    setThemeSetting(config)
    selectTheme(id).then(() => {
      setSelected(id, config)
    })
  }

  const onSearch = (value: string) => {
    setSearchKey(value)
  }

  const cachingCurrentTheme = () => {
    const themeSettingElem = getThemeSettingElem()
    if (!themeSettingElem) {
      return
    }
    currentTheme = themeSettingElem.textContent || ""
  }

  // if user not select new theme, rollback to default theme
  const rollbackToDefaultTheme = () => {
    // make sure that the current theme is not empty
    if (!currentTheme) return

    if (markAsThemeSelected) {
      markAsThemeSelected = false
      currentTheme = ""
      return
    }

    const themeSettingElem = getThemeSettingElem()
    if (!themeSettingElem) {
      return
    }
    themeSettingElem.textContent = currentTheme
    currentTheme = ""
  }

  const onEditTheme = (id: string) => {
    toggleThemeCustomModal(id)
  }

  const onDelTheme = (id: string) => {
    confirmDanger({
      title: "Delete theme",
      desc: "Are you sure to delete this theme ? Howerver you're still re-install it by visiting [Setting] > [Theme]",
      yes: () => {
        uninstallTheme(id).then(() => {
          setUpdateCounter(updateCounter + 1)
        })
      },
    })
  }

  const updateThemeList = () => {
    getUserSetting().then((setting) => {
      if (!setting || !setting.themes) return
      setThemeList(setting.themes)
    })
  }

  useEffect(() => {
    // 3. Active selected theme at the first time
    setPreview(selectedTheme)
  }, [selectedTheme])

  useEffect(() => {
    // 1. Theme modal opened, cache the current theme setting first
    visible && cachingCurrentTheme()
    !visible && rollbackToDefaultTheme()
    setOpen(visible)
  }, [visible])

  useEffect(() => {
    // 5. Also set visible status in store to false when modal closes
    setVisible(open)
    // eslint-disable-next-line
  }, [open])

  useEffect(() => {
    // 2. Get user's setting that contains all installed themes and save it to store
    updateThemeList()
    // eslint-disable-next-line
  }, [user?.uid])

  useEffect(() => {
    updateCounter > 0 && updateThemeList()
    // eslint-disable-next-line
  }, [updateCounter])

  useEffect(() => {
    // 4. Register events that enable user to press
    // Up/Down key to preview theme and Enter key to select
    const onKeyPress = (ev: KeyboardEvent) => {
      ev.preventDefault()
      ev.stopPropagation()

      if (!visible) return

      const key = ev.key
      const len = themes.length

      if (key === "Enter") {
        const found = themes.find((t) => t.id === preview)
        found && onSelect(preview, found.config || "")
        return
      }

      let nextPreview = ""

      if (!["ArrowUp", "ArrowDown"].includes(key)) {
        return
      }

      for (let i = 0; i < len; i++) {
        const t = themes[i]
        if (t.id !== preview) {
          continue
        }

        const dir = key === "ArrowUp" ? -1 : 1
        const nTheme = themes[i + dir]

        if (!nTheme) {
          break
        }

        nextPreview = nTheme.id || ""

        // preview theme when pressing up/down key - it'll be rollbacked after closing the theme selection modal
        setThemeSetting(nTheme.config)
        break
      }

      nextPreview && setPreview(nextPreview)
    }

    document.addEventListener("keyup", onKeyPress)

    return () => {
      document.removeEventListener("keyup", onKeyPress)
    }

    // eslint-disable-next-line
  }, [themes, preview, visible])

  useEffect(() => {
    return () => {
      // clear search term when modal close
      open === false && setSearchKey("")
    }
  }, [open])

  useEffect(() => {
    setTimeout(() => {
      if (!visible) return
      const input = document.getElementById("theme-finder")
      input && input.focus()
    }, 100)
  }, [visible])

  return (
    <Modal padding="p-0" visible={open} setVisible={setOpen}>
      <div className="theme-search">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
          <BiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
        </div>
        <input
          id="theme-finder"
          className="text-color-base"
          onChange={(ev) => onSearch(ev.target.value)}
          type="text"
          placeholder={"Find you theme"}
        />
      </div>

      <div className="" style={{ minWidth: 360, minHeight: 100 }}>
        <ScrollBar height="300px">
          {themes.map((theme, index) => {
            if (
              searchKey &&
              !theme.name.toLowerCase().includes(searchKey.toLowerCase().trim())
            ) {
              return <></>
            }

            const isPreview = theme.id === preview ? "is-preview" : ""

            return (
              <div
                onClick={() => onSelect(theme.id, theme.config)}
                className={`${isPreview} theme-item group`}
                key={index}
              >
                <h2 className="text-sm">{theme.name}</h2>

                <div className="flex items-center gap-1">
                  {theme.active ? null : (
                    <kbd
                      className="kbd-btn group-hover:opacity-100 opacity-0"
                      onClick={(ev) => {
                        ev.stopPropagation()
                        onDelTheme(theme.themeId)
                      }}
                    >
                      <RiCloseFill className="w-4 h-4 text-red-400" />
                    </kbd>
                  )}
                  {themeCustomModal ? null : (
                    <kbd
                      className="kbd-btn group-hover:opacity-100 opacity-0"
                      onClick={(ev) => {
                        ev.stopPropagation()
                        onEditTheme(theme.id)
                      }}
                    >
                      <TbPencil className="w-4 h-4" />
                    </kbd>
                  )}
                  {selectedTheme === theme.id ? (
                    <HiCheckCircle className="theme-status-active group-hover:hidden" />
                  ) : (
                    <HiOutlineMinusCircle className="theme-status group-hover:hidden" />
                  )}
                </div>
              </div>
            )
          })}
        </ScrollBar>
        <div className="modal-footer">
          <div className="flex items-center gap-2">
            <kbd className="kbd-btn">↑</kbd>
            <kbd className="kbd-btn">↓</kbd>
            <kbd className="kbd-btn">Enter</kbd>
          </div>
          <div className="space-x-2">
            <Link to="/setting/theme" className="inline-flex">
              <kbd className="kbd-btn">+ Install</kbd>
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  )
}

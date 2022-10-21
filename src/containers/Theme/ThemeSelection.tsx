import { useEffect, useState } from 'react'
import { useThemeStore } from '../../store/themes'
import Modal from '../../components/Modal'
import ScrollBar from '../../components/ScrollBar'
import { HiCheckCircle, HiOutlineMinusCircle } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { getUserSetting, selectTheme, setThemeConfigToStorage } from '../../services/user-settings'
import { useAuth } from '../../hooks/useAuth'
import { Link } from 'react-router-dom'

let currentTheme = ''
let markAsThemeSelected = false;
export default function ThemeUser() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const { visible, selectedTheme, list: themes, setVisible, setSelected, setThemeList } = useThemeStore()
  const [searchKey, setSearchKey] = useState('');
  const [preview, setPreview] = useState(selectedTheme)

  const getThemeSettingElem = () => document.getElementById("theme-setting")

  const setThemeSetting = (config: string) => {
    const themeSettingElem = getThemeSettingElem()
    if (!themeSettingElem) return;

    try {
      const cssVars = JSON.parse(config)
      const css = []
      for (let variable in cssVars) {
        css.push(`--${variable}: ${cssVars[variable]}`)
      }

      themeSettingElem.setAttribute('style', css.join(';'))
    } catch (error) {
      console.log('setThemeSetting Error', error)
    }
  }

  const onSelect = (id: string, config: string) => {
    markAsThemeSelected = true
    setOpen(false);
    setSearchKey('');
    setThemeConfigToStorage(config)
    setThemeSetting(config)
    selectTheme(id).then(() => {
      // setUpdateCounter(updateCounter + 1)
      setSelected(id, config)
    })
  }

  const onSearch = (value: string) => {
    setSearchKey(value)
  }

  const cachingCurrentTheme = () => {
    console.log('opened')
    const themeSettingElem = getThemeSettingElem()
    if (!themeSettingElem) {
      return;
    }
    currentTheme = themeSettingElem.getAttribute('style') || ''

  }

  const rollbackToDefaultTheme = () => {
    if (markAsThemeSelected) {
      markAsThemeSelected = false;
      return;
    }

    const themeSettingElem = getThemeSettingElem()
    if (!themeSettingElem) {
      return;
    }
    themeSettingElem.setAttribute('style', currentTheme)
  }

  useEffect(() => {
    setPreview(selectedTheme)
  }, [selectedTheme])

  useEffect(() => {
    visible && cachingCurrentTheme()
    !visible && rollbackToDefaultTheme()
    setOpen(visible);
  }, [visible])

  useEffect(() => {
    setVisible(open)
  }, [open])

  useEffect(() => {
    getUserSetting().then(setting => {
      if (!setting || !setting.themes) return;
      setThemeList(setting.themes)
    })

  }, [user?.uid])

  useEffect(() => {

    const onKeyPress = (ev: KeyboardEvent) => {
      const key = ev.key
      const len = themes.length;

      if (key === 'Enter') {
        const found = themes.find(t => t.id === preview)
        found && onSelect(preview, found.config || '')
        return
      }

      let nextPreview = ''

      if (!["ArrowUp", "ArrowDown"].includes(key)) {
        return;
      }

      for (let i = 0; i < len; i++) {
        const t = themes[i]
        if (t.id !== preview) {
          continue
        }

        const dir = key === "ArrowUp" ? -1 : 1;
        const nTheme = themes[i + dir]
        nextPreview = nTheme.id || ""

        // preview theme when pressing up/down key - it'll be rollbacked after closing the theme selection modal
        setThemeSetting(nTheme.config)
        break;
      }

      nextPreview && setPreview(nextPreview)
    }

    document.addEventListener('keyup', onKeyPress)

    return () => {
      document.removeEventListener('keyup', onKeyPress)
    }

  }, [themes, preview])

  useEffect(() => {
    return () => {
      open === false && setSearchKey('')
    }
  }, [open])

  return <Modal padding="p-0" visible={open} setVisible={setOpen}>
    <div className="relative rounded-md shadow-sm" >
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
        <BiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
      </div>
      <input
        onChange={(ev) => onSearch(ev.target.value)}
        type="text"
        className="block w-full border-none py-4 pl-14 sm:text-sm shadow-sm"
        placeholder={'Find you theme'}
      />
    </div>

    <div className="bg-gray-50" style={{ minWidth: 360, minHeight: 100 }}>
      <ScrollBar height="300px">
        {themes.map((theme, index) => {

          if (searchKey && !theme.name.toLowerCase().includes(searchKey.toLowerCase().trim())) {
            return <></>;
          }

          const isPreview = theme.id === preview ? 'bg-gray-100 text-gray-600' : '';

          return <div onClick={() => onSelect(theme.id, theme.config)} className={`${isPreview} theme-item px-5 py-2 flex items-center justify-between gap-5 border-b cursor-pointer hover:bg-gray-100 hover:text-gray-600`} key={index}>
            <h2 className="text-sm text-gray-500">{theme.name}</h2>
            {selectedTheme === theme.id ? <HiCheckCircle className="text-yellow-500" /> : <HiOutlineMinusCircle className="text-gray-300" />}
          </div>
        })}
      </ScrollBar>
      <div className="flex items-center justify-between w-full bg-white border-t px-5 py-3">
        <div className="flex items-center gap-2">
          <kbd className="kbd-btn">↑</kbd>
          <kbd className="kbd-btn">↓</kbd>
          <kbd className="kbd-btn">Enter</kbd>
        </div>
        <Link to="/setting/theme" className="inline-flex">
          <kbd className="kbd-btn">+ New theme</kbd>
        </Link>
      </div>
    </div>
  </Modal>
}

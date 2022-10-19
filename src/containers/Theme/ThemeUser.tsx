import { useEffect, useState } from 'react'
import { useThemeStore } from '../../store/themes'
import Modal from '../../components/Modal'
import ScrollBar from '../../components/ScrollBar'
import { HiCheckCircle, HiOutlineCheckCircle } from 'react-icons/hi'
import { BiSearch } from 'react-icons/bi'
import { getUserSetting, selectTheme } from '../../services/user-settings'
import { useAuth } from '../../hooks/useAuth'

export default function ThemeUser() {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const { visible, selectedTheme, list: themes, setVisible, setSelected, setThemeList } = useThemeStore()
  const [searchKey, setSearchKey] = useState('');
  const [preview, setPreview] = useState(selectedTheme)

  const onSelect = (id: string, config: string) => {
    setOpen(false);
    setSearchKey('');
    selectTheme(id).then(() => {
      // setUpdateCounter(updateCounter + 1)
      setSelected(id, config)
    })
  }

  const onSearch = (value: string) => {
    setSearchKey(value)
  }

  useEffect(() => {
    setPreview(selectedTheme)
  }, [selectedTheme])

  useEffect(() => {
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
        const find = themes.find(t => t.id === preview)
        onSelect(preview, find?.config || '')
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
        nextPreview = themes[i + dir].id || "" 
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
            {selectedTheme === theme.id ? <HiCheckCircle className="text-yellow-500" /> : <HiOutlineCheckCircle className="text-gray-300" />}
          </div>
        })}
      </ScrollBar>
      <div className="flex items-center gap-2 px-5 py-3 border-t bg-white">
        <kbd className="inline-flex cursor-pointer items-center px-2 py-0.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-gray-600 dark:border-gray-600 ">
          ↑
        </kbd>
        <span className="text-gray-700 text-xs">Up</span>
        <kbd className="inline-flex cursor-pointer items-center px-2 py-0.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-gray-600 dark:border-gray-600 ">
          ↓
        </kbd>
        <span className="text-gray-700 text-xs">Down</span>
        <kbd className="inline-flex cursor-pointer items-center px-2 py-0.5 border border-gray-300 shadow-sm text-xs font-medium rounded text-gray-700 bg-white hover:bg-gray-50 dark:text-gray-200 dark:bg-gray-600 dark:border-gray-600 ">
          Enter
        </kbd>

        <span className="text-gray-700 text-xs">Select</span>

      </div>
    </div>
  </Modal>
}

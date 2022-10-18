import { useEffect, useState } from 'react'
import { useThemeStore } from '../../store/themes'
import Modal from '../../components/Modal'
import { getThemes, ITheme } from '../../services/themes'
import ScrollBar from '../../components/ScrollBar'
import { HiOutlineCloudDownload } from 'react-icons/hi'
// import { IoMdStar } from 'react-icons/io'
import Button from '../../components/Button'
import { BiSearch } from 'react-icons/bi'
import { getUserSetting, installTheme, IUserThemeSettings, uninstallTheme } from '../../services/user-settings'

interface IInstalledTheme {
  [key: string]: number
}

export default function ThemeColor() {
  const [open, setOpen] = useState(false)
  const { visible, setVisible } = useThemeStore()
  const [themes, setThemes] = useState<ITheme[]>([]);
  const [installed, setInstalled] = useState<IInstalledTheme>({})
  const [searchKey, setSearchKey] = useState('');
  const [updateCounter, setUpdateCounter] = useState(0)

  const onInstall = (theme: ITheme) => {
    installTheme(theme)
      .then(() => setUpdateCounter(updateCounter + 1))
  }

  const onUninstall = (id: string) => {
    uninstallTheme(id)
      .then(() => setUpdateCounter(updateCounter + 1))
  }

  const onSearch = (value: string) => {
    setSearchKey(value)
  }

  useEffect(() => {
    setOpen(visible)
  }, [visible])

  useEffect(() => {
    setVisible(open)
  }, [open])

  useEffect(() => {
    getUserSetting().then(setting => {
      if (!setting || !setting.themes) return;

      const installedThemes: IInstalledTheme = {}
      setting.themes.forEach(theme => {
        installedThemes[theme.themeId] = 1
      })

      setInstalled(installedThemes);

    })

  }, [updateCounter])

  useEffect(() => {
    getThemes().then(themes => {
      setThemes(themes)
    })
  }, [])

  return <Modal padding="p-0" visible={open} setVisible={setOpen}>
    <div className="relative rounded-md shadow-sm">
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

    <div className="pt-2 bg-gray-50" style={{ minWidth: 360, minHeight: 100 }}>
      <ScrollBar height="500px">
        {themes.map(theme => {

          if (searchKey && !theme.name.toLowerCase().includes(searchKey.toLowerCase().trim())) {
            return <></>;
          }

          const installAlready = theme.id && theme.id in installed ? true : false
          console.log('loop', theme, installed)

          return <div className="theme-item px-5 py-2 flex items-start gap-5" key={theme.id}>
            <img src={theme.icon} alt="" style={{ width: 65, height: 65 }} className="rounded-lg bg-gray-900" />
            <div className="theme-content space-y-0.5 -mt-1 w-64">
              <div className="theme-header flex items-center justify-between">
                <h2 className="text-base font-semibold">{theme.name}</h2>
                <div className="theme-counter flex items-center justify-between gap-2">
                  <span className="flex gap-1 items-center"><HiOutlineCloudDownload className="text-gray-500" /> <small>{theme.downloadCounter}</small></span>
                  {/*<span className="flex gap-1 items-center"><IoMdStar className="text-yellow-600" /> <small>{theme.rating}</small></span>*/}
                </div>
              </div>
              <p className="text-xs text-gray-400 truncate">{theme.desc}</p>
              <div className="flex items-center justify-between gap-1.5">
                <span className="text-xs text-gray-700">@{theme.author}</span>
                {installAlready ? 
                  <Button secondary onClick={() => theme.id && onUninstall(theme.id)} className="px-1.5 py-0.5 text-xs">Uninstall</Button> :
                  <Button onClick={() => onInstall(theme)} className="px-1.5 py-0.5 text-xs">Install</Button>}
              </div>
            </div>
          </div>
        })}
      </ScrollBar>
    </div>
  </Modal>
}

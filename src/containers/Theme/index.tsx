import { useEffect, useState } from 'react'
import { useThemeStore } from '../../store/themes'
import Modal from '../../components/Modal'
import { getThemes, ITheme } from '../../services/themes'
import ScrollBar from '../../components/ScrollBar'

export default function ThemeColor() {
  const [open, setOpen] = useState(false)
  const {visible, setVisible} = useThemeStore()
  const [themes, setThemes] = useState<ITheme[]>([]);

  useEffect(() => {
    setOpen(visible)
  }, [visible])

  useEffect(() => {
    setVisible(open)
  }, [open])


  useEffect(() => {
     const t: ITheme = {
        id: '1823987sdfiuweyr',
        name: 'One Dark Pro',
        author: 'binaryify',
        desc: 'Atom‘s iconic One Dark theme for Visual Studio Code.' ,
        themes: [
          {name: 'One Dark Pro', config: `{ "backgroundColor": "red"}`}
        ],
        icon: 'https://vscodethemes.com/e/zhuangtongfa.material-theme/one-dark-pro.svg?language=javascript',
        images: ['https://vscodethemes.com/e/zhuangtongfa.material-theme/one-dark-pro.svg?language=javascript', 'https://vscodethemes.com/e/github.github-vscode-theme/github-light-high-contrast.svg?language=javascript'],
        downloadCounter: 12,
        rating: 4.5,
        version: '0.1.0' 
      }

      for (let i = 0; i < 10; i++) {
        themes.push(t)      
      }

      setThemes(themes)

    getThemes().then(themes => {
      console.log(themes)
      const t: ITheme = {
        id: '1823987sdfiuweyr',
        name: 'One Dark Pro',
        author: 'binaryify',
        desc: 'Atom‘s iconic One Dark theme for Visual Studio Code.' ,
        themes: [
          {name: 'One Dark Pro', config: `{ "backgroundColor": "red"}`}
        ],
        icon: 'https://vscodethemes.com/e/zhuangtongfa.material-theme/one-dark-pro.svg?language=javascript',
        images: ['https://vscodethemes.com/e/zhuangtongfa.material-theme/one-dark-pro.svg?language=javascript', 'https://vscodethemes.com/e/github.github-vscode-theme/github-light-high-contrast.svg?language=javascript'],
        downloadCounter: 12,
        rating: 4.5,
        version: '0.1.0' 
      }

      for (let i = 0; i < 10; i++) {
        themes.push(t)      
      }

      setThemes(themes)

    })
  }, [])

  return <Modal visible={open} setVisible={setOpen}>
    <div className="" style={{ width: 450, maxHeight: 500}}>
    <ScrollBar height='500px'>
      {themes.map(theme => {
        return <div className="theme-item p-2 flex gap-5" key={theme.id}>
          <img src={theme.icon} alt="" className="w-40 rounded-lg" />   
          <div className="theme-content space-y-1">
            <h2 className="text-sm">{theme.name}</h2>
            <p className="text-xs text-gray-400">{theme.desc}</p>
            <div className="flex flex-col gap-1.5">
            <small>{theme.rating}</small>
            <button type="button" className="inline-flex shrink-0 items-center text-center rounded border border-transparent bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-700 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
             Install
            </button>
          </div>

          </div>
                 </div>
      })}
</ScrollBar>
    </div>
  </Modal>
}

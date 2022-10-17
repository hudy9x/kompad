import { useEffect, useState } from 'react'
import { useThemeStore } from '../../store/themes'
import Modal from '../../components/Modal'
import { getThemes, ITheme } from '../../services/themes'

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
        
      } 
    })
  }, [])

  return <Modal visible={open} setVisible={setOpen}>
    <div>Hello world it's theme</div>
  </Modal>
}

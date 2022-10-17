import { collection, getDocs } from "firebase/firestore"
import { db } from "../libs/firebase"

interface IThemeConfig {
  name: string
  config: string
}

export interface ITheme {
  id?: string
  name: string
  author: string
  desc: string
  images: string[]
  icon: string
  themes: IThemeConfig[] 
  downloadCounter: number
  version: string
  rating: number
}

export const getThemes = async (): Promise<ITheme[]> => {
  const themeRef = await getDocs(collection(db, "themes"))

  if (themeRef.empty) {
    return []
  }

  const themes: ITheme[] = []
  themeRef.forEach(theme => {
    const themeData = theme.data() as ITheme;

    themes.push({
      id: theme.id,
      name: themeData.name,
      author: themeData.author,
      desc: themeData.desc,
      images: themeData.images,
      icon: themeData.icon,
      themes: themeData.themes,
      downloadCounter: themeData.downloadCounter,
      version: themeData.version,
      rating: themeData.rating,
    })
  })

  return themes
}


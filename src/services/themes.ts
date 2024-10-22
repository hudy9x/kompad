import { addDoc, collection, getDocs, Timestamp } from "firebase/firestore"
import { db } from "../libs/firebase"

interface IThemeConfig {
  id: string
  name: string
  config: string
}

export interface ITheme {
  id?: string
  name: string
  author: string
  desc: string
  images?: string[]
  icon?: string
  themes: IThemeConfig[]
  downloadCounter?: number
  version: string
  rating?: number
  createdAt?: Timestamp
  updatedAt?: Timestamp
}

export type IThemeInstall = Pick<ITheme, "id" | "themes" | "author" | "name">

const COLLECTION_NAME = "themes"

export const getThemes = async (): Promise<ITheme[]> => {
  const themeRef = await getDocs(collection(db, COLLECTION_NAME))

  if (themeRef.empty) {
    return []
  }

  const themes: ITheme[] = []
  themeRef.forEach((theme) => {
    const themeData = theme.data() as ITheme

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

export const addTheme = async (theme: ITheme) => {
  const { name, author, desc, themes } = theme
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      name,
      author,
      desc,
      // images,
      // icon,
      themes,
    });

    return docRef.id;
  } catch (error) {
    return null;
  }
}

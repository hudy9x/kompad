import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  Unsubscribe,
  updateDoc,
  where,
} from "firebase/firestore"
import { auth, db } from "../libs/firebase"
import { updateQueryCounterForTags } from "./query-cache"

export interface ITag {
  id?: string
  title: string
  color: string
  uid: string
}

const COLLECTION_NAME = "tags"

export const addTag = async (tags: Partial<ITag>) => {
  const user = auth.currentUser

  if (!user) {
    return 0
  }

  tags.uid = user.uid

  await addDoc(collection(db, COLLECTION_NAME), tags)
  updateQueryCounterForTags()
  return tags
}

export const getTags = async (): Promise<ITag[]> => {
  const user = auth.currentUser

  if (!user) {
    return []
  }

  const q = query(collection(db, COLLECTION_NAME), where("uid", "==", user.uid))

  const result = await getDocs(q)

  if (result.empty) {
    return []
  }

  const tags: ITag[] = []

  result.docs.forEach((doc) => {
    const data = doc.data()

    tags.push({
      id: doc.id,
      title: data.title,
      color: data.color,
      uid: data.uid,
    })
  })

  return tags
}

export const watchTags = (
  cb: (err: boolean, data: ITag[]) => void
): Unsubscribe | null => {
  const user = auth.currentUser

  if (!user) {
    cb(true, [])
    return null
  }

  const q = query(collection(db, COLLECTION_NAME), where("uid", "==", user.uid))

  const unsub = onSnapshot(q, (qSnapshot) => {
    const tags: ITag[] = []

    qSnapshot.docs.forEach((doc) => {
      const data = doc.data()

      tags.push({
        id: doc.id,
        title: data.title,
        color: data.color,
        uid: data.uid,
      })
    })

    cb(false, tags)
  })

  return unsub
}

export const delTag = async (id: string) => {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id))
    updateQueryCounterForTags()
  } catch (error) {
    console.log(error)
  }
}

export const editTag = async ({
  id,
  title,
  color,
}: {
  id: string
  title: string
  color: string
}) => {
  try {
    const res = await updateDoc(doc(db, COLLECTION_NAME, id), {
      title,
      color,
    })

    console.log(res)

    return 1
  } catch (error) {
    console.log(error)
    return 0
  }
}

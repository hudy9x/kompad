import {
  doc,
  onSnapshot,
  runTransaction,
  Timestamp,
  updateDoc,
} from "firebase/firestore"
import localforage from "localforage"
import { auth, db } from "../libs/firebase"

interface IQueryCache {
  folders: number
  tags: number
}

const COLLECTION_NAME = "query-caching"
export const QUERY_FOLDER = "QUERY_FOLDER"
export const QUERY_FOLDER_TIME = "QUERY_FOLDER_TIME"

const cacheDb = localforage.createInstance({
  name: "query-caching",
})

export const setQueryCache = (name: string, data: any) => {
  return cacheDb.setItem(name, data)
}

export const clearQueryCache = (name: string) => {
  return cacheDb.setItem(name, "")
}

export const getQueryCache = (name: string) => {
  return cacheDb.getItem(name)
}

export const watchQuery = (cb: (data: IQueryCache) => void) => {
  const user = auth.currentUser

  if (!user) {
    return null
  }

  const q = doc(db, COLLECTION_NAME, user.uid)

  const unsub = onSnapshot(q, (qSnapshot) => {
    const respData = qSnapshot.data() || {}

    const data: IQueryCache = {
      folders: respData.folders,
      tags: respData.tags,
    }

    cb(data)
  })

  return unsub
}

export const setQueryCounter = (
  name: string,
  cb: (counter: number) => void
) => {
  const user = auth.currentUser
  if (!user) return

  runTransaction(db, async (transaction) => {
    const docRef = doc(db, COLLECTION_NAME, user.uid)
    const queryDoc = await transaction.get(docRef)

    if (!queryDoc.exists()) {
      transaction.set(docRef, { [name]: 1 })
      return
    }

    const dt = queryDoc.data() as IQueryCache
    let counter = +dt[name as keyof IQueryCache]
    counter += 1

    transaction.update(docRef, { [name]: counter })

    cb(counter)
  })
}
